import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { EmojiCorrect, EmojiIncorrect } from "../components/Emoji";

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginBottom: theme.spacing(2),
  },
}));

export default function SingleSelect({
  item,
  value,
  onChangeInput,
  showSolution,
}) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">{item.prompt}</Typography>
      <FormHelperText className={classes.helperText}>
        (Select only one)
      </FormHelperText>
      <RadioGroup
        value={value}
        onChange={(e) => onChangeInput(item.id, e.target.value)}
      >
        {item.options.map((option) => (
          <Box key={option} component="span" display="flex" alignItems="center">
            {showSolution &&
              (item.solution === option ? (
                <EmojiCorrect />
              ) : (
                <EmojiIncorrect />
              ))}
            <FormControlLabel
              value={String(option)}
              control={<Radio disabled={showSolution} />}
              label={option}
            />
          </Box>
        ))}
      </RadioGroup>
    </>
  );
}
