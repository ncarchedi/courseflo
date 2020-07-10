import React from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function CompleteCourseDialog({ onSubmit, open, setOpen }) {
  let { url } = useRouteMatch();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="complete-course-dialog-title"
      aria-describedby="complete-course-dialog-description"
    >
      <DialogTitle id="complete-course-dialog-title">
        {"Ready to submit?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="complete-course-dialog-description">
          Once you submit your answers, you won't be able to change them.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          component={RouterLink}
          to={`${url}/score`}
          onClick={onSubmit}
          variant="contained"
          color="primary"
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
