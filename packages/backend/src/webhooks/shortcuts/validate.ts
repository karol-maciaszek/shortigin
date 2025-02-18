import { Request, Response } from 'express'
import * as D from 'io-ts/Decoder'
import { pipe } from 'fp-ts/function'
import * as E from 'fp-ts/Either'
import { identity } from 'io-ts'

const insertShortcutOpDecoder = D.struct({
  url: D.string,
})
type InsertShortcutOp = D.TypeOf<typeof insertShortcutOpDecoder>

const updateShortcutOpDecoder = D.struct({
  _set: D.struct({
    url: D.string,
  }),
  pk_columns: D.struct({
    id: D.number,
  }),
})
type UpdateShortcutOp = D.TypeOf<typeof updateShortcutOpDecoder>

const validationPayloadDecoder = D.struct({
  data: D.struct({
    input: D.array(D.union(insertShortcutOpDecoder, updateShortcutOpDecoder)),
  }),
})

const isUpdateShortcutOp = (op: InsertShortcutOp | UpdateShortcutOp): op is UpdateShortcutOp => {
  return '_set' in op
}

function getShortcutUrl(op: InsertShortcutOp | UpdateShortcutOp): string {
  if (isUpdateShortcutOp(op)) {
    return op._set.url
  }

  return op.url
}

async function verifyUrl(url: string) {
  // mimic browser request headers to avoid bot protection
  const response = await fetch(url, {
    headers: {
      accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'pl-PL,pl;q=0.9,en;q=0.8',
      'cache-control': 'no-cache',
      dpr: '2',
      pragma: 'no-cache',
      priority: 'u=0, i',
      'sec-ch-prefers-color-scheme': 'dark',
      'sec-ch-ua': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
      'sec-ch-ua-full-version-list':
        '"Not A(Brand";v="8.0.0.0", "Chromium";v="132.0.6834.111", "Google Chrome";v="132.0.6834.111"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-model': '""',
      'sec-ch-ua-platform': '"macOS"',
      'sec-ch-ua-platform-version': '"15.3.0"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'viewport-width': '1728',
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'HEAD',
  })
  if (!response.ok) {
    throw new Error(`Invalid URL: ${response.statusText} (${response.status})`)
  }
}

export async function shortcutValidateWebhook(req: Request, res: Response<{ message: string }>) {
  const payload = pipe(
    req.body,
    validationPayloadDecoder.decode,
    E.fold((error: D.DecodeError) => {
      throw new Error(D.draw(error))
    }, identity)
  )

  const url = getShortcutUrl(payload.data.input[0])

  try {
    await verifyUrl(url)
    res.send({ message: 'ok' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
      return
    }

    throw error
  }
}
