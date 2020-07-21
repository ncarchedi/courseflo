import React, { useEffect } from "react";
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
    padding: theme.spacing(0.25, 1),
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
  userItem,
  onChangeAnswer,
  showSolution,
}) {
  const classes = useStyles();

  useEffect(() => {
    const listener = (event) => {
      if (event.code.includes("Digit")) {
        event.preventDefault();
        const num = event.code.replace("Digit", "");
        if (num > 0 && num <= item.options.length)
          handleCheck(item.options[num - 1]);
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  const handleCheck = (option) => {
    // prevents changing answer in editor preview
    if (!onChangeAnswer) return null;
    // start with the current answer
    let newAnswer = userItem.answer;
    // if option is checked, uncheck it
    if (newAnswer.includes(option))
      newAnswer = newAnswer.filter((o) => o !== option);
    // otherwise, check it
    else newAnswer = [...newAnswer, option];
    // update state
    onChangeAnswer(item.id, newAnswer);
  };

  if (showSolution && item.solution !== null)
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
        userItem.answer.includes(option)
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
                    checked={userItem.answer.includes(option)}
                    onChange={() => handleCheck(option)}
                    disabled
                  />
                }
                label={renderHtmlFromString(option)}
              />
              {userItem.answer.includes(option) ? ( // if the option is selected
                item.solution.includes(option) ? ( // and it's correct
                  <CorrectIcon />
                ) : (
                  <IncorrectIcon />
                )
              ) : null}
            </Box>
          ))}
        </FormGroup>
        {!userItem.isCorrect && (
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
          <Box key={option} marginBottom={1}>
            <FormControlLabel
              control={
                <Checkbox
                  name={option}
                  checked={
                    (userItem && userItem.answer.includes(option)) || false
                  }
                  onChange={() => handleCheck(option)}
                  color="primary"
                  disabled={showSolution && item.solution === null}
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
