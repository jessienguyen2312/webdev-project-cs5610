import React from 'react';
import Button from '@mui/material/Button'
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import EditUserProfile from './EditProfile/EditUserProfile';


function UserProfileInfo({ user }: { user: any }) {
  return (
    <Box sx={{ mx: '25rem', mt: '2rem', border: 1, borderColor: 'grey.500', p: 2 }}>
      <h2>{user.username}</h2>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>About Me: {user.description}</p>
      <Link to='/Bookazon/Profile/Edit' style={{ textDecoration: 'none'}}>
        <Button variant="contained" color="primary" >
          Edit Profile
        </Button>
      </Link>
    </Box>
  );
}

export default UserProfileInfo;
