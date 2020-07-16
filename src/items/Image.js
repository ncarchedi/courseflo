import React from "react";
import { useTheme } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import { ItemIcon } from "../components/Icons";
import ItemHeader from "../components/ItemHeader";

export default function Video({ item, showSolution }) {
  const theme = useTheme();

  return (
    <>
      <ItemHeader
        title={item.title}
        icon={<ItemIcon type={item.type} />}
        titleColor={showSolution ? theme.palette.text.secondary : null}
      />
      <Box display="flex" maxWidth={theme.breakpoints.values.sm} margin="auto">
        <img src={item.source} alt={item.title} width="100%" />
      </Box>
    </>
  );
}
