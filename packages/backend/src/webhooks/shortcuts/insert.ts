import { Request, Response } from 'express'
import {getSdk} from "../../generated/sdk.admin";
import Hashids from "hashids";
import * as D from "io-ts/Decoder";
import {pipe} from "fp-ts/function";
import * as E from "fp-ts/Either";
import {identity} from "io-ts";

const shortcutInsertEventDecoder = D.struct({
  event: D.union(
    D.struct({
      op: D.literal('INSERT'),
      data: D.struct({
        old: D.literal(null),
        new: D.struct({
          id: D.number,
          slug: D.nullable(D.string),
          url: D.string,
          created_at: D.string,
        }),
      }),
    }),
  )
})

export function shortcutInsertWebhook({ sdk, hashids }: { sdk: Pick<ReturnType<typeof getSdk>, 'UpdateShortcutSlug'>, hashids: Hashids }) {
  return async (req: Request, res: Response<{ message: string }>) => {
    console.log(req.body)

    const payload = pipe(
      req.body,
      shortcutInsertEventDecoder.decode,
      E.fold(
        (error: D.DecodeError) => {
          throw new Error(D.draw(error))
        },
        identity
      ),
    )

    await sdk.UpdateShortcutSlug({ id: payload.event.data.new.id, slug: hashids.encode([payload.event.data.new.id]) })
    res.send({ message: 'ok' })
  }
}
