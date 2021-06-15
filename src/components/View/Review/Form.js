import React, { useState } from 'react'
import FroalaEditorComponent from 'react-froala-wysiwyg'
import Box from '@material-ui/core/Box'

import '@styles/codemirror.min.css'
import '@styles/froala_editor.pkgd.min.css'
import '@styles/froala_style.min.css'
import '@styles/style.scss'
import { Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createCollection } from '@api/review'
import firebase from 'gatsby-plugin-firebase'

import Alert from '@components/Modal/Alert'

export default function Form({ documentId, onCallback }) {
  const [db] = useState(firebase.firestore());
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const onModelChange = (text) => {
    setReview(text);
  }

  const createReview = async () => {
    try{
      setErrorMessage('');
      const reviewInfo = {placeId: documentId, rating: [], review, date: new Date().getTime()};
      await createCollection(db, reviewInfo);
      onCallback(reviewInfo)
      setLoading(false);
      setReview('');
      setOpenAlert(true);

      return true;
    }catch (e){
      setLoading(false);
      console.error(e)
      setErrorMessage(e.toString());
    }
  }

  return (
    <Grid container justify={'center'} alignItems={'center'} spacing={3}>
      {errorMessage && <strong>Error: {JSON.stringify(errorMessage)}</strong>}
      {loading && <Grid container justify={'center'}><CircularProgress /></Grid>}
      <Grid item lg={10} md={10} xs={12}>
        <FroalaEditorComponent
          model={review}
          tag="textarea"
          onModelChange={onModelChange}
        />
      </Grid>
      <Grid item lg={2} md={2} xs={12}>
        <Box>
          <Button onClick={() => createReview()} color={'secondary'} variant={'contained'}>
            Отправить
          </Button>
        </Box>
      </Grid>
      <Alert title={'Ващ отзыв успешно добавлен'}
             open={openAlert}
             onClose={() => setOpenAlert(false)}/>
    </Grid>
  )
}
