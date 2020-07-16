import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {
  ItemIcon,
  CorrectItemIcon,
  IncorrectItemIcon,
  CorrectIcon,
  IncorrectIcon,
} from "../components/Icons";
import ItemHeader from "../components/ItemHeader";
import ItemFooter from "../components/ItemFooter";

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    maxWidth: theme.breakpoints.values.sm - 50,
  },
  input: {
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
  },
  correctInput: {
    backgroundColor: green[100],
  },
  incorrectInput: {
    backgroundColor: red[100],
  },
  correctAnswer: {
    margin: theme.spacing(1, 0),
    fontSize: "1rem",
  },
}));

export default function LongText({
  item,
  userItem,
  onChangeAnswer,
  showSolution,
}) {
  const classes = useStyles();

  const handleChange = (e) => {
    // prevents changing answer in editor preview
    if (!onChangeAnswer) return null;
    onChangeAnswer(item.id, e.target.value);
  };

  if (showSolution)
    return (
      <>
        <ItemHeader
          title={item.prompt}
          icon={
            userItem.isCorrect ? <CorrectItemIcon /> : <IncorrectItemIcon />
          }
          required={item.required}
          titleColor={userItem.isCorrect ? green[800] : red[800]}
        />
        {item.image && (
          <Box className={classes.imageContainer} margin="auto">
            <img src={item.image} alt={item.title} width="100%" />
          </Box>
        )}
        <Box
          className={`${classes.input} ${
            userItem.isCorrect ? classes.correctInput : classes.incorrectInput
          }`}
          component="span"
          display="flex"
          alignItems="center"
        >
          <TextField
            value={userItem.answer}
            onChange={handleChange}
            placeholder="Type your answer here..."
            fullWidth
            multiline
            disabled
          />
          {item.solution === userItem.answer ? (
            <CorrectIcon />
          ) : (
            <IncorrectIcon />
          )}
        </Box>
        {!userItem.isCorrect && (
          <>
            <Typography
              className={classes.correctAnswer}
              variant="h6"
              color="textSecondary"
            >
              Correct answer
            </Typography>
            <TextField value={item.solution} fullWidth multiline disabled />
          </>
        )}
      </>
    );

  return (
    <>
      <ItemHeader
        title={item.prompt}
        icon={<ItemIcon type={item.type} />}
        required={item.required}
      />
      {item.image && (
        <Box className={classes.imageContainer} margin="auto">
          <img src={item.image} alt={item.title} width="100%" />
        </Box>
      )}
      <TextField
        value={(userItem && userItem.answer) || ""}
        onChange={handleChange}
        placeholder="Type your answer here..."
        fullWidth
        multiline
      />
      <ItemFooter hint={item.hint} />
    </>
  );
}
