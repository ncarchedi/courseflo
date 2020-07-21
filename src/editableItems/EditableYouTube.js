import React from "react";
import TextField from "@material-ui/core/TextField";

export default function EditableYouTube({ item, onFocus, onChangeItemValue }) {
  return (
    <form onFocus={() => onFocus(item.id)}>
      <TextField
        name="videoId"
        label="Video ID"
        value={item.videoId}
        onChange={onChangeItemValue}
        helperText="This is the series of letters and numbers at the end of the YouTube video URL (example: 1s58rW0_LN4)"
        margin="dense"
        fullWidth
      />
    </form>
  );
}
