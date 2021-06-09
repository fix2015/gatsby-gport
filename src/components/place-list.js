import React from "react"
import { Grid } from "@material-ui/core"
import Item from "./item"

export default function PlaceList({ items }) {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      {items.map((item, ind) => (
        <Grid
          justify="center"
          container
          key={ind}
          item
          xs={12}
          md={4}
          sm={6}
          lg={3}
        >
          <Item item={item.data()} />
        </Grid>
      ))}
    </Grid>
  )
}
