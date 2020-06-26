import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableTextInput({ item, onChangeItemValue }) {
  const handleChange = (e) => {
    onChangeItemValue(e.target.name, e.target.value);
  };

  return (
    <form>
      <TextField
        name="solution"
        label="Solution"
        value={item.solution}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
      <TextField
        name="hint"
        label="Hint"
        value={item.hint}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}
