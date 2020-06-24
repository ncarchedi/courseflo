import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { CorrectIcon, IncorrectIcon } from "../components/Icons";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    maxWidth: theme.breakpoints.values.sm - 50,
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
  correctOption: {
    backgroundColor: green[100],
  },
  incorrectOption: {
    backgroundColor: red[100],
  },
  correctAnswer: {
    margin: theme.spacing(1, 0),
    fontSize: "1rem",
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

  if (!answer) return null;

  if (showSolution)
    return (
      <>
        {item.image && (
          <Box className={classes.imageContainer} margin="auto">
            <img src={item.image} alt={item.title} width="100%" />
          </Box>
        )}
        <FormGroup>
          {item.options.map((option) => (
            <Box
              key={option}
              className={`
      ${classes.option}
      ${
        answer.value.includes(option)
          ? item.solution.includes(option)
            ? classes.correctOption
            : classes.incorrectOption
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
                    name={option}
                    checked={answer.value.includes(option)}
                    onChange={() => handleCheck(option)}
                    disabled
                  />
                }
                label={renderHtmlFromString(option)}
              />
              {answer.value.includes(option) ? ( // if the option is selected
                item.solution.includes(option) ? ( // and it's correct
                  <CorrectIcon />
                ) : (
                  <IncorrectIcon />
                )
              ) : null}
            </Box>
          ))}
        </FormGroup>
        {!answer.isCorrect && (
          <>
            <Typography
              className={classes.correctAnswer}
              variant="h6"
              color="textSecondary"
            >
              Correct answer
            </Typography>
            <FormGroup>
              {item.options.map(
                (option) =>
                  item.solution.includes(option) && (
                    <Box key={option} className={classes.option}>
                      <FormControlLabel
                        control={<Checkbox name={option} checked disabled />}
                        label={renderHtmlFromString(option)}
                      />
                    </Box>
                  )
              )}
            </FormGroup>
          </>
        )}
      </>
    );

  return (
    <>
      {item.image && (
        <Box className={classes.imageContainer} margin="auto">
          <img src={item.image} alt={item.title} width="100%" />
        </Box>
      )}
      <FormGroup>
        {item.options.map((option) => (
          <Box key={option} component="span" display="flex" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  name={option}
                  checked={answer.value.includes(option)}
                  onChange={() => handleCheck(option)}
                  color="primary"
                />
              }
              label={renderHtmlFromString(option)}
            />
          </Box>
        ))}
      </FormGroup>
    </>
  );
}
