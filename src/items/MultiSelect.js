import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { EmojiCorrect, EmojiIncorrect } from "../components/Emoji";

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginBottom: theme.spacing(2),
  },
}));

export default function MultiSelect({
  item,
  value,
  onChangeInput,
  showSolution,
}) {
  const classes = useStyles();

  const handleCheck = (option) => {
    // if value is undefined, define it
    let newValue = value || [];
    // if option is checked, uncheck it
    if (newValue.includes(option))
      newValue = newValue.filter((o) => o !== option);
    // otherwise, uncheck it
    else newValue = [...newValue, option];
    // update state
    onChangeInput(item.id, newValue);
  };

  return (
    <>
      <Typography variant="h6">{item.prompt}</Typography>
      <FormHelperText className={classes.helperText}>
        (Check all that apply)
      </FormHelperText>
      <FormGroup>
        {item.options.map((option) => (
          <Box key={option} component="span" display="flex" alignItems="center">
            {showSolution &&
              (item.solution.includes(option) ? (
                <EmojiCorrect />
              ) : (
                <EmojiIncorrect />
              ))}
            <FormControlLabel
              control={
                <Checkbox
                  name={option}
                  checked={value.includes(option)}
                  onChange={() => handleCheck(option)}
                  disabled={showSolution}
                />
              }
              label={option}
            />
          </Box>
        ))}
      </FormGroup>
    </>
  );
}
