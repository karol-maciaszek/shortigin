import React, {forwardRef, ButtonHTMLAttributes, useState, useImperativeHandle, useRef} from 'react'

export type FeedbackButtonType = HTMLButtonElement & { showFeedback: (args?: { timeout?: number }) => void }

const FeedbackButton = forwardRef<
  HTMLButtonElement & { showFeedback?: (args?: { timeout?: number }) => void },
  ButtonHTMLAttributes<HTMLButtonElement> & { feedback: React.ReactNode }
>((props, ref) => {
  const [feedbackEnabled, setFeedbackEnabled] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => ({
    ...(buttonRef.current as HTMLButtonElement),
    showFeedback: (args) => {
      setFeedbackEnabled(true)
      setTimeout(() => setFeedbackEnabled(false), args?.timeout || 2000)
    },
  }))

  return (
    <button
      {...props}
      ref={buttonRef}
      disabled={feedbackEnabled || props.disabled}
    >{feedbackEnabled ? props.feedback : props.children}</button>
  )
})

export default FeedbackButton
