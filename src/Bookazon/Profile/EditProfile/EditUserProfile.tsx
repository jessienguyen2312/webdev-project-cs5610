import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SearchBar from "../../Home/SearchBar";
import ProfileNav from "../../Home/ProfileNav"

function EditUserProfile({ user }: { user: any }) {
    const navigate = useNavigate();

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
        // Here you would typically call an API to update the user data
        setTimeout(() => {
            navigate('/Bookazon/Profile');
        }, 500);
    };

    const handleCancel = () => {
        navigate('/Bookazon/Profile');
    };

    return (
        <div>
            <ProfileNav />
            <SearchBar />
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
                    {/* Additional Box for button alignment */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                        <Button variant="contained" color="error" onClick={handleCancel} sx={{ ml: 2 }}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Box>
        </div>
    );
}

export default EditUserProfile;
