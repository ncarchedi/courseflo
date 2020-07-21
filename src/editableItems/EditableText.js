import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableText({ item, onFocus, onChangeItemValue }) {
  return (
    <form onFocus={() => onFocus(item.id)}>
      <TextField
        name="body"
        label="Body"
        value={item.body}
        onChange={onChangeItemValue}
        margin="dense"
        multiline
        fullWidth
      />
    </form>
  );
}
