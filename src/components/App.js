import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const LandingPage = lazy(() => import("./LandingPage"));
const Dashboard = lazy(() => import("./Dashboard"));
const Course = lazy(() => import("./Course"));
const Editor = lazy(() => import("./Editor"));
const Upload = lazy(() => import("./Upload"));
const NotFound = lazy(() => import("./NotFound"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/dashboard/:userId" component={Dashboard} />
          <Route exact path="/course/:courseId/edit" component={Editor} />
          <Route path="/course/:courseId" component={Course} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/404" children={<NotFound type="page" />} />
          <Route path="*" children={<NotFound type="page" />} />
        </Switch>
      </Suspense>
    </Router>
  );
}
