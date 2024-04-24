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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import * as client from '../Users/client';
import { User} from '../Users/client';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';

export default function SignIn() {
  const [user, setUser] = useState<User>({ _id:"",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    dateCreated: new Date(),
    aboutMe: "",
    profilePicture: "", 
    follower: [],
    following: [],
    favoriteBook: [],
    OL_author_key: ""});

    const navigate = useNavigate(); 

    const signin = async () => {
      const userLogIn = await client.signin(user);
      navigate(`/Bookazon/Profile/${user._id}`);
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              value = {user.username}
              onChange={(event) => setUser({...user, username: event.target.value})}
              autoFocus
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value = {user.password}
              autoComplete="current-password"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick = {signin}
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item paddingTop={0.25} paddingBottom={2}>
                <Link href="#" variant="body2" sx={{ color: '#222C4E' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      </Container>

  );
}