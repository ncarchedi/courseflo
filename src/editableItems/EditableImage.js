import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useDebounce from "../hooks/useDebounce";

export default function EditableImage({ item, onFocus, onChangeItem }) {
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
        name="source"
        label="Public URL"
        value={values.source}
        onChange={handleChange}
        margin="normal"
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
    </form>
  );
}
