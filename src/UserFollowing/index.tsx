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
import { useState } from 'react';
import { User } from '../Bookazon/Users/client';
import * as client from '../Bookazon/Users/client'; 
import { useParams } from 'react-router';

export default function UserFollowing() { 

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
    const [error, setError] = useState("");
    const userId = useParams();
    const [newUsername, setNewUsername] = useState("")
    const [followings, setFollowings] = useState<String>() 

    const checkUser = async (username: string) => {
        try {
        const newUser = await client.findUserByUserName(username)
        return true;
        }
        catch (err: any) {
            setError(err)
            return false;
        }
    }
    const addNewFollowing = async (user: User) => {
        await client.updateUser(user)
    }

    const findCurrentUser = async (username: string) => {
        const current = await client.findUserByUserName(username)
        setUser(current)
    }

    return (
        <Container> 
            <TextField
              margin="normal"
              id="username"
              label="Search for User"
              name="username"
              autoComplete="username"
              value = {newUsername}
              onChange={() => setNewUsername(newUsername)}
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
            {/* <Button
                onClick={() => {
                    const newUser = checkUser(newUsername); // Assuming checkUser() returns a user object or false
                    if (newUser) {
                        setFollowings([newUsername, ...followings]);
                        setUser({ ...user, following: followings });
                    }
                }}
            >Add</Button> */}
        </Container>
    )
}