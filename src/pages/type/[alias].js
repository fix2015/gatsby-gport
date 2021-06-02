import React from "react"
import PlaceList from "@components/place-list"
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

import { getListByType } from "@api/place"
import { TYPE } from "@src/Constants"

export default function Type({ alias }) {
  const places = getListByType(alias) || []
  const name = TYPE.filter(type => type.alias === alias)[0].name

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography style={{ textTransform: "capitalize" }} variant={"h6"}>
          {name}
        </Typography>
      </Grid>
      {places.length ? (
        <Grid item xs={12}>
          <PlaceList items={places} />
        </Grid>
      ) : (
        <Typography variant={"body2"}>
          Список еще пусть но скоро мы добавим новое жилье
        </Typography>
      )}
    </Grid>
  )
}
