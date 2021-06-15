import React, { useEffect, useState } from 'react'

import '@styles/codemirror.min.css'
import '@styles/froala_editor.pkgd.min.css'
import '@styles/froala_style.min.css'
import '@styles/style.scss'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from 'gatsby-plugin-firebase'
import { getByPlaceId, loadFormatData } from '@api/review'
import Form from './Form'
import List from './List'

export default function Index({ documentId }) {
  const [db] = useState(firebase.firestore());
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const onAddReview = (review) => {
    setReviews([review, ...reviews]);
  }

  useEffect(async () => {
    try {
      setLoading(true);
      let reviews = await loadFormatData(getByPlaceId(db, documentId));
      setReviews(reviews);
      console.log(reviews)
      setLoading(false);
    }catch (e){
      setErrorMessage(e);
      setLoading(false);
      setReviews( []);
    }
  }, [documentId])


  return (
    <Grid container justify={'center'} alignItems={'center'} spacing={3}>
      {errorMessage && <strong>Error: {JSON.stringify(errorMessage)}</strong>}
      {loading && <Grid container justify={'center'}><CircularProgress /></Grid>}
      <Grid item xs={12}>
        <Form documentId={documentId} onCallback={onAddReview}/>
      </Grid>
      <Grid item xs={12}>
        <List reviews={reviews}/>
      </Grid>
    </Grid>
  )
}
