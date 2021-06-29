import React, { useState } from "react"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"

export const LoadingContext = React.createContext(false)

const useStyles = makeStyles(theme => ({
  loading: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}))

export const LoadingHOC = ({ children }) => {
  const classes = useStyles()
  const [loadingContextData, setLoadingContextData] = useState(false)

  return (
    <LoadingContext.Provider
      value={{ loading: loadingContextData, setLoading: setLoadingContextData }}
    >
      {children}
      {loadingContextData && (
        <Grid className={classes.loading} container justify={"center"}>
          <CircularProgress />
        </Grid>
      )}
    </LoadingContext.Provider>
  )
}
