import React from 'react';
import Button from '@mui/material/Button'
import { Box } from '@mui/material';
import { borders } from '@mui/system'

interface UserProfileInfoProps {
  user: {
    username: string;
    firstName: string;
    lastName: string;
    description: string;
  };
}

function UserProfileInfo({ user }: UserProfileInfoProps) {
  return (
    <Box sx={{ mx: '25rem', mt: '2rem', border: 1, borderColor: 'grey.500', p: 2 }}>
      <h2>{user.username}</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>About Me: {user.description}</p>
      {/* Adding a Material-UI Button */}
      <Button variant="contained" color="primary" onClick={() => {
        console.log('Redirect to edit user info');
        // later, will handle the redirect to the edit profile page.
        // could be done using history.push('/edit-profile') if using React Router -- look into that? 
      }}>
        Edit Profile
      </Button>
    </Box>
  );
}

export default UserProfileInfo;
