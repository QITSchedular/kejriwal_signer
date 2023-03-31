import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ComponentCard from '../Components/Card/ComponentCard';
import Banner from './BannerPaper';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
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
        <Box style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop:"20px"
        }}>
        <ComponentCard 
            image="https://source.unsplash.com/random/345x140"
            title="Card 1"
            route="/sendpdf"
            onClick={() => console.log("Card 1 clicked")}
          />
          <ComponentCard 
            image="https://source.unsplash.com/random/346x140"
            title="Card 2"
            route="/helloreact"
            onClick={() => console.log("Card 2 clicked")}
          />
          <ComponentCard 
            image="https://source.unsplash.com/random/347x140"
            title="Card 3"
            route="/hellomui"
            onClick={() => console.log("Card 3 clicked")}
          />          
        </Box>
      </Container>
    </React.Fragment>
     )      
}

export default Homepage;