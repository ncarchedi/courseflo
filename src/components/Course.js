import React, { useState } from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Item from "./Item";
import NoItems from "./NoItems";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    position: "fixed",
    top: "auto",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    left: "auto",
  },
  fabIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function Course({
  items,
  answers,
  onChangeAnswer,
  showSolutions,
  setShowSolutions,
  orientation,
}) {
  const classes = useStyles();
  let { url } = useRouteMatch();
  const [itemNumber, setItemNumber] = useState(0);

  // if answers hasn't initialized yet, then return
  if (!answers) return null;

  // if there are no items to show, show empty screen
  if (!items.length) return <NoItems />;

  if (orientation === "horizontal") {
    const item = items[itemNumber];

    return (
      <>
        <Item
          key={item.id}
          item={item}
          answer={answers.filter((a) => a.itemId === item.id)[0]}
          onChangeAnswer={onChangeAnswer}
          showSolution={showSolutions}
        />
        <Zoom in>
          {itemNumber < items.length - 1 ? (
            <Fab
              className={classes.fab}
              onClick={() => setItemNumber(itemNumber + 1)}
              variant="extended"
              color="primary"
              aria-label="continue"
            >
              Continue <ArrowForwardIcon className={classes.fabIcon} />
            </Fab>
          ) : (
            <Fab
              className={classes.fab}
              component={RouterLink}
              to={`${url}/score`}
              onClick={() => setShowSolutions(true)}
              variant="extended"
              color="primary"
              aria-label="submit"
            >
              {showSolutions ? "Back to my score" : "I'm all done!"}
              <ArrowForwardIcon className={classes.fabIcon} />
            </Fab>
          )}
        </Zoom>
      </>
    );
  }

  return (
    <>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          answer={answers.filter((a) => a.itemId === item.id)[0]}
          onChangeAnswer={onChangeAnswer}
          showSolution={showSolutions}
        />
      ))}
      <Zoom in>
        <Fab
          className={classes.fab}
          component={RouterLink}
          to={`${url}/score`}
          onClick={() => setShowSolutions(true)}
          variant="extended"
          color="primary"
          aria-label="submit"
        >
          {showSolutions ? "Back to my score" : "I'm all done!"}
          <ArrowForwardIcon className={classes.fabIcon} />
        </Fab>
      </Zoom>
    </>
  );
}
