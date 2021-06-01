import React from "react"
import Grid from '@material-ui/core/Grid'

import { generateEditOptionsIcons } from "@services/options"

export default function ListOfOptions({ options }) {
  const optionParams = generateEditOptionsIcons(options);

  return (
    <Grid container justify={'center'} spacing={3}>
      {optionParams.filter((option) => { return option.value}).map(({ icon }, ind) => (
        <Grid key={ind} item>
          {React.cloneElement(icon, { color: 'action' })}
        </Grid>
      ))}
    </Grid>
  )
}
