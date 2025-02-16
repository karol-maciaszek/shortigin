import React, {InputHTMLAttributes, forwardRef, ButtonHTMLAttributes, useState, useCallback} from 'react'

const CopyButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { text: string }
>((props, ref) => {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(props.text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [props.text])

  return (
    <button
      {...props}
      ref={ref}
      onClick={copy}
      disabled={copied || props.disabled}
    >{copied ? 'Copied!' : props.children}</button>
  )
})

export default CopyButton
