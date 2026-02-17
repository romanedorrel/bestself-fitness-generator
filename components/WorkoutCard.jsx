'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

//Mui function for handling the styling and animation of the expand aspect of the card.
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

 //accepts props for styling cards 
export default function WorkoutCard({ id, title, subtitle, description }) {
    const [expanded, setExpanded] = useState(false);

    //handles the click for expanding and collapsing card
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    //returns the structure for a card when passed appropriate props
    return (
        <Card className='card'>
            
             <CardHeader title={title}/>
            <CardActions> 
                <CardContent><Typography>{subtitle}</Typography></CardContent>
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
            <CardMedia component="img" height='auto' alt={title}
            image={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${id}/0.jpg`} /> 
            <CardContent>
                <Typography sx={{ fontSize: 14 }} gutterBottom>
                    Starting Position.
                </Typography>
            </CardContent>
            <CardMedia component="img" height="auto" alt={title}
            image={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${id}/1.jpg`} />
                <CardContent>
                    <Typography paragraph sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Ending position.
                    </Typography>
                    <Typography paragraph>
                       Instructions: {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
    }