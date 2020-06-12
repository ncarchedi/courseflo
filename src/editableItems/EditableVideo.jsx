import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableVideo({ item }) {
  return (
    <form>
      <TextField
        name="source"
        label="YouTube URL"
        value={item.source}
        margin="normal"
        fullWidth
      />
    </form>
  );
}
