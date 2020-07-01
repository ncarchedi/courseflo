import React, { useState, useContext } from "react";
import { Redirect, useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import DashboardHeader from "./DashboardHeader";
import NotFound from "./NotFound";
import FeedbackModal from "./FeedbackModal";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const { userId } = useParams();
  const { user, userLoading } = useContext(UserContext);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // do nothing until user is done loading
  if (userLoading) return null;

  // if user is not logged in, redirect to landing page
  if (!user) return <Redirect to="/" />;

  // if the user is logged in, but not on their dashboard, show 404
  if (user && user.uid !== userId) return <NotFound type="page" />;

  return (
    <>
      <DashboardHeader setShowFeedbackModal={setShowFeedbackModal} />
      <Container>
        <Typography>Welcome, {user.email}!</Typography>
      </Container>
      <FeedbackModal
        open={showFeedbackModal}
        setOpen={setShowFeedbackModal}
        sentFrom="dashboard"
      />
    </>
  );
}
