import React from "react";
import { useHistory } from "react-router-dom";
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
  content,
  answers,
  onChangeAnswer,
  showSolutions,
  setShowSolutions,
}) {
  const classes = useStyles();
  const history = useHistory();

  const handleSubmit = () => {
    history.push("/score");
    setShowSolutions(true);
  };

  return (
    <>
      {content.map((item) => (
        <Item
          key={item.id}
          item={item}
          answer={answers[item.id] || []}
          onChangeAnswer={onChangeAnswer}
          showSolution={showSolutions}
        ></Item>
      ))}
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
    </>
  );
}
