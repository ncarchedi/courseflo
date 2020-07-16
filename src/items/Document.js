import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { ItemIcon } from "../components/Icons";
import ItemHeader from "../components/ItemHeader";

const useStyles = makeStyles((theme) => ({
  box: {
    overflow: "hidden",
    paddingTop: "56.25%",
    marginBottom: theme.spacing(3),
    position: "relative",
    "& iframe": {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      border: 0,
    },
  },
}));

export default function Document({ item }) {
  const classes = useStyles();
  const theme = useTheme();
  const onLargerScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <ItemHeader title={item.title} icon={<ItemIcon type={item.type} />} />
      {onLargerScreen && (
        <Box className={classes.box}>
          <iframe
            title={item.title}
            src={item.source}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>
      )}
      <Typography>
        <Link href={item.source} target="_blank" rel="noopener">
          Click here
        </Link>{" "}
        to open the document in a new tab, then come back when you're done.
      </Typography>
    </>
  );
}
