import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { findUserByUserName, updateUser, deleteUser } from '../Users/client';

import { Box, Button, TextField } from '@mui/material';
import FavoriteBooks from "./FavoriteBooks";
import ShowUserFollows from "./ShowUserFollows";
import { stringify } from 'querystring';

interface UserProfile {
    _id: string;
    username: string;
    aboutMe: string;
    favoriteBook: string[];
    follower: string[];
    following: string[];
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

function Profile() {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const loggedInUser = useSelector((state: any) => state.userReducer.user);
    const [editMode, setEditMode] = useState(false);
    const [editedProfile, setEditedProfile] = useState<UserProfile>({
        _id: '',
        username: '',
        aboutMe: '',
        favoriteBook: [],
        follower: [],
        following: [], 
        firstName: '', 
        lastName: '',
        password: '',
        email: ''
    });  

    const handleEditClick = () => {
        if (profile) {
            setEditedProfile(profile);
        }
        setEditMode(true);
    };

    const handleCancelClick = () => {
        if (profile) {
            setEditedProfile(profile);
        }
        setEditMode(false);
    }

    const handleSaveClick = async () => {
        try {
          if (editedProfile.firstName && editedProfile.lastName && editedProfile.email) {
            if (profile && profile._id) {
                editedProfile._id = profile._id; 
              }
                          const updatedUser = await updateUser(editedProfile);
            if (updatedUser) {
              setProfile(updatedUser);
              setEditMode(false);
            } else {
              throw new Error("Update was not successful.");
            }
          } else {
            console.error('Validation failed');
          }
        } catch (error) {
          console.error('Failed to update user:', error);
        }
      };
      
      
    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setEditedProfile({ ...editedProfile, [name]: value });
    }


    useEffect(() => {
        async function fetchData() {
            if (username) {
                const userData = await findUserByUserName(username);
                setProfile(userData);
            }
        }
        fetchData();
    }, [username]);

    if (!profile) {
        return <h1>Loading profile...</h1>;
    }

    const isCurrentUser = loggedInUser && profile && loggedInUser.username === profile.username;

    const avatarUrl = `https://api.dicebear.com/8.x/thumbs/svg?seed=${profile.username}`;

    return (
        <Box sx={{ mx: '25rem', mt: '1rem', border: 1, borderColor: 'grey.500', p: 2, minWidth: '250px'  }}>
            {editMode ? (
                <>
                    {/* Stringify the current user object */}
                    <p>{JSON.stringify(profile)}</p>
                    <p>{JSON.stringify(editedProfile)}</p>
                    <TextField name='firstName' label='First Name' value={editedProfile.firstName} onChange={handleInputChange} /> <br />
                    <TextField name='lastName' label='Last Name' sx={{ mt: 1}} value={editedProfile.lastName} onChange={handleInputChange} /> <br />
                    <TextField name='email' label='Email' value={editedProfile.email} sx={{ mt: 1}} onChange={handleInputChange} /> <br />
                    <TextField name='aboutMe' label='About Me' value={editedProfile.aboutMe} sx={{ mt: 1}} onChange={handleInputChange} /> <br />
                    <TextField name='password' label='Password' value={editedProfile.password} sx={{ mt: 1}} onChange={handleInputChange} /> <br />
                    <Button sx={{ mt: 1}} onClick={handleSaveClick}>Save</Button>
                    <Button sx={{ mt: 1}} onClick={handleCancelClick}>Cancel</Button>
                
                    
                </>
            ) : (
            <>
                <img src={avatarUrl} alt={`${profile.username}'s profile`} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                <h2>{profile.username} {isCurrentUser && (<Button onClick={handleEditClick}>Edit My Profile</Button>)}</h2>
                <h3>About Me: </h3>
                {/* Stringify the current user object */}
                {/*<p>{JSON.stringify(profile)}</p> */}  
                <Typography>{profile.aboutMe}</Typography>
                {profile.role === "AUTHOR" && (
                    <Link to={`/Bookazon/Profile/OlAuthorProfile`} onClick={() => {
                        dispatch(setAuthorKey({author_key: profile.OL_author_key}));
                    }}>
                        <Button
                            // onClick={() => navigateToOLAuthorProfile}
                            sx={{
                                backgroundColor: '#EF8D40', // Normal state background color
                                '&:hover': {
                                    backgroundColor: '#F1A467', // Hover state background color
                                    },
                                color: 'white', // Text color for better contrast
                                mt: 2 // Adds margin top for spacing
                            }}>
                            View Catalog
                        </Button>
                    </Link>
                    )}
                <TextField
                        margin="normal"
                        id="username"
                        label="Search for User"
                        name="username"
                        autoComplete="username"
                        value = {searchUser}
                        onChange={() => setSearchUser(searchUser)}
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
                        <Button onClick={() => handleFindUser}>Add</Button>
                  
                    <Button onClick={() => navigate(`/Bookazon/Profile/${username}/Reviews`)}>
                        Navigate to Reviews
                    </Button>         
                
                {/* Favorite Books */}
                <FavoriteBooks bookIds={profile.favoriteBook} />
                <ShowUserFollows follower={profile.follower} following={profile.following} />
            </>
            )}
        </Box>
    );
}

export default Profile;
