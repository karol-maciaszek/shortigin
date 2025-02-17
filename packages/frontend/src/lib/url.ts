import {Shortcuts} from "../generated/urql.user";
import {useMemo} from "react";

export function useResultUrl(shortcut?: Pick<Shortcuts, 'slug'> | null) {
  return useMemo(() => {
    const slug = shortcut?.slug
    return slug && getResultUrl(slug)
  }, [shortcut?.slug])
}

export function getResultUrl(slug?: string | null) {
  return window.location.origin + '/' + (slug || '?')
}
