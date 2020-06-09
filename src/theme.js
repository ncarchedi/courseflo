import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import deepOrange from "@material-ui/core/colors/deepOrange";

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: deepOrange,
  },
  typography: {
    button: {
      fontFamily: ["Patrick Hand SC", "cursive"],
      fontSize: "1.4rem",
    },
  },
});

export default theme;
