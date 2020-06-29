import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import useDebounce from "../hooks/useDebounce";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.15rem",
    flexGrow: 1,
  },
  iconContainer: {
    textAlign: "right",
    paddingTop: theme.spacing(0.5),
  },
}));

export default function EditableItemHeader({
  item,
  icon,
  onFocus,
  onChangeItem,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = useState(item);
  const debouncedValues = useDebounce(values, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChangeItem(debouncedValues), [debouncedValues]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={11}>
        <TextField
          variant="filled"
          name={values.title ? "title" : "prompt"}
          placeholder={values.title ? "Title" : "Prompt"}
          value={values.title ? values.title : values.prompt}
          onChange={handleChange}
          // match style of item header
          InputProps={{
            style: {
              padding: theme.spacing(2),
              fontSize: "1.15rem",
              fontWeight: 500,
            },
          }}
          multiline
          fullWidth
          onFocus={() => onFocus(values.id)}
        />
      </Grid>
      <Grid className={classes.iconContainer} item xs={1}>
        {icon}
      </Grid>
    </Grid>
  );
}
