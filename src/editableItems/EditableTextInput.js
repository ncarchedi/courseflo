import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableTextInput({ item }) {
  return (
    <form>
      <TextField
        name="solution"
        label="Solution"
        value={item.solution}
        margin="normal"
        multiline
        fullWidth
      />
      <TextField
        name="hint"
        label="Hint"
        value={item.hint.raw}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}
