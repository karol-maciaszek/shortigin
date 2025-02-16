import React, {ReactNode} from 'react'

const MessageBox: React.FC<{ children: ReactNode }> = (props) =>
  <div className="flex justify-center">
    <div className="rounded-md border border-neoncyan px-3 py-2">
      {props.children}
    </div>
  </div>

export default MessageBox
