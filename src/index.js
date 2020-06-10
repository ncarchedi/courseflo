import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./components/App";
import NotFound from "./components/NotFound";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Switch>
        <Route path="/course/:courseId" component={App} />
        <Route path="/404" children={<NotFound type="course" />} />
        <Route path="*" children={<NotFound type="course" />} />
      </Switch>
    </Router>
  </ThemeProvider>,
  document.querySelector("#root")
);
