import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableText({ item, onFocus, onChangeItemValue }) {
  const handleChange = (e) => {
    onChangeItemValue(item.id, e.target.name, e.target.value);
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
        onFocus={() => onFocus(item.id)}
      />
    </form>
  );
}
