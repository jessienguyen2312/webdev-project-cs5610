import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface ShowUserFollowsProps {
    follower: string[];
    following: string[];
}

const ShowUserFollows: React.FC<ShowUserFollowsProps> = ({ follower, following }) => {
    return (
        <Box sx={{ mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
            <h2>Followers</h2>
            <ul>
                {follower.map((username, index) => (
                    <li key={index}>
                        <Link to={`/Bookazon/Profile/${username}`}>{username}</Link>
                    </li>
                ))}
            </ul>
            <h2>Following</h2>
            <ul>
                {following.map((username, index) => (
                    <li key={index}>
                        <Link to={`/Bookazon/Profile/${username}`}>{username}</Link>
                    </li>
                ))}
            </ul>
        </Box>
    );
};

export default ShowUserFollows;
