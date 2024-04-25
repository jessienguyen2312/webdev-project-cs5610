import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './index.css'; 
import Select from '@mui/material/Select'; 
import MenuItem from '@mui/material/MenuItem'; // Import the MenuItem component
import { RadioGroup, Radio, FormControl, FormLabel } from '@mui/material';


export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#F4EEE7" }}>
      <Container component="main" maxWidth="xs" sx={{padding: 0.25, backgroundColor: "#F4EEE7" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: '#222C4E' }}>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus  sx={{
                    color: '#222C4E',
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#222C4E', 
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"  sx={{
                    color: '#222C4E',
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#222C4E', 
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"  sx={{
                    color: '#222C4E',
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#222C4E', 
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"  sx={{
                    color: '#222C4E',
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#222C4E', 
                      },
                    },
                  }}
                />
              </Grid>
              <br/>
      <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} textAlign="center" padding={1}> 
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Register as</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="regular"
            name="radio-buttons-group"
            sx={{ bgColor: 'FFFFFF' }}
          >
            <FormControlLabel value="regular" control={<Radio sx={{ backgroundColor: 'FFFFFF' }} />} label="Regular" />
            <FormControlLabel value="author" control={<Radio />} label="Author" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item paddingTop={0.25} paddingBottom={2}>
                <Link href="#" variant="body2" sx={{ color: '#222C4E' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Container>
  );
}