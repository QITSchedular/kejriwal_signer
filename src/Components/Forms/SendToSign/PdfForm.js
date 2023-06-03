import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PageContext from "../../../Context/PageContext";
import { getPdfSignToken, getSignedPdf } from "../../../services/FetchData";
import Loader from "../../Loader/Loader";
import { extractToken, isTokenExpired } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../../Navbar/Navbar";

function PdfForm() {
  // const { token } = useContext(PageContext);
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sourceFile: null,
    FileType: "1",
    signLocation: "Pal",
    signReason: "Rajesh",
    LocPoint1: "220",
    LocPoint2: "100",
    LocPoint3: "0",
    LocPoint4: "50",
    PFXId: "1",
    signPrintonPage: "1",
    Ts: new Date().toISOString(),
    AutoFileId: "Y",
  });

  const handleFileChange = (event) => {
    // console.log(event.target.files[0]);
    setFormData({
      ...formData,
      sourceFile: event.target.files[0],
    });
  };
  const handleNumberChange = (event) => {
    const { name, value } = event.target;
    const parsedValue = parseInt(value);
    setFormData({
      ...formData,
      [name]: isNaN(parsedValue) ? "" : parsedValue,
    });
  };
  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    const form_data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      await form_data.append(key, value);
    }

    const response = await getPdfSignToken(form_data, token);
    const dSignFileId = await response;
    // console.log("Got the file id", dSignFileId);
    const url = await getSignedPdf(dSignFileId, token);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoader(false);
  };
  useEffect(() => {
    // check exp
    const validate = isTokenExpired();
    if (validate === true) {
      localStorage.removeItem("accessToken");
      return navigate("/");
    }
    setToken(extractToken());
    const timeout = setTimeout(() => {
      localStorage.removeItem("accessToken");
      return navigate("/");
    }, 900000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <NavBar></NavBar>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: "2rem",
        }}
      >
        {loader && <Loader />}
        <Paper
          elevation={8}
          style={{
            padding: "20px",
            boxShadow: "10px 10px 16px 0px rgba(0,0,0,0.75)",
          }}
        >
          <Box mt={4} mb={4}>
            <Typography variant="h4" component="h1" align="center">
              Form
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="file"
                    accept="application/pdf"
                    name="sourceFile"
                    variant="outlined"
                    onChange={handleFileChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="text"
                    name="FileType"
                    label="File Type"
                    variant="outlined"
                    value={formData.FileType}
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="text"
                    name="signLocation"
                    label="Sign Location"
                    variant="outlined"
                    value={formData.signLocation}
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="text"
                    name="signReason"
                    label="Sign Reason"
                    variant="outlined"
                    value={formData.signReason}
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="number"
                    name="LocPoint1"
                    label="LocPoint1"
                    variant="outlined"
                    value={formData.LocPoint1}
                    onChange={handleNumberChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="number"
                    name="LocPoint2"
                    label="LocPoint2"
                    variant="outlined"
                    value={formData.LocPoint2}
                    onChange={handleNumberChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="number"
                    name="LocPoint3"
                    label="LocPoint3"
                    variant="outlined"
                    value={formData.LocPoint3}
                    onChange={handleNumberChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="number"
                    name="LocPoint4"
                    label="LocPoint4"
                    variant="outlined"
                    value={formData.LocPoint4}
                    onChange={handleNumberChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="text"
                    name="PFXId"
                    label="PFX Id"
                    variant="outlined"
                    value={formData.PFXId}
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="text"
                    name="signPrintonPage"
                    label="Sign Print on Page"
                    variant="outlined"
                    value={formData.signPrintonPage}
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    fullWidth
                    type="text"
                    name="Ts"
                    label="TS"
                    variant="outlined"
                    value={formData.Ts}
                    onChange={handleTextChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
}
export default PdfForm;
