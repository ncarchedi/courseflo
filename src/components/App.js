import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "./LoadingScreen";
import { UserProvider } from "../context/UserContext";

// lazy load components
const LandingPage = lazy(() => import("./LandingPage"));
const Pricing = lazy(() => import("./Pricing"));
const SignIn = lazy(() => import("./SignIn"));
const Dashboard = lazy(() => import("./Dashboard"));
const Course = lazy(() => import("./Course"));
const Editor = lazy(() => import("./Editor"));
const Upload = lazy(() => import("./Upload"));
const NotFound = lazy(() => import("./NotFound"));

// initialize firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(firebaseConfig);

export default function App() {
  const [user, userLoading, userError] = useAuthState(firebase.auth());

  return (
    <UserProvider value={[user, userLoading, userError]}>
      <Router>
        <Suspense fallback={<LoadingScreen />}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/pricing" component={Pricing} />
            <Route exact path="/login" component={SignIn} />
            <Route path="/dashboard/:userId" component={Dashboard} />
            <Route exact path="/course/:courseId/edit" component={Editor} />
            <Route path="/course/:courseId" component={Course} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/404" children={<NotFound type="page" />} />
            <Route path="*" children={<NotFound type="page" />} />
          </Switch>
        </Suspense>
      </Router>
    </UserProvider>
  );
}
