import React from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Item from "./Item";
import NoItems from "./NoItems";

const useStyles = makeStyles((theme) => ({
  item: {
    marginTop: theme.spacing(3),
  },
  fabLeft: {
    margin: 0,
    position: "fixed",
    top: "auto",
    left: theme.spacing(3),
    bottom: theme.spacing(3),
    right: "auto",
  },
  fabRight: {
    margin: 0,
    position: "fixed",
    top: "auto",
    right: theme.spacing(3),
    bottom: theme.spacing(3),
    left: "auto",
  },
  fabLeftIcon: {
    marginRight: theme.spacing(1),
  },
  fabRightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

export default function ItemList({
  items,
  answers,
  onChangeAnswer,
  showSolutions,
  setShowSolutions,
  orientation,
  itemNumber,
  setItemNumber,
}) {
  const classes = useStyles();
  let { url } = useRouteMatch();
  const theme = useTheme();
  const notOnMobile = useMediaQuery(theme.breakpoints.up("sm"));

  // if there are no items to show, show empty screen
  if (!items.length) return <NoItems />;

  const handleFinishCourse = () => {
    setItemNumber(items.length);
    // use timeout so progress bar has time to advance to 100%
    setTimeout(() => {
      setShowSolutions(true);
    }, 500);
  };

  if (orientation === "horizontal") {
    const item = items[itemNumber];
    if (!item) return null;
    return (
      <>
        <Box className={classes.item}>
          <Item
            key={item.id}
            item={item}
            answer={answers && answers.filter((a) => a.itemId === item.id)[0]}
            onChangeAnswer={onChangeAnswer}
            showSolution={showSolutions}
          />
        </Box>
        {itemNumber > 0 && !showSolutions && (
          <Zoom in>
            <Fab
              className={classes.fabLeft}
              onClick={() => setItemNumber(itemNumber - 1)}
              variant={notOnMobile ? "extended" : "round"}
              color="primary"
              aria-label="go back"
            >
              {notOnMobile ? (
                <>
                  <ArrowBackIcon className={classes.fabLeftIcon} /> Go back
                </>
              ) : (
                <ArrowBackIcon />
              )}
            </Fab>
          </Zoom>
        )}
        <Zoom in>
          {itemNumber < items.length - 1 ? (
            <Fab
              className={classes.fabRight}
              onClick={() => setItemNumber(itemNumber + 1)}
              variant={notOnMobile ? "extended" : "round"}
              color="primary"
              aria-label="continue"
            >
              {notOnMobile ? (
                <>
                  Continue <ArrowForwardIcon className={classes.fabRightIcon} />
                </>
              ) : (
                <ArrowForwardIcon />
              )}
            </Fab>
          ) : (
            <Fab
              className={classes.fabRight}
              component={RouterLink}
              to={`${url}/score`}
              onClick={handleFinishCourse}
              variant="extended"
              color="primary"
              aria-label="submit"
            >
              {showSolutions ? "Back to my score" : "I'm all done!"}
              <ArrowForwardIcon className={classes.fabRightIcon} />
            </Fab>
          )}
        </Zoom>
      </>
    );
  }

  return (
    <>
      {items.map((item) => (
        <Box key={item.id} className={classes.item}>
          <Item
            item={item}
            answer={answers && answers.filter((a) => a.itemId === item.id)[0]}
            onChangeAnswer={onChangeAnswer}
            showSolution={showSolutions}
          />
        </Box>
      ))}
      <Zoom in>
        <Fab
          className={classes.fabRight}
          component={RouterLink}
          to={`${url}/score`}
          onClick={handleFinishCourse}
          variant="extended"
          color="primary"
          aria-label="submit"
        >
          {showSolutions ? "Back to my score" : "I'm all done!"}
          <ArrowForwardIcon className={classes.fabRightIcon} />
        </Fab>
      </Zoom>
    </>
  );
}
