import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useGetShortcutSubscription, useInsertShortcutMutation } from '../generated/urql.user'
import CopyButton from '../components/CopyButton'
import Logo from '../components/Logo'
import ErrorBox from '../components/ErrorBox'
import { ThreeDots } from 'react-loader-spinner'
import { useResultUrl } from '../lib/url'

export const HomePage = () => {
  const { handleSubmit, register, formState } = useForm({ defaultValues: { url: '' } })
  const [
    { data: insertShortcutData, error: insertShortcutError, fetching: insertShortcutFetching },
    insertShortcut,
  ] = useInsertShortcutMutation()
  const [{ data: getShortcutData, error: getShortcutError }] = useGetShortcutSubscription({
    pause: !insertShortcutData,
    variables: {
      id: insertShortcutData?.insert_shortcuts_one?.id,
    },
  })
  const doShorten = useCallback(insertShortcut, [])
  const resultUrl = useResultUrl(getShortcutData?.shortcuts_by_pk)
  const working = insertShortcutFetching || (insertShortcutData && !resultUrl)

  return (
    <div className="pt-12">
      <Logo size="lg" />

      <form className="mt-28 mb-12 flex gap-3 justify-center" onSubmit={handleSubmit(doShorten)}>
        <input
          className="w-1/3"
          type="text"
          placeholder="Enter the URL shorten"
          {...register('url')}
        />
        <button type="submit" disabled={!formState.isDirty || working}>
          {working ? <ThreeDots height={8} color="#00E0FF" /> : 'Shorten it!'}
        </button>
      </form>

      {insertShortcutError && <ErrorBox error={insertShortcutError} />}

      {getShortcutError && <ErrorBox error={getShortcutError} />}

      {resultUrl && (
        <div className="flex gap-3 justify-center items-center">
          <p>
            Success! Here is you shortened URL:{' '}
            <a href={resultUrl} target="_blank">
              {resultUrl}
            </a>
          </p>
          <CopyButton className="px-1 py-0.5 text-xs" text={resultUrl}>
            Copy
          </CopyButton>
        </div>
      )}
    </div>
  )
}
