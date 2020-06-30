import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useDebounce from "../hooks/useDebounce";

export default function EditableYouTube({ item, onFocus, onChangeItem }) {
  const [values, setValues] = useState(item);
  const debouncedValues = useDebounce(values, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChange = (e) => {
    setValues({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <TextField
        name="videoId"
        label="Video ID"
        value={values.videoId}
        onChange={handleChange}
        helperText="This is the series of letters and numbers at the end of the YouTube video URL (example: 1s58rW0_LN4)"
        margin="normal"
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
    </form>
  );
}
