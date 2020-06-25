import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default function LandingPageHeader() {
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" component="h1" noWrap>
            Courseflo
          </Typography>
        </Toolbar>
      </AppBar>
      {/* second toolbar due to: https://material-ui.com/components/app-bar/#fixed-placement */}
      <Toolbar />
    </>
  );
}
