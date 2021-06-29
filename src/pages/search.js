import React, { useContext, useEffect, useState } from "react"
import PlaceList from "@components/place-list"
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import { useQueryParam, StringParam } from "use-query-params"

import { getListBySearch, loadFormatData } from "@api/place"
import SearchPanel from "@components/SearchPanel"
import Box from "@material-ui/core/Box"
import CircularProgress from "@material-ui/core/CircularProgress"
import Alert from "@material-ui/lab/Alert"
import firebase from "@services/db"
import { LoadingContext } from "@hoc/loading"
import { ErrorMessageContext } from "@hoc/errorMessage"

export default function Type() {
  const [text] = useQueryParam("text", StringParam)
  const [places, setPlaces] = useState([])
  const { loading, setLoading } = useContext(LoadingContext)
  const { errorMessage, setErrorMessage } = useContext(ErrorMessageContext)
  const [db] = useState(firebase.firestore())

  const onSearch = async search => {
    try {
      console.log("onCallback", search)
      setErrorMessage("")
      setLoading(true)
      const data = await getListBySearch(db, search)
      setPlaces(data)
    } catch (e) {
      setErrorMessage("Error getting documents")
      setPlaces([])
    }

    setLoading(false)
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
