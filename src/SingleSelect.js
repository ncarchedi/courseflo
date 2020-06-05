import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginBottom: theme.spacing(2),
  },
}));

export default function SingleSelect({ content }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">{content.prompt}</Typography>
      <FormHelperText className={classes.helperText}>
        (Select only one)
      </FormHelperText>
      <RadioGroup>
        {content.options.map((option) => (
          <FormControlLabel value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </>
  );
}
