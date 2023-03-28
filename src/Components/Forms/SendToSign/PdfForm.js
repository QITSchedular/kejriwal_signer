import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import PageContext from "../../../Context/PageContext";
import { getPdfSignToken, getSignedPdf } from "../../../services/FetchData";
import Loader from "../../Loader/Loader";


function PdfForm() {
    const {token} = useContext(PageContext);
    const [loader, setLoader] = useState(false);
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
    
    const response = await getPdfSignToken(form_data, token);
    const dSignFileId = await response;
    console.log(dSignFileId);
    const url = await getSignedPdf(dSignFileId, token);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
//     const signedPdf = async (dSignFileId, token)=>{
//         const apiUrl = `/api/DSign/GetByFileId?dSignFileId=${dSignFileId}`;
//   try {
//     const response = await fetch(apiUrl, {
//       method: "GET",
//       headers: {
//         Authorization:
//           `Bearer ${token}`
//       },
      
//     });
//     console.log(response);

//   } catch (error) {
//     console.error(`Error fetching data: ${error}`);
//   }
//     }
//     await signedPdf();
//     const getBlob = await getSignedPdf(dSignFileId, token);
//     const url = URL.createObjectURL(getBlob);
//     console.log("URL IS " + url);
    
//     // const iframe = document.createElement('iframe');
//     // iframe.src = url;
//     // document.body.appendChild(iframe);
//     setLoader(false);
//     // Create a modal container
//   const modalContainer = document.createElement('div');
//   modalContainer.style.width = '350px';
//   modalContainer.style.height = '720px';
//   modalContainer.style.position = 'fixed';
//   modalContainer.style.top = '50%';
//   modalContainer.style.left = '50%';
//   modalContainer.style.transform = 'translate(-50%, -50%)';
//   modalContainer.style.background = 'rgba(0,0,0,0.8)';
//   modalContainer.style.borderRadius = '5px';
//   modalContainer.style.display = 'flex';
//   modalContainer.style.flexDirection = 'column';
//   modalContainer.style.justifyContent = 'center';
//   modalContainer.style.alignItems = 'center';
//   modalContainer.style.zIndex = '9999';

//   // Create a download button inside the modal container
//   const downloadButton = document.createElement('a');
//   downloadButton.href = url;
//   downloadButton.download = 'pdf_document.pdf';
//   downloadButton.style.display = 'flex';
//   downloadButton.style.justifyContent = 'center';
//   downloadButton.style.alignItems = 'center';
//   downloadButton.style.width = '200px';
//   downloadButton.style.height = '50px';
//   downloadButton.style.background = 'blue';
//   downloadButton.style.borderRadius = '5px';
//   downloadButton.style.color = 'white';
//   downloadButton.style.fontSize = '20px';
//   downloadButton.style.textDecoration = 'none';

//   // Add a download icon to the button
//   const downloadIcon = document.createElement('i');
//   downloadIcon.className = 'material-icons';
//   downloadIcon.style.fontSize = '25px';
//   downloadIcon.style.marginRight = '10px';
//   downloadIcon.innerText = 'get_app';
//   downloadButton.appendChild(downloadIcon);

//   // Add the button to the modal container
//   modalContainer.appendChild(downloadButton);

//   // Add the modal container to the document body
//   document.body.appendChild(modalContainer);
    setLoader(false);
  };

  return (
    <Container maxWidth="sm">
        {loader && <Loader />}
        <Paper elevation={8} style={{ padding: '20px', boxShadow: '10px 10px 16px 0px rgba(0,0,0,0.75)' }}>
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
  );
}
export default PdfForm;
