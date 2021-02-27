import React, { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "./LoadingScreen";
import { UserProvider } from "../context/UserContext";
import { SubscriberProvider } from "../context/SubscriberContext";
import { getUserSubscription } from "../services/firebase";

// lazy load components
const LandingPage = lazy(() => import("./LandingPage"));
// const Pricing = lazy(() => import("./Pricing"));
// const SignIn = lazy(() => import("./SignIn"));
// const Dashboard = lazy(() => import("./Dashboard"));
// const Course = lazy(() => import("./Course"));
// const Editor = lazy(() => import("./Editor"));
// const NotFound = lazy(() => import("./NotFound"));

export default function App() {
  const [user, userLoading, userError] = useAuthState(firebase.auth());
  const [subscriber, setSubscriber] = useState(null);

  useEffect(() => {
    const setSubscriberState = async () => {
      setSubscriber(await getUserSubscription(user.uid));
    };

    user && setSubscriberState();
  }, [user]);

  return (
    <UserProvider value={[user, userLoading, userError]}>
      <SubscriberProvider value={subscriber}>
        <Router>
          <Suspense fallback={<LoadingScreen />}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              {/* <Route exact path="/pricing" component={Pricing} />
              <Route exact path="/login" component={SignIn} />
              <Route path="/dashboard/:userId" component={Dashboard} />
              <Route exact path="/course/:courseId/edit" component={Editor} />
              <Route path="/course/:courseId" component={Course} />
              <Route exact path="/404" children={<NotFound type="page" />} />
              <Route path="*" children={<NotFound type="page" />} /> */}
            </Switch>
          </Suspense>
        </Router>
      </SubscriberProvider>
    </UserProvider>
  );
}
