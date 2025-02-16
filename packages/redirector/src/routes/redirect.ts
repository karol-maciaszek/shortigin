import { Request, Response } from 'express'
import {getSdk} from "../generated/sdk.admin";

export function redirectRoute({ sdk }: { sdk: Pick<ReturnType<typeof getSdk>, 'GetShortcutBySlug' | 'InsertShortcutVisit'> }) {
  function getClientIp(req: Request) {
    return (Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for'])?.split(',')[0]
      || (Array.isArray(req.headers['x-real-ip']) ? req.headers['x-real-ip'][0] : req.headers['x-real-ip'])
      || req.ip
  }

  return async (req: Request, res: Response) => {
    const { shortcuts: [shortcut] } = await sdk.GetShortcutBySlug({ slug: req.params.slug })

    if (!shortcut) {
      res.status(404).send('Not found')
      return
    }

    await sdk.InsertShortcutVisit({ shortcutId: shortcut.id, ip: getClientIp(req) })

    res.redirect(302, shortcut.url)
  }
}
