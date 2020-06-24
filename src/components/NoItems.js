import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10%",
  },
}));

export default function NoItems() {
  const classes = useStyles();

  return (
    <Box className={classes.container} textAlign="center">
      <Typography variant="h2" gutterBottom>
        ¯\_(ツ)_/¯
      </Typography>
      <Typography variant="h4" gutterBottom>
        Sorry, this course is empty!
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Please reach out to the course author if you think something is wrong.
      </Typography>
    </Box>
  );
}
