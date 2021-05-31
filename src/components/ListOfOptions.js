import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Tooltip from "@material-ui/core/Tooltip"

import { generateOptionsIcons } from "../services/options"

const useStyles = makeStyles(theme => ({
  root: {},
}))

export default function ShortDescription({ options }) {
  const classes = useStyles()
  const placeOptions = generateOptionsIcons(options)

  return (
    <Grid container justify={"center"} spacing={3}>
      {placeOptions.map(({ Component, name }, ind) => (
        <Grid item xs={1} key={ind}>
          <Tooltip title={name}>
            <Component />
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  )
}
