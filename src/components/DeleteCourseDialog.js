import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteCourseDialog({
  open,
  onCancel,
  onConfirm,
  courseTitle,
}) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-course-dialog-title"
      aria-describedby="delete-course-dialog-description"
    >
      <DialogTitle id="delete-course-dialog-title">Delete course?</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-course-dialog-description">
          Are you sure you want to delete <em>{courseTitle}</em>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm} variant="contained" color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
