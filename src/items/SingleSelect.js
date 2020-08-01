import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CorrectIcon, IncorrectIcon } from "../components/Icons";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  container: {
    "& p": {
      margin: 0,
    },
  },
  imageContainer: {
    maxWidth: theme.breakpoints.values.sm - 50,
  },
  option: {
    width: "100%",
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

export default function SingleSelect({
  item,
  userItem,
  onChangeAnswer,
  showSolution,
}) {
  const classes = useStyles();

  useEffect(() => {
    // don't apply keyboard shortcuts while editing
    // (i.e. when onChangeAnswer isn't provided)
    if (onChangeAnswer) {
      const listener = (event) => {
        if (event.code.includes("Digit")) {
          event.preventDefault();
          const num = event.code.replace("Digit", "");
          if (num > 0 && num <= item.options.length)
            onChangeAnswer(item.id, item.options[num - 1]);
        }
      };
      document.addEventListener("keydown", listener);

      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  });

  const handleChange = (e) => {
    // prevents changing answer in editor preview
    if (!onChangeAnswer) return null;
    onChangeAnswer(item.id, e.target.value);
  };

  if (showSolution && item.solution !== null)
    return (
      <Box className={classes.container}>
        {item.image && (
          <Box className={classes.imageContainer} margin="auto">
            <img src={item.image} alt={item.title} width="100%" />
          </Box>
        )}
        <RadioGroup value={userItem.answer} onChange={handleChange}>
          {item.options.map((option) => (
            <Box
              key={option}
              className={`${classes.option} ${
                userItem.answer === option
                  ? userItem.isCorrect
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
                value={option}
                label={renderHtmlFromString(option)}
                control={<Radio disabled />}
              />
              {userItem.answer === option ? ( // if the option is selected
                userItem.isCorrect ? ( // and it's correct
                  <CorrectIcon />
                ) : (
                  <IncorrectIcon />
                )
              ) : null}
            </Box>
          ))}
        </RadioGroup>
        {!userItem.isCorrect && (
          <>
            <Typography
              className={classes.correctAnswer}
              variant="h6"
              color="textSecondary"
            >
              Correct answer
            </Typography>
            <Box className={classes.option}>
              <FormControlLabel
                label={renderHtmlFromString(userItem.solution)}
                control={<Radio checked disabled />}
              />
            </Box>
          </>
        )}
      </Box>
    );

  return (
    <Box className={classes.container}>
      {item.image && (
        <Box className={classes.imageContainer} margin="auto">
          <img src={item.image} alt={item.title} width="100%" />
        </Box>
      )}
      <RadioGroup
        value={(userItem && userItem.answer) || false}
        onChange={handleChange}
      >
        {item.options.map((option) => (
          <Box key={option} marginBottom={1}>
            <FormControlLabel
              value={option}
              label={renderHtmlFromString(option)}
              control={<Radio color="primary" />}
              disabled={showSolution && item.solution === null}
            />
          </Box>
        ))}
      </RadioGroup>
    </Box>
  );
}
