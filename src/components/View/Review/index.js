import React, { useState } from 'react'

import '@styles/codemirror.min.css'
import '@styles/froala_editor.pkgd.min.css'
import '@styles/froala_style.min.css'
import '@styles/style.scss'
import Grid from '@material-ui/core/Grid'
import Form from './Form'
import List from './List'

export default function Index({ documentId, onCallback, reviews }) {
  const onAddReview = (review) => {
    onCallback([review, ...reviews]);
  }
  const onAddReviews = (reviews) => {
    onCallback([...reviews]);
  }
  console.log('reviews', reviews)

  return (
    <Grid container justify={'center'} alignItems={'center'} spacing={3}>
      <Grid item xs={12}>
        <Form  documentId={documentId} onCallback={onAddReview}/>
      </Grid>
      <Grid item xs={12}>
        {reviews.length &&  <List documentId={documentId} onCallback={onAddReviews} reviews={reviews}/>}
      </Grid>
    </Grid>
  )
}
