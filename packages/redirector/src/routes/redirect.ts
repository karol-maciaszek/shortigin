import { Request, Response } from 'express'
import {getSdk} from "../generated/sdk.admin";

export function redirectRoute({ sdk }: { sdk: Pick<ReturnType<typeof getSdk>, 'GetShortcutBySlug'> }) {
  return async (req: Request, res: Response) => {
    const { shortcuts: [shortcut] } = await sdk.GetShortcutBySlug({ slug: req.params.slug })

    if (!shortcut) {
      res.status(404).send('Not found')
      return
    }

    res.redirect(302, shortcut.url)
  }
}
