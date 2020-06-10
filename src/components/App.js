import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Course from "./Course";

export default function App() {
  return (
    <Router>
      <Route path="/:courseId" component={Course} />
    </Router>
  );
}
