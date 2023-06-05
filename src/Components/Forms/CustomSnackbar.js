// Snackbar.js
// For login page
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({
  open,
  message,
  handleClose,
  severity,
  verticalPosition,
  horizontalPosition,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: verticalPosition ? verticalPosition : "bottom",
        horizontal: horizontalPosition ? horizontalPosition : "right",
      }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={severity}
        onClose={handleClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
