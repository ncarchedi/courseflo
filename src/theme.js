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
      fontFamily: ["Permanent Marker", "cursive"],
    },
  },
});

export default theme;
