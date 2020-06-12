import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableImage({ item }) {
  return (
    <form>
      <TextField
        name="source"
        label="Public URL"
        value={item.source}
        margin="normal"
        fullWidth
      />
    </form>
  );
}
