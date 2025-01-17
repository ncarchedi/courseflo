import React, { useState } from "react";
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

export default function EditableMultiSelect({
  item,
  onFocus,
  onChangeItemValue,
  setItemValuesDirectly,
}) {
  const [openSolutionForm, setOpenSolutionForm] = useState(false);

  const handleChangeOption = (index, value) => {
    const options = [...item.options];
    options[index] = value;
    setItemValuesDirectly({ ...item, options });
  };

  const handleAddOption = () => {
    const options = [...item.options];
    options.push("");
    setItemValuesDirectly({ ...item, options });
  };

  const handleDeleteOption = (index) => {
    const options = [...item.options];
    options.splice(index, 1);
    setItemValuesDirectly({ ...item, options });
  };

  const handleChangeSolution = (option) => {
    let newSolution = item.solution;
    // if solution is null, set it to option
    if (newSolution === null) newSolution = [option];
    // if option is checked, uncheck it
    else if (newSolution.includes(option))
      newSolution = newSolution.filter((o) => o !== option);
    // otherwise, if option is unchecked, check it
    else newSolution = [...newSolution, option];
    setItemValuesDirectly({ ...item, solution: newSolution });
  };

  const handleEditSolution = () => {
    setOpenSolutionForm(true);
  };

  const handleSaveSolution = () => {
    setOpenSolutionForm(false);
  };

  return (
    <form onFocus={() => onFocus(item.id)}>
      <TextField
        name="image"
        label="Image (optional)"
        value={item.image}
        onChange={onChangeItemValue}
        margin="dense"
        multiline
        fullWidth
      />
      <TextField
        name="hint"
        label="Hint (optional)"
        value={item.hint}
        onChange={onChangeItemValue}
        margin="dense"
        multiline
        fullWidth
      />
      <>
        {openSolutionForm ? (
          <>
            <Box my={1}>
              <Typography variant="button">
                Choose correct answer(s):
              </Typography>
            </Box>
            <FormGroup>
              {item.options.map((o, index) => (
                <Box key={"option" + index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={o}
                        checked={!!item.solution && item.solution.includes(o)}
                        onChange={() => handleChangeSolution(o)}
                        color="primary"
                      />
                    }
                    label={renderHtmlFromString(o)}
                  />
                </Box>
              ))}
            </FormGroup>
            <Box mt={2}>
              <Button
                variant="outlined"
                onClick={handleSaveSolution}
                disabled={!item.solution || item.solution.length === 0}
              >
                Save solution
              </Button>
            </Box>
          </>
        ) : (
          <>
            {item.options.map((o, index) => (
              <Box key={"option" + index} display="flex" alignItems="center">
                <Box marginRight={1} display="flex">
                  {o && item.solution && item.solution.includes(o) ? (
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
              {item.solution !== null && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleEditSolution}
                  // disable button if no options or only a single blank option
                  disabled={
                    item.options.length === 0 ||
                    (item.options.length === 1 && item.options[0] === "")
                  }
                >
                  Edit solution
                </Button>
              )}
            </Box>
          </>
        )}
      </>
    </form>
  );
}
