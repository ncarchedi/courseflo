import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Course from "./Course";
import Editor from "./Editor";
import Upload from "./Upload";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/course/:courseId" component={Course} />
        <Route exact path="/course/:courseId/edit" component={Editor} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/404" children={<NotFound type="page" />} />
        <Route path="*" children={<NotFound type="page" />} />
      </Switch>
    </Router>
  );
}
