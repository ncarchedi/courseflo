import React from "react";
import Button from "@material-ui/core/Button";

export default function BigButton(props) {
  console.log(props.className);

  return (
    <Button {...props} style={{ fontSize: "1.3rem" }}>
      {props.children}
    </Button>
  );
}
