import React, { useState } from 'react';
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
import Select from '@mui/material/Select'; 
import MenuItem from '@mui/material/MenuItem'; // Import the MenuItem component
import { RadioGroup, Radio, FormControl, FormLabel } from '@mui/material';
import * as client from '../Users/client'; 
import { useNavigate } from 'react-router';
import { User } from '../Users/client';
import * as externalClient from '../clientExternal'; 


export default function SignUp() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const navigate = useNavigate(); 
  const [user, setUser] = useState<User>({_id: "", username: "", password: "", firstName: "", lastName: "", role: "READER",
  email: "",
  dateCreated: new Date(),
  aboutMe: "",
  profilePicture: "", // Default empty, set conditionally below
  follower: [],
  following: [],
  favoriteBook: [],
  OL_author_key: ""
   });
  const [tempOL, setTempOL] = useState(""); 
  const [error, setError] = useState("");

  const signup = async () => {
    try {
    await client.signup(user);
    navigate(`/Bookazon/Profile/${user.username}`);} 
    catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        console.error(err);
      }
    }
  }

  const verifyOL = async () => {
    const authorExists = await externalClient.checkAuthorExists(tempOL);
    return authorExists 
  }




  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#F4EEE7", height: "100vh" }}>
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
          {error && <div style={{ color: 'red' }}>{error}</div>}
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
                  value = {user.firstName}
                  onChange={(event) => setUser({...user, firstName: event.target.value})}
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
                  autoComplete="family-name"
                  value = {user.lastName}
                  onChange={(event) => setUser({...user, lastName: event.target.value})} 
                  sx={{
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
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value = {user.username}
                  onChange={(event) => setUser({...user, username: event.target.value})}
                    sx={{
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
                  autoComplete="new-password" 
                  value = {user.password}
                  onChange={(event) => setUser({...user, password: event.target.value})}
                  sx={{
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
                fullWidth
                name="OL ID"
                label="Open Library ID (authors only)"
                type="OL ID"
                id="OL ID"
                autoComplete="new-olid" 
                value={tempOL}
                onChange={(event) => setTempOL(event.target.value)}
                sx={{
                  color: '#222C4E',
                  bgcolor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#222C4E', 
                    },
                  },
                }}
              />
                 <Button
              type="submit" 
              variant="contained"
              onClick = {async () => {
                const authorExists = verifyOL();
                if (await authorExists !== false) {
                  setUser({...user, role: "AUTHOR", OL_author_key: tempOL })
                } else {
                  setError("Open Library ID does not exist")
                }
              }}
              sx={{ 
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}
            >Verify OL ID</Button>
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
           <FormControlLabel 
              value="regular" 
              control={<Radio onChange={() => setUser({...user, role: "READER"})} />} 
              label="Reader" 
            />            
            <FormControlLabel value="admin" control={<Radio
              onChange={() => {
                if (user.role !== "AUTHOR") {
                  setUser({ ...user, role: "ADMIN" });
                }
              }}
            />} label="Admin" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick = {signup}
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
              <Button onClick={() => navigate("/Bookazon/SignIn")} sx={{ color: '#222C4E', textDecoration: 'underline', textTransform: 'none' }}>
                Already have an account? Sign in
              </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Container>
  );
}