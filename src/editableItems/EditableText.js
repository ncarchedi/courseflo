import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableText({ item, onChangeItemValue }) {
  const handleChange = (e) => {
    onChangeItemValue(e.target.name, e.target.value);
  };

  return (
    <form>
      <TextField
        name="body"
        label="Body"
        value={item.body}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}
