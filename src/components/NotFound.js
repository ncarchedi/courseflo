import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "10%",
  },
}));

export default function NotFound({ type }) {
  const classes = useStyles();

  return (
    <Box className={classes.container} textAlign="center">
      <Typography variant="h2" gutterBottom>
        ¯\_(ツ)_/¯
      </Typography>
      <Typography variant="h4" gutterBottom>
        Sorry, that {type} doesn't exist!
      </Typography>
      {type === "page" && (
        <Typography variant="body2" color="textSecondary">
          Please{" "}
          <Link href="mailto:hello@dayonelabs.io" underline="always">
            let us know
          </Link>{" "}
          if you think something is wrong.
        </Typography>
      )}
      {type === "course" && (
        <Typography variant="body2" color="textSecondary">
          Please reach out to the course author if you think something is wrong.
        </Typography>
      )}
    </Box>
  );
}
