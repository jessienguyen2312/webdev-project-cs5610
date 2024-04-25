import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { findUserByUserName, updateUser, deleteUser } from '../Users/client';

import { Box, Paper, Button, TextField, Typography } from '@mui/material';
import FavoriteBooks from "./FavoriteBooks";
import ShowUserFollows from "./ShowUserFollows";
import { stringify } from 'querystring';
import { unfollowUser } from '../Users/client';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';



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
    role: string;
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
        email: '',
        role: ''
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

    // passing this as a prop
    const handleUnfollow = async (usernameToUnfollow: string) => {
        if (profile && profile._id) {
            const updatedUser = await unfollowUser(profile._id, usernameToUnfollow);
            if (updatedUser) {
                setProfile(updatedUser);
            } else {
                console.error("Failed to unfollow user.");
            }
        }
    };

    /**
     * Handles the click event when the save button is clicked.
     * Updates the user profile with the edited profile data.
     * If the update is successful, sets the updated user profile and exits edit mode.
     * If the update fails, throws an error.
     */
    const handleSaveClick = async () => {
        try {
            if (editedProfile.firstName && editedProfile.lastName && editedProfile.email) { // a half-assed validation
                if (profile && profile._id) { // need to check if profile is not null, won't work otherwise
                    editedProfile._id = profile._id; 
                }
                console.log("Sending update request for user: ", editedProfile);
                const updatedUser = await updateUser(editedProfile);
                if (updatedUser) { // making sure the update was successful
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
        <Paper elevation={3} sx={{ mx: 'auto', mt: '2rem', p: 2, minWidth: '250px', maxWidth: '500px', borderRadius: '5px', bgcolor: 'background.paper' }}>            {editMode ? (
                <>
                    {/* Stringify the current user object */}
                    {/*<p>{JSON.stringify(profile)}</p>
                    <p>{JSON.stringify(editedProfile)}</p> */}
                    <TextField name='firstName' label='First Name' value={editedProfile.firstName} onChange={handleInputChange} /> <br />
                    <TextField name='lastName' label='Last Name' sx={{ mt: 1}} value={editedProfile.lastName} onChange={handleInputChange} /> <br />
                    <TextField name='email' label='Email' value={editedProfile.email} sx={{ mt: 1}} onChange={handleInputChange} /> <br />
                    <TextField name='aboutMe' label='About Me' value={editedProfile.aboutMe} sx={{ mt: 1}} onChange={handleInputChange} /> <br />
                    <TextField name='password' label='Password' value={editedProfile.password} sx={{ mt: 1}} onChange={handleInputChange} /> <br />
                    <Button sx={{ mt: 1}} onClick={handleSaveClick}>Save</Button>
                    <Button sx={{ mt: 1}} onClick={handleCancelClick}>Cancel</Button>
                    
                    {/* <FavoriteBooks bookIds={profile.favoriteBook} /> */}
                    <ShowUserFollows
                        follower={profile.follower}
                        following={profile.following}
                        unfollowUser={unfollowUser}
                        setProfile={setProfile}
                        profileId={profile._id}
                        isCurrentUser={isCurrentUser}
                    />               
                </>
            ) : (
            <>
                <img src={avatarUrl} alt={`${profile.username}'s profile`} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                <Typography variant="h3" style={{ color: '#222C4E' }}>
                    {profile.username}
                    {profile.role === 'AUTHOR' && <HistoryEduIcon sx={{ color: 'primary.main', fontSize: '2.5rem', verticalAlign: 'middle' }} />}
                    {isCurrentUser && (<Button onClick={handleEditClick}>Edit My Profile</Button>)}
                </Typography>
                <Typography variant="h4" style={{  color: '#222C4E', textDecoration: 'none' }}>About Me: </Typography>
                
                {/* Stringify the current user object */}
                {/*<p>{JSON.stringify(profile)}</p> */}  
              <Typography>{profile.aboutMe}</Typography>
              {profile.role === "AUTHOR" && (
                    <Button
                        onClick={() => { /* Logic to view author's catalog */ }}
                        sx={{
                            backgroundColor: '#EF8D40', // Normal state background color
                            '&:hover': {
                                backgroundColor: '#F1A467', // Hover state background color
                            },
                            color: 'white', // Text color for better contrast
                            mt: 2 // Adds margin top for spacing
                        }}
                    >
                        View Catalog
                    </Button>
                )}
                {/* <FavoriteBooks bookIds={profile.favoriteBook} /> */}
                <ShowUserFollows
                    follower={profile.follower}
                    following={profile.following}
                    unfollowUser={unfollowUser}
                    setProfile={setProfile}
                    profileId={profile._id}
                    isCurrentUser={isCurrentUser}
                />
            </>
            )}
        </Paper>
    );
}

export default Profile;
