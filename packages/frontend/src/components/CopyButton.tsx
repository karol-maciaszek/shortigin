import React, {InputHTMLAttributes, forwardRef, ButtonHTMLAttributes, useState, useCallback} from 'react'

const CopyButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & { url: string }
>((props, ref) => {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(props.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [props.url])

  return (
    <button
      {...props}
      ref={ref}
      onClick={copy}
    >{copied ? 'Copied!' : props.children}</button>
  )
})

export default CopyButton
