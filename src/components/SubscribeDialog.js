import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Emoji from "./Emoji";
import { addPaidLaunchSignupToFirebase } from "../services/firebase";

export default function SubscribeDialog({
  open,
  setOpen,
  userId,
  userEmail,
  userPlan,
}) {
  const [email, setEmail] = useState(userEmail || "");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPaidLaunchSignupToFirebase(userId, email, userPlan);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="subscribe-dialog-title"
    >
      <DialogTitle id="subscribe-dialog-title">
        Our Professional plan is coming soon{" "}
        <Emoji symbol="🙌" label="raising hands" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          We're working around the clock to create our Professional plan.{" "}
          {userEmail
            ? `Would you like us to email you at ${userEmail} when it's available?`
            : "If you leave your email, we promise to let you know when it's available!"}
        </DialogContentText>
        {!userEmail && (
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            autoComplete="email"
            fullWidth
            required
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Get notified
        </Button>
      </DialogActions>
    </Dialog>
  );
}
