import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function EmailDialog({ open, setOpen, setUserEmail }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    setUserEmail(email);
    setOpen(false);
    e.preventDefault();
  };

  return (
    <Dialog open={open}>
      <DialogTitle>What's your email address?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          We'll send you a link to restore your progress in case you need to
          leave and come back later.
        </DialogContentText>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            type="email"
            name="email"
            label="Email address"
            placeholder="someone@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={!email}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
