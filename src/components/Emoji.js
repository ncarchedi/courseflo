import React from "react";

export default function Emoji({ symbol, label, ...props }) {
  return (
    <span {...props} aria-label={label} role="img">
      {symbol}
    </span>
  );
}
