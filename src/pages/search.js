import React, { useState } from "react"
import PlaceList from "@components/place-list"
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { useQueryParam, StringParam } from "use-query-params"

import { getListBySearch } from "@api/place"
import SearchPanel from "@components/SearchPanel"
import Box from "@material-ui/core/Box"

export default function Type() {
  const [text] = useQueryParam("text", StringParam)
  const [places, setPlaces] = useState([])

  const onSearch = search => {
    console.log(search)

    setPlaces([...getListBySearch(search)])
  }

  return (
    <Grid container justify={"center"} spacing={3}>
      <Grid item xs={12}>
        <Box>
          <Typography style={{ textTransform: "capitalize" }} variant={"h6"}>
            Поиск: {text}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <SearchPanel onCalback={onSearch} />
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
