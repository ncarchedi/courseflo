import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { CorrectIcon, IncorrectIcon } from "../components/Icons";

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginBottom: theme.spacing(2),
  },
  option: {
    width: "100%",
    margin: theme.spacing(0.25, 0),
    padding: theme.spacing(0, 1),
    borderRadius: theme.shape.borderRadius,
  },
  optionLabel: {
    flexGrow: 1,
  },
  correct: {
    backgroundColor: green[100],
  },
  incorrect: {
    backgroundColor: red[100],
  },
}));

export default function MultiSelect({
  item,
  answer,
  onChangeAnswer,
  showSolution,
}) {
  const classes = useStyles();

  const handleCheck = (option) => {
    // if answer is undefined, define it
    let newValue = answer.value;
    // if option is checked, uncheck it
    if (newValue.includes(option))
      newValue = newValue.filter((o) => o !== option);
    // otherwise, uncheck it
    else newValue = [...newValue, option];
    // update state
    onChangeAnswer(item.id, newValue);
  };

  return (
    <>
      {showSolution ? (
        <>
          <Typography
            variant="h6"
            style={{ color: answer.isCorrect ? green[600] : red[600] }}
          >
            {item.prompt}
          </Typography>
          <FormHelperText className={classes.helperText}>
            (Check all that apply)
          </FormHelperText>
          <FormGroup>
            {item.options.map((option) => (
              <Box
                key={option.raw}
                className={`
              ${classes.option}
              ${
                answer.value.includes(option.raw)
                  ? item.solution.includes(option.raw)
                    ? classes.correct
                    : classes.incorrect
                  : null
              }`}
                component="span"
                display="flex"
                alignItems="center"
              >
                <FormControlLabel
                  className={classes.optionLabel}
                  control={
                    <Checkbox
                      name={option.raw}
                      checked={answer.value.includes(option.raw)}
                      onChange={() => handleCheck(option.raw)}
                      disabled
                    />
                  }
                  label={option.rendered}
                />
                {answer.value.includes(option.raw) ? ( // if the option is selected
                  item.solution.includes(option.raw) ? ( // and it's correct
                    <CorrectIcon />
                  ) : (
                    <IncorrectIcon />
                  )
                ) : null}
              </Box>
            ))}
          </FormGroup>
        </>
      ) : (
        <>
          <Typography variant="h6">{item.prompt}</Typography>
          <FormHelperText className={classes.helperText}>
            (Check all that apply)
          </FormHelperText>
          <FormGroup>
            {item.options.map((option) => (
              <Box
                key={option.raw}
                component="span"
                display="flex"
                alignItems="center"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name={option.raw}
                      checked={answer.value.includes(option.raw)}
                      onChange={() => handleCheck(option.raw)}
                    />
                  }
                  label={option.rendered}
                />
              </Box>
            ))}
          </FormGroup>
        </>
      )}
    </>
  );
}
