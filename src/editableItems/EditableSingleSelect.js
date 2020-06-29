import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import ClearIcon from "@material-ui/icons/Clear";
import useDebounce from "../hooks/useDebounce";

export default function EditableSingleSelect({ item, onFocus, onChangeItem }) {
  const [values, setValues] = useState(item);
  const debouncedValues = useDebounce(values, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeOption = (index, value) => {
    const options = [...values.options];
    options[index] = value;
    setValues({ ...values, options });
  };

  const handleAddOption = () => {
    const options = [...values.options];
    options.push("");
    setValues({ ...values, options });
  };

  const handleDeleteOption = (index) => {
    const options = [...values.options];
    options.splice(index, 1);
    setValues({ ...values, options });
  };

  return (
    <form>
      <TextField
        name="image"
        label="Image (optional)"
        value={values.image}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
      {values.options.map((o, index) => (
        <Box key={"option" + index} display="flex" alignItems="center">
          <Box marginRight={1} display="flex">
            <RadioButtonUncheckedIcon color="disabled" />
          </Box>
          <TextField
            name={String(index)}
            value={o}
            onChange={(e) => handleChangeOption(index, e.target.value)}
            fullWidth
            onFocus={() => onFocus(values.id)}
          />
          <Box>
            <IconButton onClick={() => handleDeleteOption(index)}>
              <ClearIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box display="flex" alignItems="center" marginTop={1.5}>
        <Box marginRight={1} display="flex">
          <RadioButtonUncheckedIcon color="disabled" />
        </Box>
        <Link variant="body1" color="textSecondary" onClick={handleAddOption}>
          Add option
        </Link>
      </Box>
      <TextField
        name="solution"
        label="Solution"
        value={values.solution}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
      <TextField
        name="hint"
        label="Hint"
        value={values.hint}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
        onFocus={() => onFocus(values.id)}
      />
    </form>
  );
}
