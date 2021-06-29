import React, { useEffect, useState } from "react"

import "@styles/codemirror.min.css"
import "@styles/froala_editor.pkgd.min.css"
import "@styles/froala_style.min.css"
import "@styles/style.scss"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Box from "@material-ui/core/Box"
import moment from "moment"
import Rating from "@material-ui/lab/Rating"
import median from "median-average"
import { setStorage, getStorage } from "@services/localstorage"
import Alert from "@components/Modal/Alert"
import HighlightOffIcon from "@material-ui/icons/HighlightOff"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  review: {
    position: "relative",
  },
  delete: {
    position: "absolute",
    top: "20px",
    right: "20px",
    cursor: "pointer",
  },
}))

export default function List({ reviews, onCallback }) {
  const classes = useStyles()
  const [openAlert, setOpenAlert] = useState(false)

  // const canSetRating = (ind) => {
  //   return getStorage(reviews[ind].id);
  // }

  const onDelete = async ind => {
    reviews.splice(ind, 1)
    onCallback(reviews)
  }

  // const setRating = async (event) => {
  //   const ind = event.target.name;
  //   const newValue = event.target.value;
  //   if(canSetRating(ind)) return setOpenAlert(true);
  //
  //   reviews[ind].rating.push(newValue);
  //   setStorage(reviews[ind].id, true);
  //   onCallback(reviews);
  // }

  return (
    <Grid container justify={"center"} alignItems={"center"} spacing={3}>
      {reviews.map((data, ind) => (
        <Grid className={classes.review} item key={data.date} xs={12}>
          <Paper style={{ padding: "10px" }}>
            <Box component="fieldset" borderColor="transparent">
              <Rating key={ind} name={"rating"} value={data.rating} />
              {/*<HighlightOffIcon onClick={() => onDelete(ind)} className={classes.delete}/>*/}
            </Box>
            <div dangerouslySetInnerHTML={{ __html: data.review }} />
            <Box style={{ textAlign: "right", fontSize: "12px" }}>
              {moment(data.date).format("DD-MM-yyyy")}
            </Box>
          </Paper>
        </Grid>
      ))}
      <Alert
        title={"Вы уже оценивали этот комментарий"}
        open={openAlert}
        onClose={() => setOpenAlert(false)}
      />
    </Grid>
  )
}
