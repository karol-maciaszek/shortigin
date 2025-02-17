import React from "react";
import {useParams} from "react-router";
import {useGetShortcutSubscription} from "../generated/urql.user";

export const ShortcutPage = () => {
  const { id } = useParams<{ id: string }>()
  const [{ data: getShortcutData }] = useGetShortcutSubscription({
    pause: !id,
    variables: {
      id: parseInt(id || '-1'),
    }
  })

  return <div>
    <h1>Shortcut</h1>
    <p>{getShortcutData?.shortcuts_by_pk?.url}</p>
  </div>
}
