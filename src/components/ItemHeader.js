import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import renderHtmlFromString from "../utils/renderHtmlFromString";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  titleText: {
    fontSize: "1.15rem",
    flexGrow: 1,
  },
  requiredText: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightRegular,
  },
  iconContainer: {
    textAlign: "right",
    marginTop: theme.spacing(0.5),
  },
  helperText: {
    fontSize: "0.9rem",
  },
}));

export default function ItemHeader({ item, titleColor, helperText, icon }) {
  const classes = useStyles();

  // render the title or prompt, depending on item type
  const titleText = renderHtmlFromString(item.title ? item.title : item.prompt);

  // is the item graded?
  const isGraded = item.solution && item.solution !== null;
  console.log(isGraded);

  return (
    <Box className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <Typography
            className={classes.titleText}
            style={{ color: titleColor }}
            variant="h6"
          >
            {titleText}{" "}
            {item.required && (
              <span className={classes.requiredText}>(Required)</span>
            )}
          </Typography>
        </Grid>
        <Grid className={classes.iconContainer} item xs={1}>
          {icon}
        </Grid>
      </Grid>
      <FormHelperText className={classes.helperText}>
        {isGraded ? "1 Point" : ""}
        {isGraded && helperText ? " — " : ""}
        {helperText ? helperText : ""}
      </FormHelperText>
    </Box>
  );
}
