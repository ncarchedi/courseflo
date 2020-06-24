import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[800],
    },
  },
});

export default theme;
