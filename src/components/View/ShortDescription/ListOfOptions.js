import React, { useState } from "react"
import Grid from '@material-ui/core/Grid'

import { generateEditOptionsIcons } from "@services/options"

export default function ShortDescription({ options }) {
  const [optionParams] = useState(
    generateEditOptionsIcons(options)
  )

  return (
    <Grid container justify={'center'} spacing={3}>
      {optionParams.map(({ name, icon, Component, value }, ind) => (
        <Grid key={ind} item>
          <Component />
        </Grid>
      ))}
    </Grid>
  )
}
