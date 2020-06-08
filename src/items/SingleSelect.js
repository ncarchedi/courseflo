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
import ItemTitle from "../components/ItemTitle";
import renderHtmlFromString from "../utils/renderHtmlFromString";

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
  answer,
  onChangeAnswer,
  showSolution,
}) {
  const classes = useStyles();

  return (
    <>
      {showSolution ? (
        <>
          <ItemTitle
            style={{ color: answer.isCorrect ? green[600] : red[600] }}
            item={item}
          />
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
          {!answer.isCorrect && (
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
                  label={renderHtmlFromString(answer.solution)}
                  control={<Radio checked disabled />}
                />
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          <ItemTitle item={item} />
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
