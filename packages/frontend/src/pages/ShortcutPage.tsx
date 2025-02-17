import React, {useCallback, useEffect, useMemo} from "react";
import {useParams} from "react-router";
import {useGetShortcutSubscription, useUpdateShortcutMutation} from "../generated/urql.user";
import {useForm} from "react-hook-form";
import {useResultUrl} from "../lib/url";
import ErrorBox from "../components/ErrorBox";
import {ThreeDots} from "react-loader-spinner";
import FeedbackButton, {FeedbackButtonType} from "../components/FeedbackButton";

export const ShortcutPage = () => {
  const { id } = useParams<{ id: string }>()
  const parsedId = useMemo(() => parseInt(id || '-1'), [id])
  const [{ data: getShortcutData, error: getShortcutError }] = useGetShortcutSubscription({
    pause: !parsedId,
    variables: {
      id: parsedId,
    }
  })
  const [{ error: updateShortcutError, fetching: updateShortcutFetching }, updateShortcut] = useUpdateShortcutMutation()
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm({ defaultValues: { url: '' }, disabled: updateShortcutFetching })
  const resultUrl = useResultUrl(getShortcutData?.shortcuts_by_pk)
  const updateButtonRef = React.useRef<FeedbackButtonType>(null)

  useEffect(() => {
    reset({ url: getShortcutData?.shortcuts_by_pk?.url || '' })
  }, [getShortcutData])

  const doSave = useCallback(async (form: { url?: string }) => {
    if (!parsedId) {
      throw new Error('Empty id')
    }

    if (!form.url) {
      throw new Error('Empty url')
    }

    const { error } = await updateShortcut({ id: parsedId, url: form.url })
    if (!error) {
      updateButtonRef.current?.showFeedback()
    }
  }, [parsedId, updateShortcut])

  return <div>
    {getShortcutError && <ErrorBox error={getShortcutError} />}

    <h1 className="text-xl my-3">Shortcut</h1>
    <form className="grid grid-cols-4 gap-3 items-center" onSubmit={handleSubmit(doSave)}>
      <label>Shortened URL</label>
      <p className="col-span-3"><a href={resultUrl || ''} target="_blank">{resultUrl}</a></p>

      <label>Target URL</label>
      <input className="col-span-3" type="text" {...register('url', { required: 'Cannot be empty' })} placeholder="Target URL" />

      <p className="col-span-4 text-right">
        <FeedbackButton type="submit" feedback="Updated!" ref={updateButtonRef} disabled={updateShortcutFetching || !isDirty}>
          {updateShortcutFetching ? <ThreeDots height={8} color="#00E0FF" /> : 'Update'}
        </FeedbackButton>
      </p>
    </form>
    {updateShortcutError && <ErrorBox error={updateShortcutError} />}
  </div>
}
