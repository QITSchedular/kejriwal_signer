import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useState } from "react";
import { tokenFetch } from "../../services/FetchData";
import PageContext from "../../Context/PageContext";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./signin.css";
import backImg from "./digital-signatures.jpeg";
import { validateSignInData } from "./signinValidation";
import CustomSnackbar from "./CustomSnackbar";
import { handleTokenResponse } from "../../services/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link className="routing-links" to="https://www.qitsolution.co.in">
        Quantum It Solution
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [accessToken, setAccessToken] = useState("");
  // const { setToken } = useContext(PageContext);
  const naviagte = useNavigate();
  const [loader, setLoader] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const errors = validateSignInData(email, password);

    if (Object.keys(errors).length > 0) {
      setSnackbarMessage(Object.values(errors)[0]);
      setSnackbarOpen(true);
      return;
    }

    // Proceed with the API call and other logic if the data is valid

    try {
      setLoader(true);
      const response = await tokenFetch(email, password);
      if (response.token) {
        // setAccessToken(response.token);
        // setToken(response.token);
        setLoader(false);
        //set the token
        handleTokenResponse(response);

        naviagte("/sendpdf");
      } else {
        setLoader(false);
        setSnackbarMessage("Invalid email or password");
        setSnackbarOpen(true);
        return;
      }
    } catch (error) {
      setLoader(false);
      setSnackbarMessage("Something went wrong, please try again later");
      setSnackbarOpen(true);
      console.log(error);
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {loader && <Loader />}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        handleClose={handleSnackbarClose}
        severity={"error"}
      />

      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={6}
          md={7}
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
          }}
          id="image-grid"
        >
          {/* <img src={backImg} id="back-img" alt="bac-img" /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                required
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                required
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="#" className="routing-links">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" className="routing-links">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
