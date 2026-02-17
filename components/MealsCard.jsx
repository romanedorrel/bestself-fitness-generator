import React from 'react'
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//function for handling styling and animation of expand button
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})
(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

//accepts props to create cards with
export default function MealCard({name, id, image}) {
  const [expanded, setExpanded] = useState(false);

  //handle expand card
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //returns card with passed in information
  return (
    <Card className="card" sx={{ maxWidth: 345 }}>
      <CardHeader
        
        title={name}
        
      />
      <CardContent>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={name}
      />
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Instructions:
            {id}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
