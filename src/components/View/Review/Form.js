import React, { useState } from "react"
import FroalaEditorComponent from "react-froala-wysiwyg"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"
import Rating from "@material-ui/lab/Rating"

import "@styles/codemirror.min.css"
import "@styles/froala_editor.pkgd.min.css"
import "@styles/froala_style.min.css"
import "@styles/style.scss"
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Alert from "@components/Modal/Alert"
import { randormHash } from "@services/string"
import Paper from "@material-ui/core/Paper"

export default function Form({ onCallback }) {
  const [review, setReview] = useState("")
  const [openAlert, setOpenAlert] = useState(false)
  const [rating, setRating] = useState(5)

  const onModelChange = text => {
    setReview(text)
  }

  const createReview = async () => {
    const reviewInfo = {
      id: randormHash(),
      rating,
      review,
      date: new Date().getTime(),
    }
    onCallback(reviewInfo)
    setReview("")
  }

  return (
    <Paper style={{ padding: "10px" }}>
      <Grid container justify={"center"} alignItems={"center"} spacing={3}>
        <Grid display="flex" item xs={12}>
          <Typography>
            <Box display={"flex"}>
              Оцените по 5 бальной шкале
              <Rating
                name={"rating"}
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue)
                }}
              />
            </Box>
          </Typography>
        </Grid>
        <Grid item lg={10} md={10} xs={12}>
          <FroalaEditorComponent
            model={review}
            tag="textarea"
            onModelChange={onModelChange}
          />
        </Grid>
        <Grid item lg={2} md={2} xs={12}>
          <Box>
            <Button
              onClick={() => createReview()}
              color={"secondary"}
              variant={"contained"}
            >
              Отправить
            </Button>
          </Box>
        </Grid>
        <Alert
          title={"Ващ отзыв успешно добавлен"}
          open={openAlert}
          onClose={() => setOpenAlert(false)}
        />
      </Grid>
    </Paper>
  )
}
