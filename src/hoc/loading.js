import React, { useState } from 'react'

export const LoadingContext = React.createContext(false);

export const LoadingHOC = ({children}) => {
  const [loadingContextData, setLoadingContextData] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading: loadingContextData, setLoading: setLoadingContextData }}>
      {children}
    </LoadingContext.Provider>
  )
}
