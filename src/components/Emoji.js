import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  emoji: {
    margin: theme.spacing("auto", 1, "auto", 0),
  },
}));

export default function Emoji({ symbol, label, ...props }) {
  return (
    <span {...props} aria-label={label} role="img">
      {symbol}
    </span>
  );
}

export function EmojiCorrect() {
  const classes = useStyles();

  return <Emoji className={classes.emoji} symbol="✅" label="check mark" />;
}

export function EmojiIncorrect() {
  const classes = useStyles();

  return <Emoji className={classes.emoji} symbol="❌" label="cross mark" />;
}
