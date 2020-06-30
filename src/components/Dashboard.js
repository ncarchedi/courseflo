import React from "react";
import { useParams } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { saveCourseToFirestore } from "../services/firebase";
import DashboardHeader from "./DashboardHeader";
import NotFound from "./NotFound";

export default function Dashboard() {
  const { userId } = useParams();
  const [user, loading, error] = useAuthState(firebase.auth());

  // load nothing until auth is read
  if (loading) return null;

  // if the user is not on their own dashboard
  if (user && user.uid !== userId) return <NotFound type="page" />;

  return (
    <>
      <DashboardHeader />
      <Container>
        <Typography>Welcome, {user.email}!</Typography>
      </Container>
    </>
  );
}
