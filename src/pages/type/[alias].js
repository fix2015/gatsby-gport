import React from "react"
import PlaceList from "@components/place-list"
import { Divider, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const items = []
for (var i = 0; i < 24; i++) {
  items.push({
    src: " https://source.unsplash.com/random",
    title: `Lorum imasdf`,
    alias: "sea_gport",
  })
}

export default function Type({ alias }) {

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography style={{'textTransform': 'capitalize'}} variant={'h6'}>{alias}</Typography>
      </Grid>
      <Grid item xs={12}>
        <PlaceList items={items} />
      </Grid>
    </Grid>
  )
}
