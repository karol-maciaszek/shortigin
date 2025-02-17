import React, { ButtonHTMLAttributes, useCallback, useRef } from 'react'
import FeedbackButton, { FeedbackButtonType } from './FeedbackButton'

const CopyButton = (
  props: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { text: string }
) => {
  const feedbackButtonRef = useRef<FeedbackButtonType>(null)
  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(props.text)
    feedbackButtonRef.current?.showFeedback()
  }, [props.text])

  return (
    <FeedbackButton {...props} ref={feedbackButtonRef} onClick={copy} feedback="Copied!">
      {props.children}
    </FeedbackButton>
  )
}

export default CopyButton
