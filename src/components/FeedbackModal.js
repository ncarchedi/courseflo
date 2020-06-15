import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { saveFeedbackToFirestore } from "../services/firestore";

export default function FeedbackModal({
  open,
  setOpen,
  courseId,
  answers,
  editing,
}) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    saveFeedbackToFirestore(courseId, email, feedback, answers);
    handleClose();
    e.preventDefault();
  };

  const handleClose = () => {
    setOpen(false);
    setFeedback("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Provide Feedback</DialogTitle>
      <DialogContent>
        {editing ? (
          <DialogContentText>
            Please let us know if you have any questions about editing your
            course, or if you have any suggestions for how we can make it
            easier.
          </DialogContentText>
        ) : (
          <DialogContentText>
            Please let us know if you have any questions or suggestions about
            this course, or if you're having trouble completing it for any
            reason.
          </DialogContentText>
        )}
        <form>
          <TextField
            type="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="feedback"
            label="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
            margin="normal"
            fullWidth
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!email || !feedback}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
