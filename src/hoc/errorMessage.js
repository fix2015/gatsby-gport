import React, { useState } from 'react'

export const ErrorMessageContext = React.createContext('' );

export const ErrorMessageHOC = ({children}) => {
  const [errorMessageContextData, setErrorMessageContextData] = useState(false)

  return (
    <ErrorMessageContext.Provider value={{ errorMessage: errorMessageContextData, setErrorMessage: setErrorMessageContextData }}>
      {children}
      {errorMessageContextData && <strong>Error: {JSON.stringify(errorMessageContextData)}</strong>}
    </ErrorMessageContext.Provider>
  )
}
