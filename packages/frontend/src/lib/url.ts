import {Shortcuts} from "../generated/urql.user";
import {useMemo} from "react";

export function useResultUrl(shortcut?: Pick<Shortcuts, 'slug'> | null) {
  return useMemo(() => {
    const slug = shortcut?.slug
    return slug && window.location.origin + '/' + slug
  }, [shortcut?.slug])
}
