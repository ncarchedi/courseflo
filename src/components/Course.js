import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Item from "./Item";

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
  editable,
  onChangeItem,
}) {
  const classes = useStyles();
  const history = useHistory();
  let { url } = useRouteMatch();

  const handleSubmit = () => {
    history.push(`${url}/score`);
    setShowSolutions(true);
  };

  // if answers hasn't initialized yet, then return
  if (!answers) return null;

  return (
    <>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          answer={answers.filter((a) => a.itemId === item.id)[0]}
          onChangeAnswer={onChangeAnswer}
          showSolution={showSolutions}
          editable={editable}
          onChangeItem={onChangeItem}
        ></Item>
      ))}
      {!editable && (
        <Zoom in>
          <Fab
            className={classes.fab}
            onClick={handleSubmit}
            variant="extended"
            color="primary"
            aria-label="submit"
          >
            {showSolutions ? "Back to my score" : "I'm all done!"}
            <ArrowForwardIcon className={classes.fabIcon} />
          </Fab>
        </Zoom>
      )}
    </>
  );
}
