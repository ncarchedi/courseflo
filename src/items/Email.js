import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Email({ userEmail, setUserEmail, showSolution }) {
  return (
    <TextField
      value={userEmail}
      onChange={(e) => setUserEmail(e.target.value)}
      placeholder="Type your email here..."
      fullWidth
      disabled={showSolution}
    />
  );
}
