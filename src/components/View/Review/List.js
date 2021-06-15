import React, { useEffect, useState } from 'react'

import '@styles/codemirror.min.css'
import '@styles/froala_editor.pkgd.min.css'
import '@styles/froala_style.min.css'
import '@styles/style.scss'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import moment from 'moment'
import firebase from 'gatsby-plugin-firebase'
import { updateCollection } from '../../../api/review'
import CircularProgress from '@material-ui/core/CircularProgress'
import Rating from '@material-ui/lab/Rating'
import median from 'median-average'
import { setStorage, getStorage } from '@services/localstorage'
import Alert from '@components/Modal/Alert'
import { Typography } from '@material-ui/core'

export default function List({ reviews }) {
  const [db] = useState(firebase.firestore())
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)
  const [reviewsData, setReviewsData] = useState([])
  const [openAlert, setOpenAlert] = useState(false);

  const canSetRating = (ind) => {
    return getStorage(reviewsData[ind].documentId);
  }

  const setRating = async (event) => {
    try {
      const ind = event.target.name;
      const newValue = event.target.value;
      if(canSetRating(ind)) return setOpenAlert(true);

      reviewsData[ind].rating.push(newValue)
      setErrorMessage('')
      const review = Object.assign({}, reviewsData[ind])
      setStorage(review.documentId, true);
      await updateCollection(db, { documentId: review.documentId, review: review })
      setReviewsData([...reviewsData])
      setLoading(false)
      return true
    } catch (e) {
      setLoading(false)
      console.error(e)
      setErrorMessage(e.toString())
    }
  }

  useEffect(() => {
    setReviewsData(reviews)
  }, [reviews])

  return (
    <Grid container justify={'center'} alignItems={'center'} spacing={3}>
      {errorMessage && <strong>Error: {JSON.stringify(errorMessage)}</strong>}
      {loading && <Grid container justify={'center'}><CircularProgress /></Grid>}
      {reviewsData.map((data, ind) => (
        <Grid item key={data.date} xs={12}>
          <Paper style={{ padding: '10px' }}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                key={ind}
                name={ind}
                id={ind}
                value={median(data.rating.map((rating) => rating * 1))}
                onChange={setRating}
              />
              {!data.documentId && <Typography>Это комментарий будет добавлен после проверки администрацией</Typography>}
            </Box>
            <div dangerouslySetInnerHTML={{ __html: data.review }} />
            <Box style={{ textAlign: 'right', fontSize: '12px' }}>{moment(data.date).format('DD-MM-yyyy')}</Box>
          </Paper>
        </Grid>
      ))}
      <Alert title={'Вы уже оценивали этот комментарий'}
             open={openAlert}
             onClose={() => setOpenAlert(false)}/>
    </Grid>
  )
}
