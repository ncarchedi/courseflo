import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { saveFeedbackToFirestore } from "../services/firestore";

export default function FeedbackModal({ open, setOpen, answers }) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const { courseId } = useParams();

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
        <DialogContentText>
          Please let us know if you have any questions or suggestions!
        </DialogContentText>
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
