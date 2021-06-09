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
  // const place ={"name":"Solemar","alias":"solemar","phone":"121213213","price":"2000","distance":"50","address":"на море","description":"<p>фывафыаыва</p>","type":0,"position":{"lat":46.11810539661476,"lng":32.289845157039736},"imgs":["https://gport.s3-eu-central-1.amazonaws.com/i6l6zayax/a2uu94kjb.jpeg"],"options":[{"name":"shower","label":"Душ в номере"},{"name":"pool","label":"Бассейн"},{"name":"wifi","label":"Wifi"},{"name":"playground","label":"Детская площадка"}],"id":"i6l6zayax"}
  //
  //
  // db.collection("places").doc("LA").set(place)
  //   .then(() => {
  //     console.log("Document successfully written!");
  //   })
  //   .catch((error) => {
  //     console.error("Error writing document: ", error);
  //   });

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
      {places && <PlaceList items={places.docs} />}
    </>
  )
}
