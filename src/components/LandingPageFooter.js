import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: theme.spacing(10, 0, 5, 0),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Typography variant="body2" className={classes.footer}>
      <Link color="inherit" href="https://dayonelabs.io/" target="_blank">
        Day One Labs LLC
      </Link>
      {" © "}
      {new Date().getFullYear()}
    </Typography>
  );
}
