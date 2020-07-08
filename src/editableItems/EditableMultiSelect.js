import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import ClearIcon from "@material-ui/icons/Clear";
import renderHtmlFromString from "../utils/renderHtmlFromString";
import useDebounce from "../hooks/useDebounce";

export default function EditableMultiSelect({ item, onFocus, onChangeItem }) {
  // should only update `values` directly from the form
  // global `item` state will be updated after debounce
  const [values, setValues] = useState(item);
  const [openSolutionForm, setOpenSolutionForm] = useState(false);
  const debouncedValues = useDebounce(values, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChange = (e) => {
    setValues({ ...item, [e.target.name]: e.target.value });
  };

  const handleChangeOption = (index, value) => {
    const options = [...values.options];
    options[index] = value;
    setValues({ ...item, options });
  };

  const handleAddOption = () => {
    const options = [...values.options];
    options.push("");
    setValues({ ...item, options });
  };

  const handleDeleteOption = (index) => {
    const options = [...values.options];
    options.splice(index, 1);
    setValues({ ...item, options });
  };

  const handleChangeSolution = (option) => {
    let newSolution = values.solution;
    // if option is checked, uncheck it
    if (newSolution.includes(option))
      newSolution = newSolution.filter((o) => o !== option);
    // otherwise, check it
    else newSolution = [...newSolution, option];
    setValues({ ...item, solution: newSolution });
  };

  return (
    <form onFocus={() => onFocus(values.id)}>
      <TextField
        name="image"
        label="Image (optional)"
        value={values.image}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
      <>
        {openSolutionForm ? (
          <>
            <Box my={1}>
              <Typography variant="button">Choose correct answers:</Typography>
            </Box>
            <FormGroup>
              {values.options.map((option) => (
                <Box key={option} marginBottom={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={option}
                        checked={values.solution.includes(option)}
                        onChange={() => handleChangeSolution(option)}
                        color="primary"
                      />
                    }
                    label={renderHtmlFromString(option)}
                  />
                </Box>
              ))}
            </FormGroup>
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={() => setOpenSolutionForm(false)}
              >
                Done editing solution
              </Button>
            </Box>
          </>
        ) : (
          <>
            {values.options.map((o, index) => (
              <Box key={"option" + index} display="flex" alignItems="center">
                <Box marginRight={1} display="flex">
                  {o && values.solution.includes(o) ? (
                    <CheckBoxIcon color="disabled" />
                  ) : (
                    <CheckBoxOutlineBlankIcon color="disabled" />
                  )}
                </Box>
                <TextField
                  value={o}
                  placeholder={"Option " + (index + 1)}
                  onChange={(e) => handleChangeOption(index, e.target.value)}
                  fullWidth
                />
                <Box>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDeleteOption(index)}>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))}
            <Box display="flex" alignItems="center" marginTop={1.5}>
              <Box marginRight={1} display="flex">
                <CheckBoxOutlineBlankIcon color="disabled" />
              </Box>
              <Link
                variant="body1"
                color="textSecondary"
                onClick={handleAddOption}
              >
                Add option
              </Link>
            </Box>
            <Box mt={2}>
              <Button
                variant="contained"
                onClick={() => setOpenSolutionForm(true)}
                // disable button if no options or only a single blank option
                disabled={
                  values.options.length === 0 ||
                  (values.options.length === 1 && values.options[0] === "")
                }
              >
                Edit solution
              </Button>
            </Box>
          </>
        )}
      </>
      <TextField
        name="hint"
        label="Hint (optional)"
        value={values.hint}
        onChange={handleChange}
        margin="normal"
        multiline
        fullWidth
      />
    </form>
  );
}
