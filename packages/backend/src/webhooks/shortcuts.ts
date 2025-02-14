import { Request, Response } from 'express'
import {getSdk} from "../generated/sdk.admin";
import Hashids from "hashids";

export type HasuraEvent<T> = {
  event:
    | {
    op: 'INSERT'
    data: {
      old?: T
      new: T
    }
  }
    | {
    op: 'DELETE'
    data: {
      old: T
      new: null
    }
  }
    | {
    op: 'UPDATE'
    data: {
      old: T
      new: T
    }
  }
  trigger: {
    name: string
  }
}

export function shortcutInsertWebhook({ sdk, hashids }: { sdk: Pick<ReturnType<typeof getSdk>, 'UpdateShortcutSlug'>, hashids: Hashids }) {
  return async (req: Request, res: Response<string>) => {
    const payload: HasuraEvent<{
      id: number
      slug?: string
      url: string
      created_at: string
    }> = req.body

    if (payload.event.op === 'INSERT') {
      await sdk.UpdateShortcutSlug({ id: payload.event.data.new.id, slug: hashids.encode([payload.event.data.new.id]) })
      res.send('ok')
    } else {
      res.status(400).send('Handles only INSERT operations')
    }
  }
}
