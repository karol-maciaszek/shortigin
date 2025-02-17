import React from 'react'
import {CombinedError} from "urql";

const ErrorBox: React.FC<{ error: CombinedError }> = ({ error }) =>
  <div className="flex justify-center">
    <div className="rounded-md border border-neoncyan px-3 py-2">
      {error.graphQLErrors[0]?.message}
    </div>
  </div>

export default ErrorBox
