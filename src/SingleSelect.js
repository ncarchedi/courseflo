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

export default function SingleSelect({ item, value, onChange }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">{item.prompt}</Typography>
      <FormHelperText className={classes.helperText}>
        (Select only one)
      </FormHelperText>
      <RadioGroup
        value={value}
        onChange={(e) => onChange(item.id, e.target.value)}
      >
        {item.options.map((option) => (
          <FormControlLabel
            key={option}
            value={String(option)}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </>
  );
}
