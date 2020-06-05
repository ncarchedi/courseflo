import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  helperText: {
    marginBottom: theme.spacing(2),
  },
}));

export default function MultiSelect({ item, value, onChange }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">{item.prompt}</Typography>
      <FormHelperText className={classes.helperText}>
        (Check all that apply)
      </FormHelperText>
      <FormGroup>
        {item.options.map((option) => (
          <FormControlLabel
            key={option}
            control={<Checkbox name={option} />}
            label={option}
          />
        ))}
      </FormGroup>
    </>
  );
}
