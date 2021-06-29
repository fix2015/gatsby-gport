import React, { useContext, useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useForm } from "react-hook-form"
import firebase from "@services/db"

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
// import {createUser} from '@api/user'
import Alert from "@material-ui/lab/Alert"
import { Grid } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

export default function SignUp({ open, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [errorMessage, setErrorMessage] = useState(null)
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(firebase.auth())

  useEffect(() => {
    if (!error && user) {
      // createUser((user) => ({
      //   email: user.user.email,
      //   uid: user.user.uid,
      // }))
      reset()
      onClose()
    }

    if (error) {
      setErrorMessage(error.message)
    }
  }, [user])

  const onSubmit = ({ email, password }) => {
    createUserWithEmailAndPassword(email, password)
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
        <DialogContent>
          {loading && (
            <Grid container justify={"center"}>
              <CircularProgress />
            </Grid>
          )}
          <TextField
            fullWidth
            disabled={loading}
            type="email"
            label="Email"
            id="email"
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}
          <TextField
            fullWidth
            disabled={loading}
            type="password"
            label="Пароль"
            id="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            type="password"
          />
          {errors.password && (
            <span role="alert">{errors.password.message}</span>
          )}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
