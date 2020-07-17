import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  poweredByBox: {
    marginTop: theme.spacing(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
  },
  logo: {
    maxHeight: theme.spacing(2),
  },
}));

export default function PoweredBy() {
  const classes = useStyles();

  return (
    <Box
      className={classes.poweredByBox}
      component={RouterLink}
      to="/"
      target="_blank"
    >
      <Box mr={0.5}>
        <Typography variant="body2">Powered by</Typography>
      </Box>
      <img className={classes.logo} src="../logo-bw.png" alt="Courseflo logo" />
    </Box>
  );
}
