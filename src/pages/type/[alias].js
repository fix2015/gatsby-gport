import React, { useContext, useEffect, useState } from 'react'
import PlaceList from "@components/place-list"
import { Grid } from "@material-ui/core"
import Typography from "@material-ui/core/Typography"

import { getByListByType, loadFormatData } from "@api/place"
import { TYPE } from "@src/Constants"
import firebase from 'gatsby-plugin-firebase'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'
import { LoadingContext } from '@hoc/loading'
import { ErrorMessageContext } from '@hoc/errorMessage'

export default function Type({ alias }) {
  const [db] = useState(firebase.firestore());
  const [places, setPlaces] = useState([]);
  const {id, name} = TYPE.filter(type => type.alias === alias)[0]
  const ref = getByListByType(db, id);
  const { loading, setLoading } = useContext(LoadingContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorMessageContext);

  useEffect(async () => {
    try{
      setErrorMessage('');
      setLoading(true);
      const data = await loadFormatData(ref);
      setPlaces(data);
    }catch (e){
      setErrorMessage('Error getting documents');
      setPlaces([]);
    }

    setLoading(false);
  }, [alias])

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
