import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableVideo({ item, onChangeItemValue }) {
  const handleChange = (e) => {
    onChangeItemValue(e.target.name, e.target.value);
  };

  return (
    <form>
      <TextField
        name="source"
        label="YouTube URL"
        value={item.source}
        onChange={handleChange}
        margin="normal"
        fullWidth
      />
    </form>
  );
}
