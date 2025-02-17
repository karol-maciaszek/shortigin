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
    await fetch(url, { method: 'head' })
    res.send({ message: 'ok' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
      return
    }

    throw error
  }
}
