'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

 //accepts props for styling cards 
export default function SavedWorkoutCard({ id, title,intensityLevel, focus, exercises }) {
    //returns the structure for a card when passed appropriate props
    return (
        <Card className='card'>
            <CardHeader title={title}/>
            <CardContent><Typography variant="subtitle1">{focus}</Typography></CardContent>
            <CardContent><Typography variant="body1">{intensityLevel}</Typography></CardContent>
            <CardContent><Typography variant="body2">{exercises.length}</Typography></CardContent>
        </Card>
    );
    }