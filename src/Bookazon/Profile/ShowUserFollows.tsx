import React from 'react';
import { Box } from '@mui/material';

function ShowUserFollows({ followers, following }: { followers: any[], following: any[]}) {
    return (
        <Box sx={{ mx: '25rem', mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
            <h2>Followers</h2>
            <ul>
                {followers.map((follower) => (
                    <li key={follower.id}>{follower.username}</li>
                ))}
            </ul>
            <h2>Following</h2>
            <ul>
                {following.map((follow) => (
                    <li key={follow.id}>{follow.username}</li>
                ))}
            </ul>
        </Box>

  );
}


export default ShowUserFollows;
