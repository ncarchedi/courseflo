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
  title: {
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

export default function ItemHeader({
  title,
  icon,
  helperText,
  required,
  titleColor,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid container spacing={1}>
        <Grid item xs={11}>
          <Typography
            className={classes.title}
            style={{ color: titleColor }}
            variant="h6"
          >
            {renderHtmlFromString(title)}{" "}
            {required && (
              <span className={classes.requiredText}>(Required)</span>
            )}
          </Typography>
        </Grid>
        <Grid className={classes.iconContainer} item xs={1}>
          {icon}
        </Grid>
      </Grid>
      {helperText && (
        <FormHelperText className={classes.helperText}>
          ({helperText})
        </FormHelperText>
      )}
    </Box>
  );
}
