import React, { useState } from 'react'
import PlaceList from "../components/place-list"
import { get } from "@api/place"
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'gatsby-plugin-firebase'
import { Grid } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogContent from '@material-ui/core/DialogContent'

// import { getPlaces } from '../utils/places'
// import { useEffect } from 'react'
// useEffect(() => {
//   getPlaces()
// }, [])

export default function Index() {
  const [db] = useState(firebase.firestore())

  const [places, loading, error] = useCollection(
    db.collection('places')
  );

  const getDataFromRef = (places) => {
    return places.docs.map((place) => { return place.data()})
  }

  return (
    <>
      {/*<p>*/}
      {/*  {error && <strong>Error: {JSON.stringify(error)}</strong>}*/}
      {/*  {loading && <span>Collection: Loading...</span>}*/}
      {/*  {places && (*/}
      {/*    <span>*/}
      {/*      Collection:{' '}*/}
      {/*      {places.docs.map((doc) => (*/}
      {/*        <React.Fragment key={doc.id}>*/}
      {/*          {JSON.stringify(doc.data())},{' '}*/}
      {/*        </React.Fragment>*/}
      {/*      ))}*/}
      {/*    </span>*/}
      {/*  )}*/}
      {/*</p>*/}
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <Grid container justify={'center'}><CircularProgress /></Grid>}
      {places && <PlaceList items={getDataFromRef(places)} />}
    </>
  )
}
