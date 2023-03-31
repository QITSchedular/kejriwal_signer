import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';

const BannerContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

const BannerPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundImage: 'url(https://source.unsplash.com/random)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '200px',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
}));

export default function Banner() {
  return (
    <BannerContainer>
      <BannerPaper>
        {/* add any text or other components here */}
        Hello there
      </BannerPaper>
    </BannerContainer>
  );
}
