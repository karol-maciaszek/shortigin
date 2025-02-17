import React, {useCallback, useEffect, useMemo} from "react";
import {useNavigate, useParams} from "react-router";
import {useDeleteShortcutMutation, useGetShortcutSubscription, useUpdateShortcutMutation} from "../generated/urql.user";
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
  const [{ error: deleteShortcutError, fetching: deleteShortcutFetching }, deleteShortcut] = useDeleteShortcutMutation()
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm({ defaultValues: { url: '' }, disabled: updateShortcutFetching })
  const resultUrl = useResultUrl(getShortcutData?.shortcuts_by_pk)
  const updateButtonRef = React.useRef<FeedbackButtonType>(null)
  const deleteButtonRef = React.useRef<FeedbackButtonType>(null)
  const navigate = useNavigate()

  useEffect(() => {
    reset({ url: getShortcutData?.shortcuts_by_pk?.url || '' })
  }, [getShortcutData])

  const doSave = useCallback(async (form: { url: string }) => {
    if (!parsedId) throw new Error('Empty id')

    const { error } = await updateShortcut({ id: parsedId, url: form.url })
    if (!error) updateButtonRef.current?.showFeedback()
  }, [parsedId, updateShortcut])

  const doDelete = useCallback(async () => {
    if (!parsedId) throw new Error('Empty id')

    if (confirm('Do you really want to delete this shortcut?')) {
      const {error} = await deleteShortcut({id: parsedId})
      !error && deleteButtonRef.current?.showFeedback()
      navigate('/app/shortcuts')
    }
  }, [parsedId])

  return <div>
    {getShortcutError && <ErrorBox error={getShortcutError} />}

    <h1 className="text-xl my-3">Shortcut</h1>
    <form className="grid grid-cols-4 gap-3 items-center" onSubmit={handleSubmit(doSave)}>
      <label>Shortened URL</label>
      <p className="col-span-3"><a href={resultUrl || ''} target="_blank">{resultUrl}</a></p>

      <label>Target URL</label>
      <input className="col-span-3" type="text" {...register('url', { required: 'Cannot be empty' })} placeholder="Target URL" />

      <p className="col-span-4 flex gap-3">
        <FeedbackButton className="ml-auto" type="submit" feedback="Updated!" ref={updateButtonRef} disabled={updateShortcutFetching || !isDirty}>
          {updateShortcutFetching ? <ThreeDots height={8} color="#00E0FF" /> : 'Update'}
        </FeedbackButton>
        <FeedbackButton className="bg-red border-red" feedback="Deleted!" type="button" onClick={doDelete} ref={deleteButtonRef} disabled={deleteShortcutFetching}>
          {deleteShortcutFetching ? <ThreeDots height={8} color="#00E0FF" /> : 'Delete'}
        </FeedbackButton>
      </p>
    </form>
    {updateShortcutError && <ErrorBox error={updateShortcutError} />}
    {deleteShortcutError && <ErrorBox error={deleteShortcutError} />}
  </div>
}
