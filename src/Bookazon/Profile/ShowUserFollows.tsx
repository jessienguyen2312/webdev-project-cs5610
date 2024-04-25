import React from 'react';
import { Box, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface ShowUserFollowsProps {
    follower: string[];
    following: string[];
    isCurrentUser: boolean;
}

const ShowUserFollows: React.FC<ShowUserFollowsProps> = ({ follower, following, isCurrentUser }) => {
    const avatarUrl = `https://api.dicebear.com/8.x/thumbs/svg?seed=`;

    const handleUnfollow = (username: string) => {
        console.log("Unfollow user:", username);
        // Implement unfollow logic here
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

