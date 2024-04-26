import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { findUserByUserName, updateUser, deleteUser } from '../Users/client';
import { setUser } from '../Users/userReducer';

import { Paper, Button, TextField, Typography, List, ListItem, Avatar, ListItemText, Accordion, AccordionSummary, AccordionDetails, Box, Container } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import FavoriteBooks from "./FavoriteBooks";
import { unfollowUser, followUser } from '../Users/client';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import {setAuthorKey} from "./OLAuthorReducer";
import useCurrentUser from '../Users/useCurrentUser';
import {useNavigate} from "react-router-dom";


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
    OL_author_key: string;
}

function Profile() {
    const { username } = useParams<{ username: string }>();
    useCurrentUser();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state: any) => state.userReducer.user);
    const [editMode, setEditMode] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
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
        role: '',
        OL_author_key: ''
    });

    const [searchUser, setSearchUser] = useState<string>("") 
    const navigate = useNavigate(); 
    const [error, setError] = useState<string>("")

    useEffect(() => {
        async function fetchProfileData() {
            const data = await findUserByUserName(username);
            setProfile(data);
            setIsFollowing(loggedInUser?.following?.includes(data.username));
        }
        console.log('PROFILE LOG: The loggedInUser is: ', loggedInUser);
        fetchProfileData();
    }, [username, loggedInUser]);

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

    const handleFollow = async () => {
        if (profile && !loggedInUser) {
            // display an alert that says user must be logged in to follow
            alert('You must be logged in to follow a user.');
            return;
        }
        if (profile && loggedInUser) {
            const updatedUser = await followUser(loggedInUser._id, profile.username);
            console.log("UPDATED USER IS: ", updatedUser);
            setIsFollowing(true);
            setProfile({...profile, follower: profile.follower.concat(loggedInUser.username)})
            console.log(profile);
        }
    };
    
    const handleUnfollow = async (usernameToUnfollow: string) => {
        if (profile) {
            const updatedUser = await unfollowUser(loggedInUser._id, usernameToUnfollow);
            if (updatedUser) {
                setIsFollowing(false);
                setProfile(updatedUser);
                if (loggedInUser && loggedInUser.username === profile.username) { // not sure if this check is necessary, but seemed safe
                    // filter out usernameToUnfollow
                    setProfile({ ...profile, following: profile.following.filter((username: string) => username !== usernameToUnfollow) });
                }
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


    const handleFindUser = async () => {
        try {
            setError("");
            await findUserByUserName(searchUser);
            navigate(`/Bookazon/Profile/${searchUser}`)
        } catch (err: any) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);}
        }
    } 
    useEffect(() => {
        async function fetchData() {
            if (username) {
                const userData = await findUserByUserName(username);
                setProfile(userData);
                console.log(userData);
                setIsFollowing(loggedInUser?.following.includes(userData.username));
            }
        }
        fetchData();
    }, [username]);

    if (!profile) {
        return <h1>Loading profile...</h1>;
    }

    // check if the logged in user is viewing their own profile
    const isCurrentUser = loggedInUser && profile && loggedInUser.username === profile.username;

    const avatarUrl = `https://api.dicebear.com/8.x/thumbs/svg?seed=${profile.username}`;

    return (
        <>
    <Container maxWidth={false} sx={{ display: 'block', justifyContent: 'center', alignItems: 'center', height: "100%", minHeight: '10vh', backgroundColor: '#5D6BA0', p: 1}}>
        <Paper elevation={3} sx={{ mx: 'auto', mt: '2rem', p: 2, minWidth: '250px', maxWidth: '500px', borderRadius: '5px', bgcolor: 'background.paper' }}>            
            {editMode ? (
                <>
                
                    {/* Stringify the current user object */}
                    {/*<p>{JSON.stringify(profile)}</p>
                    <p>{JSON.stringify(editedProfile)}</p> */}
                    <TextField name='firstName' label='First Name' value={editedProfile.firstName} sx={{color: '#222C4E'}} onChange={handleInputChange} /> <br />
                    <TextField name='lastName' label='Last Name' sx={{ mt: 1, color: '#222C4E'}} value={editedProfile.lastName} onChange={handleInputChange} /> <br />
                    <TextField name='email' label='Email' value={editedProfile.email} sx={{ mt: 1, color: '#222C4E'}} onChange={handleInputChange} /> <br />
                    <TextField name='aboutMe' label='About Me' value={editedProfile.aboutMe} sx={{ mt: 1, color: '#222C4E'}} onChange={handleInputChange} /> <br />
                    <TextField name='password' label='Password' value={editedProfile.password} sx={{ mt: 1, color: '#222C4E'}} onChange={handleInputChange} /> <br />
                    <Button sx = {{
                        mt: 1,
                        marginTop: 2, 
                        color: "#FFFFFF",
                        backgroundColor: '#EF8D40',
                        '&:hover': {
                        backgroundColor: '#F1A467'
                        }
                        }} onClick={handleSaveClick}>Save</Button>
                    <Button sx = {{
                        mt: 1,
                        marginTop: 2,
                        marginLeft: 2,  
                        color: "#FFFFFF",
                        backgroundColor: '#EF8D40',
                        '&:hover': {
                        backgroundColor: '#F1A467'
                        }
                        }} onClick={handleCancelClick}>Cancel</Button>
                    

                    <FavoriteBooks bookIds={profile.favoriteBook} />
                    <br></br>
                    <br></br>
                    <></>
                    {/* <Button fullWidth onClick={() => navigate(`/Bookazon/Profile/${username}/Reviews/Edit`)} 
                    sx = {{
                        marginTop: 2, 
                        color: "#FFFFFF",
                        backgroundColor: '#EF8D40',
                        '&:hover': {
                        backgroundColor: '#F1A467'
                        }
                        }}>
                        Edit Reviews
                    </Button>          */}

                </>
            ) : (
            <>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <TextField
                margin="normal"
                
                id="Search"
                label="Search for User"
                name="Search"
                autoComplete="User"
                value = {searchUser}
                onChange={(event) => setSearchUser(event.target.value)}
                autoFocus
                sx={{
                    color: '#222C4E', 
                    width: 350, 
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: '#222C4E', 
                    },
                    },
                }}
                />
                <Button 
                variant="contained"
                onClick={() => handleFindUser()} sx={{ 
                    mt: 3, 
                    mb: 2,
                    mx: 1, 
                    backgroundColor: '#EF8D40',
                    '&:hover': {
                    backgroundColor: '#F1A467'
                    }}}>Search</Button>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center', // Centers text for smaller components
                    width: '100%', // Takes full width of the parent container
                    my: 2 // Margin for top and bottom for spacing
                }}>
                    <img src={avatarUrl} alt={`${profile.username}'s profile`} style={{ width: 100, height: 100, borderRadius: '50%' }} />
                    <Typography variant="h3" sx={{ color: '#222C4E', mt: 2 }}>
                        {profile.username}
                        {profile.role === 'AUTHOR' && <HistoryEduIcon sx={{ color: 'primary.main', fontSize: '2.5rem', verticalAlign: 'middle' }} />} <br/>
                        {isCurrentUser && (<Button onClick={handleEditClick}
                        sx = {{
                            mt: 1,
                            marginTop: 2, 
                            color: "#FFFFFF",
                            backgroundColor: '#EF8D40',
                          '&:hover': {
                            backgroundColor: '#F1A467'
                          }
                          }}>Edit My Profile</Button>)}
                        {!isCurrentUser && !isFollowing && (<Button onClick={handleFollow} sx={{ mt: 1 }}>Follow</Button>)}
                        {/* {!isCurrentUser && isFollowing && (<Button onClick={() => handleUnfollow(profile.username)} sx={{ mt: 1 }}> Unfollow</Button>)} */}
                    </Typography>
                </Box>
                
                {/* <Typography variant="h4" style={{  color: '#222C4E', textDecoration: 'none' }}>About Me: </Typography> */}
                
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
                <FavoriteBooks bookIds={profile.favoriteBook} />

                {/* Followers */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography variant="h5" style={{ fontWeight: 'bold', color: '#222C4E' }}>Followers: {profile.follower.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {profile.follower.map((follower, index) => (
                                <ListItem key={index}>
                                    <Avatar src={`${avatarUrl}${follower}`} sx={{ marginRight: 2 }} />
                                    <ListItemText primary={<Link to={`/Bookazon/profile/${follower}`} style={{ color: '#222C4E', textDecoration: 'none' }}>{follower}</Link>} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>

                {/* Following */}
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#222C4E' }}>Following: {profile.following.length}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {profile.following.map((following, index) => (
                                <ListItem key={index} secondaryAction={isCurrentUser && (
                                    <Button onClick={() => handleUnfollow(following)} size="small" color="primary">
                                        Unfollow
                                    </Button>
                                )}>
                                    <Avatar src={`${avatarUrl}${following}`} sx={{ marginRight: 2 }} />
                                    <ListItemText primary={<Link to={`/Bookazon/profile/${following}`} style={{ color: '#222C4E', textDecoration: 'none' }} >{following}</Link>} />
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
                <Button fullWidth onClick={() => navigate(`/Bookazon/Profile/${username}/Reviews/`)} 
                    sx = {{
                        marginTop: 2, 
                        color: "#FFFFFF",
                        backgroundColor: '#EF8D40',
                        '&:hover': {
                        backgroundColor: '#F1A467'
                        }
                        }}>
                        Navigate to Reviews
                    </Button>   
            </>
            
            )}
        </Paper>
        </Container>
        </>
    );
}

export default Profile;
