import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

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
  onChangeItemValue,
}) {
  const classes = useStyles();

  const handleChange = (e) => {
    onChangeItemValue(item.id, e.target.name, e.target.value);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={11}>
        <TextField
          variant="filled"
          name={item.title ? "title" : "prompt"}
          label={item.title ? "Title" : "Prompt"}
          value={item.title ? item.title : item.prompt}
          onChange={handleChange}
          multiline
          fullWidth
          onFocus={() => onFocus(item.id)}
        />
      </Grid>
      <Grid className={classes.iconContainer} item xs={1}>
        {icon}
      </Grid>
    </Grid>
  );
}
