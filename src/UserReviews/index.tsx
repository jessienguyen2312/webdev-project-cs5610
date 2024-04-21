import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//Import UserReviews 

export default function UserReviews() {
 
    return (
        <Container maxWidth="xl" >
            <Container component="main" maxWidth="lg" sx={{padding: 0.25}}>
            <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    
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
            

            <h1> <Button>Previous</Button>Reviews<Button>Next</Button></h1>
            </Container>
        <div>
        <Box
      height={200}
      width={600}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
      Review Container 

      <Button>
        <MoreVertIcon/>
      </Button>
    </Box>
        </div>
        </Box>
        </Container>
    </Container>
    );
  }