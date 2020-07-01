import React, { useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DashboardHeader from "./DashboardHeader";
import NotFound from "./NotFound";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const { userId } = useParams();
  const { user, userLoading } = useContext(UserContext);

  // do nothing until user is done loading
  if (userLoading) return null;

  // if user is not logged in, redirect to landing page
  if (!user) return <Redirect to="/" />;

  // if the user is logged in, but not on their dashboard, show 404
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
