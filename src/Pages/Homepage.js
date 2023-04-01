import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ComponentCard from '../Components/Card/ComponentCard';
import Banner from './BannerPaper';
import { useNavigate } from 'react-router-dom';
import sign_form from "../assets/sign-form.png";
import table from "../assets/table.png";
import search from "../assets/search.png";
import { Typography } from '@mui/material';
import Link from '@mui/material/Link';
const Homepage = () => {
    const navigate = useNavigate();
    function Copyright(props) {
      return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      );
    }
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        container
        direction="column"
        justifyContent="space-around"
        alignItems="flex-start"
        style={{
            marginTop:"20px"
        }}
>
        <Box>
            <Banner></Banner>
        </Box>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop:"20px"
        }}>
        <ComponentCard 
            image={sign_form}
            title="Sign a Pdf"
            route="/sendpdf"
            onClick={() => console.log("Card 1 clicked")}
            body="Click here to sign the pdf, you can either view or download the pdf, make sure all the fieldsare filled."
          />
          <ComponentCard 
            image={search}
            title="Looking for a particlular document ?"
            route="/helloreact"
            onClick={() => console.log("Card 2 clicked")}
            body="Looking for a particular pdf...? Get the document id and click here, make sure is the correct one..."
          />
          <ComponentCard 
            image={table}
            title="List of all Pdfs"
            route="/pdflists"
            onClick={() => console.log("Card 3 clicked")}
            body="All you signed pdfs in one place, go check them out..."
          />          
        </Box>
      </Container>
      <Copyright sx={{ mt: 5 }} />
    </React.Fragment>
     )      
}

export default Homepage;