import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./components/App";
import Create from "./components/Create";
import Uploader from "./components/Uploader";
import NotFound from "./components/NotFound";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Switch>
        <Route path="/course/:courseId" component={App} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/upload" component={Uploader} />
        <Route exact path="/404" children={<NotFound type="page" />} />
        <Route path="*" children={<NotFound type="page" />} />
      </Switch>
    </Router>
  </ThemeProvider>,
  document.querySelector("#root")
);
