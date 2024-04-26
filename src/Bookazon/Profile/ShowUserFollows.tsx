import React from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../Users/userReducer';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { unfollowUser } from '../Users/client';


interface ShowUserFollowsProps {
    follower: string[];
    following: string[];
    isCurrentUser: boolean;
    setProfile: (profile: any) => void;
    profileId: string;
}

const ShowUserFollows: React.FC<ShowUserFollowsProps> = ({ follower, following, setProfile, profileId, isCurrentUser }) => {
    const dispatch = useDispatch();
    const avatarUrl = `https://api.dicebear.com/8.x/thumbs/svg?seed=`;

    const handleUnfollow = async (usernameToUnfollow: string) => {
        try {
            console.log('COMPONENT LOG: Unfollowing user:', usernameToUnfollow)
            const updatedUser = await unfollowUser(profileId, usernameToUnfollow);
            if (updatedUser) {
                dispatch(setUser(updatedUser)); // Update global state
                setProfile(updatedUser);
            }
        } catch (error) {
            console.error('Failed to unfollow user:', error);
        }
    };

    return (
        <Box sx={{ mt: '1rem' }}>
            {/* FOLLOWERS */}

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#222C4E' }}>Followers</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense>
                        {follower.map((username, index) => (
                            <ListItem key={index}>
                                <ListItemAvatar>
                                    <Avatar src={`${avatarUrl}${username}.svg`} />
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Link to={`/Bookazon/Profile/${username}`} style={{ color: '#222C4E', textDecoration: 'none' }}>
                                        {username}
                                    </Link>
                                } />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>

            {/* FOLLOWING */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h5" style={{ fontWeight: 'bold', color: '#222C4E' }}>Following</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List dense>
                        {following.map((username, index) => (
                            <ListItem key={index} secondaryAction={
                                isCurrentUser && (
                                    <Button onClick={() => handleUnfollow(username)} size="small" color="primary">
                                        Unfollow
                                    </Button>
                                )
                            }>
                                <ListItemAvatar>
                                    <Avatar src={`${avatarUrl}${username}.svg`} />
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <Link to={`/Bookazon/Profile/${username}`} style={{ color: '#222C4E', textDecoration: 'none' }}>
                                        {username}
                                    </Link>
                                } />
                            </ListItem>
                        ))}
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default ShowUserFollows;

