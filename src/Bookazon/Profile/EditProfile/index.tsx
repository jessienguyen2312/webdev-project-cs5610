import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { Navigate } from 'react-router-dom';

function EditUserProfile({ user }: { user: any }) {
    const [userData, setUserData] = useState({
        username: user.username,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Simulate user update operation
        console.log('Updating user:', userData);
        // call an API to update the user data
        // maybe wait .5 second, then go back to profile page
        setTimeout(() => {
            window.location.href = '/Bookazon/Profile';
        }, 500);

    };

    return (
        <Box sx={{ mx: '25rem', mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    type="password"
                />
                <TextField
                    label="First Name"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary" onClick={() => handleSubmit}>Update</Button>
                <Button type="submit" variant="outlined" color="error" onClick={() => window.location.href = '/Bookazon/Profile'}>Cancel</Button>
            </form>
        </Box>
    );
}

export default EditUserProfile;
