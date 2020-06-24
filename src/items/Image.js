import React from "react";
import { useTheme } from "@material-ui/styles";
import Box from "@material-ui/core/Box";

export default function Video({ item }) {
  const theme = useTheme();

  return (
    <Box display="flex" maxWidth={theme.breakpoints.values.sm} margin="auto">
      <img src={item.source} alt={item.title} width="100%" />
    </Box>
  );
}
