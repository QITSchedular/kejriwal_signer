import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Signup.css";
import { pink } from "@mui/material/colors";
import { Alert, Snackbar } from "@mui/material";
import { validateForm } from "./registrationValidation";
import { registerUser } from "../../services/FetchData";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://qitsolution.co.in/">
        Quantum It Solution
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [snackShow, setSetSnackShow] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    color: "success",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const errors = await validateForm(data);
    setLoading(true);
    if (errors.isError === true) {
      // There are errors, update state
      setErrors(errors);
      setSnackbar({ open: true, color: "error", message: errors.error });
      return setLoading(false);
    } else {
      const response = await registerUser(data);
      if (response.success === true) {
        setSnackbar({
          open: true,
          color: "success",
          message: `Registration successful, proceed to login`,
        });
        setLoading(false);
        setSetSnackShow(true);
        setTimeout(() => {
          return navigate("/");
        }, 3000);
        // await setSnackbar({ open: true, color: 'success', message: response.error });
      } else {
        let errmsg = await response.error;
        setLoading(false);
        await setSnackbar({
          open: true,
          color: "error",
          message: errmsg,
        });
        return await setSetSnackShow(true);
      }
    }
    setLoading(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading && <Loader />}
      <Grid container="main" id="main-container">
        <Container
          component="main"
          maxWidth="xs"
          id="components-wrapper"
          sx={{ marginTop: 5, marginBottom: 5 }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#f48fb1" }}>
              <PendingActionsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="Set Username"
                    name="userName"
                    autoComplete="user-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>

              {/* Display errors */}
              {Object.keys(errors).length > 0 && (
                <Snackbar
                  open={snackbar.open}
                  autoHideDuration={4000}
                  onClose={() => setSnackbar({ ...snackbar, open: false })}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Alert severity={snackbar.color}>{snackbar.message}</Alert>
                </Snackbar>
              )}
              {/* Display errors */}
              {snackShow && (
                <Snackbar
                  open={snackbar.open}
                  autoHideDuration={6000}
                  onClose={() => setSnackbar({ ...snackbar, open: false })}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <Alert severity={snackbar.color}>{snackbar.message}</Alert>
                </Snackbar>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Sign Up
              </Button>
              <Grid
                container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Grid item>
                  <Link href="/digisigner" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 2, mb: 3 }} />
        </Container>
      </Grid>
    </ThemeProvider>
  );
}
