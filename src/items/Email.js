import React from "react";
import TextField from "@material-ui/core/TextField";

export default function Email({ userEmail, setUserEmail, showSolution }) {
  return (
    <TextField
      value={userEmail}
      onChange={(e) => setUserEmail(e.target.value)}
      placeholder="someone@example.com"
      type="email"
      autoComplete="email"
      fullWidth
      disabled={showSolution}
    />
  );
}
