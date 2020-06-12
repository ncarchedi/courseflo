import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableText({ item }) {
  return (
    <form>
      <TextField
        name="body"
        label="Body"
        value={item.body.raw}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}
