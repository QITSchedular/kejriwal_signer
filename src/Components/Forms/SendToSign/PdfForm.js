import { AppBar, Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContext from "../../../Context/PageContext";
import { getPdfSignToken, getSignedPdf } from "../../../services/FetchData";
import ModalBox from "../../Dialogs/ModalBox";
import Loader from "../../Loader/Loader";


function PdfForm() {
  const naviagte = useNavigate();
    const {token} = useContext(PageContext);
    const [loader, setLoader] = useState(false);
    const [modal, setModal] = useState(false);
    const [pdfURL, setPdfURL] = useState("");


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
    signPrintonPage: "L",
    Ts: new Date().toISOString(),
  });

  const handleFileChange = (event) => {
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
      form_data.append(key, value);
    }
    // console.log(form_data);
    const response = await getPdfSignToken(form_data, token);
    const {fileId} = await response;
    
  const apiUrl = `http://192.168.0.14:5095/api/DSign/GetByFileId?dSignFileId=${fileId}`;
  try {
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const pdfBlob = await response.blob();
  const pdfUrl = URL.createObjectURL(pdfBlob);
  //window.open(pdfUrl, '_blank');
  console.log(pdfUrl);
  setPdfURL(pdfUrl)
  setModal(true);
  // window.open(pdfUrl, '_blank');
} catch (error) {
  console.error(error);
}
   
setLoader(false);
// naviagte('/');
};
useEffect(()=>{
  setModal(false);
},[])    

  return (
    <Container maxWidth="sm" style={{backgroundColor:"#DDDDDD", marginTop:"20px"}}>
        {loader && <Loader />}
        {modal && <ModalBox urlBlob={pdfURL}/>}
        <Paper elevation={24} style={{ padding: '20px'}}>
      <Box mt={4} mb={4}>
        <AppBar position="relative">
        <Typography variant="h4" component="h1" align="center" py={2}>
          Fill all the details
        </Typography>
        </AppBar>
        
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
                disabled={true}
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
  );
}
export default PdfForm;
