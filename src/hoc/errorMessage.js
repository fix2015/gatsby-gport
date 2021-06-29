import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Alert } from "@material-ui/lab"

export const ErrorMessageContext = React.createContext("")

const useStyles = makeStyles(theme => ({
  alert: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(255, 231, 236) !important",
  },
}))

export const ErrorMessageHOC = ({ children }) => {
  const classes = useStyles()
  const [errorMessageContextData, setErrorMessageContextData] = useState("")

  useEffect(() => {
    if (errorMessageContextData) {
      setTimeout(() => {
        setErrorMessageContextData("")
      }, 5000)
    }
  }, [errorMessageContextData])

  return (
    <ErrorMessageContext.Provider
      value={{
        errorMessage: errorMessageContextData,
        setErrorMessage: setErrorMessageContextData,
      }}
    >
      {children}
      {errorMessageContextData && (
        <Alert className={classes.alert} severity="error">
          {" "}
          {JSON.stringify(errorMessageContextData)}
        </Alert>
      )}
    </ErrorMessageContext.Provider>
  )
}
