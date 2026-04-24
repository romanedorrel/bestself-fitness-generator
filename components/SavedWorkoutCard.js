'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import CardActions  from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

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
export default function SavedWorkoutCard({ id, title, intensityLevel, focus, exercises }) {
    const [expanded, setExpanded] = useState(false);

    //handles the click for expanding and collapsing card
    const handleExpandclick = () => {
        setExpanded(!expanded);
    };
    //returns the structure for a card when passed appropriate props
    return (
        <Card className='card'>
            <CardHeader title={title}/>
            <CardActions>
            <CardContent>
                <Typography variant="body2" color="text.secondary">Focus: {focus}</Typography>
                <Typography variant="body2" color="text.secondary">Level: {intensityLevel}</Typography>
                <Typography variant="body1" sx={{marginTop: 1, fontWeight: 500}}>Exercises: {exercises.length}</Typography>
            </CardContent>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandclick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {exercises.map((exercise, index) => (
                        <div key={exercise.id || index} style={{ marginBottom: '8px' }}>
                            <Typography variant="subtitle2">{exercise.exerciseName}</Typography>
                        </div>
                    ))}
                </CardContent>
            </Collapse>
        </Card>
    );
    }