import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { CorrectIcon, IncorrectIcon } from "../components/Icons";

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginBottom: theme.spacing(2),
  },
  option: {
    width: "100%",
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

export default function SingleSelect({
  item,
  answer,
  onChangeAnswer,
  showSolution,
}) {
  const classes = useStyles();

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
            (Select only one)
          </FormHelperText>
          <RadioGroup
            value={answer.value}
            onChange={(e) => onChangeAnswer(item.id, e.target.value)}
          >
            {item.options.map((option) => (
              <Box
                key={option.raw}
                className={`${classes.option} ${
                  answer.value === option.raw
                    ? answer.isCorrect
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
                  value={option.raw}
                  label={option.rendered}
                  control={<Radio disabled />}
                />
                {answer.value === option.raw ? ( // if the option is selected
                  answer.isCorrect ? ( // and it's correct
                    <CorrectIcon />
                  ) : (
                    <IncorrectIcon />
                  )
                ) : null}
              </Box>
            ))}
          </RadioGroup>
        </>
      ) : (
        <>
          <Typography variant="h6">{item.prompt}</Typography>
          <FormHelperText className={classes.helperText}>
            (Select only one)
          </FormHelperText>
          <RadioGroup
            value={answer.value}
            onChange={(e) => onChangeAnswer(item.id, e.target.value)}
          >
            {item.options.map((option) => (
              <Box
                key={option.raw}
                component="span"
                display="flex"
                alignItems="center"
              >
                <FormControlLabel
                  value={option.raw}
                  label={option.rendered}
                  control={<Radio />}
                />
              </Box>
            ))}
          </RadioGroup>
        </>
      )}
    </>
  );
}
