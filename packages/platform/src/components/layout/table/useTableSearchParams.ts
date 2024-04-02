import { useState } from 'react'

function useTableSearchParams<ParamsType extends object = {}>(
  initialValues: ParamsType = null,
) {
  const [params, setParams] = useState<ParamsType>(initialValues)
  function onSubmit(values: ParamsType) {
    setParams(values)
  }
  function onReset() {
    setParams(null)
  }
  return {
    params,
    handlers: {
      onReset,
      onSubmit,
    },
  }
}

export default useTableSearchParams
