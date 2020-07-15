import React from "react";
import { useParams, Redirect, Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(3),
  },
  fabContainer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    padding: theme.spacing(0, 3, 3),
    display: "flex",
    justifyContent: "flex-end",
  },
  fabRightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Review({ items, userItems, hideFab }) {
  const classes = useStyles();
  const { courseId } = useParams();

  // define path back to course
  const coursePath = `/course/${courseId}`;

  // if there are no recorded userItems, redirect to course
  if (!userItems.length) return <Redirect to={coursePath} />;

  return (
    <>
      {items.map((item) => (
        <Box key={item.id} className={classes.item}>
          <Item
            item={item}
            userItem={userItems.filter((a) => a.itemId === item.id)[0]}
            showSolution
          />
        </Box>
      ))}
      {!hideFab && (
        <Box className={classes.fabContainer}>
          <Zoom in>
            <Fab
              component={RouterLink}
              to={`${coursePath}/score`}
              variant="extended"
              color="primary"
              aria-label="submit"
            >
              Back to my score
              <ArrowForwardIcon className={classes.fabRightIcon} />
            </Fab>
          </Zoom>
        </Box>
      )}
    </>
  );
}
