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
import ItemHeader from "../components/ItemHeader";

const useStyles = makeStyles((theme) => ({
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

  return (
    <>
      {showSolution ? (
        <>
          <ItemHeader
            item={item}
            titleColor={answer.isCorrect ? green[600] : red[600]}
          />
          <FormGroup>
            {item.options.map((option) => (
              <Box
                key={option.raw}
                className={`
              ${classes.option}
              ${
                answer.value.includes(option.raw)
                  ? item.solution.includes(option.raw)
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
                    item.solution.includes(option.raw) && (
                      <Box key={option.raw} className={classes.option}>
                        <FormControlLabel
                          control={
                            <Checkbox name={option.raw} checked disabled />
                          }
                          label={option.rendered}
                        />
                      </Box>
                    )
                )}
              </FormGroup>
            </>
          )}
        </>
      ) : (
        <>
          <ItemHeader item={item} />
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
