import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

export default function FeedbackModal({
  open,
  setOpen,
  currentSettings,
  onSaveSettings,
}) {
  // if there are no settings yet, then start fresh
  const [settings, setSettings] = useState(currentSettings);

  const handleSubmit = (e) => {
    setOpen(false);
    onSaveSettings(settings);
  };

  const handleCancel = () => {
    setOpen(false);
    // restore previous settings
    setSettings(currentSettings);
  };

  const handleToggleCollectEmails = () => {
    setSettings({
      ...settings,
      collectEmails: !settings.collectEmails,
    });
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Any changes will take effect immediately.
        </DialogContentText>
        <FormControlLabel
          control={
            <Checkbox
              checked={settings.collectEmails}
              onChange={handleToggleCollectEmails}
              color="primary"
            />
          }
          label="Collect email addresses"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
