import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import renderHtmlFromString from "../utils/renderHtmlFromString";
import { ItemIcon } from "../components/Icons";
import ItemHeader from "../components/ItemHeader";

export default function Text({ item, showSolution }) {
  const theme = useTheme();

  return (
    <>
      <ItemHeader
        title={item.title}
        icon={<ItemIcon type={item.type} />}
        titleColor={showSolution ? theme.palette.text.secondary : null}
      />
      <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
        {renderHtmlFromString(item.body)}
      </Typography>
    </>
  );
}
