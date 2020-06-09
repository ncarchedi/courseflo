import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: "1.15rem",
    flexGrow: 1,
  },
  iconContainer: {
    textAlign: "right",
    paddingTop: theme.spacing(0.5),
  },
  helperText: {
    fontSize: "0.9rem",
  },
}));

export default function ItemHeader({
  item,
  titleColor,
  pointsText,
  helperText,
  icon,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={11}>
          <Typography
            className={classes.title}
            style={{ color: titleColor }}
            variant="h6"
          >
            {item.number}. {item.title || item.prompt}
          </Typography>
        </Grid>
        <Grid className={classes.iconContainer} item xs={1}>
          {icon}
        </Grid>
      </Grid>
      <FormHelperText className={classes.helperText}>
        {helperText ? pointsText + " — " + helperText : pointsText}
      </FormHelperText>
    </Box>
  );
}
