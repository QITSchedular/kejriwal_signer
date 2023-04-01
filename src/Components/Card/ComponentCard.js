import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ComponentCard({image, title, route, onClick, body}) {
  // console.log(image);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(route);
    onClick();
  };
  return (
    <Card sx={{ maxWidth: 345, minWidth:345 }} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="240"
          sx={{
            backgroundImage: `url(${image})`,
            objectFit:"cover"
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}