import * as React from 'react';
import {useState, useEffect} from "react"; 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ProfileNav from '../../Bookazon/Home/ProfileNav';
import SearchBar from '../../Bookazon/Home/SearchBar';
 
interface Review {
  _id: string;
  username: string; 
  bookId: string;
  rating: Number;
  text: string; 
  datePosted: string; 
  flagged: boolean; 
  likes: Number; 
}

export default function EditReviews() {
    return (
        <Container>
        <ProfileNav/>
        <SearchBar/>
        <Container  maxWidth="xl"  sx={{ backgroundColor: "#F4EEE7" }}>
                <Button variant="contained" className="blah" sx={{ 
                mt: 3, 
                mb: 2,
                width: '25%',
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}>
                    Settings
                </Button>
                <Button variant="contained" sx={{ 
                mt: 3, 
                mb: 2,
                width: '25%',
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}>
                    Reviews
                </Button>
                <Button variant="contained" sx={{ 
                mt: 3, 
                mb: 2,
                width: '25%',
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}>
                    Favorites
                </Button>
                <Button variant="contained" sx={{ 
                mt: 3, 
                mb: 2,
                width: '25%',
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}>
                    Following
                </Button>
            </Container>
            <Container sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            

            <h1>Edit Review</h1>
            </Container>

            
        </Container>
    )
}