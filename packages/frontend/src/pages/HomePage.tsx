import React, {useCallback, useMemo} from "react";
import {useForm} from "react-hook-form";
import {
  useGetShortcutSubscription,
  useInsertShortcutMutation
} from "../generated/urql.user";
import CopyButton from "../components/CopyButton";

export const HomePage: React.FC = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      url: '',
    },
  })
  const [{ data: insertShortcutData, error: insertShortcutError }, insertShortcut] = useInsertShortcutMutation()
  const [{ data: getShortcutData, error: getShortcutError }] = useGetShortcutSubscription({
    pause: !insertShortcutData,
    variables: {
      id: insertShortcutData?.insert_shortcuts_one?.id,
    },
  })

  const fullUrl = useMemo(() => {
    const slug = getShortcutData?.shortcuts_by_pk?.slug
    return slug && window.location.origin + '/' + slug
  }, [getShortcutData?.shortcuts_by_pk?.slug])

  const doShorten = useCallback(async (form: { url: string }) => {
    await insertShortcut(form)

  }, [])

  return <main>
    <h1>Deep Shortigin</h1>

    {insertShortcutError && <p>Error: {insertShortcutError.message}</p>}
    {getShortcutError && <p>Error: {getShortcutError.message}</p>}

    <form onSubmit={handleSubmit(doShorten)}>
      <input type="text" placeholder="URL" {...register('url')} />
      <button type="submit">Shorten</button>
    </form>

    {fullUrl && <p>
      Success! Here is you shortened URL: <a href={fullUrl} target="_blank">{fullUrl}</a>
      <CopyButton url={fullUrl}>Copy</CopyButton>
    </p>}
  </main>
}
