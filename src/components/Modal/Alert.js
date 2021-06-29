import React from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogContent from "@material-ui/core/DialogContent"

export default function Alert({ onClose, title, text, open }) {
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={() => handleClose()}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="simple-dialog-content">{text}</DialogContentText>
      </DialogContent>
    </Dialog>
  )
}
