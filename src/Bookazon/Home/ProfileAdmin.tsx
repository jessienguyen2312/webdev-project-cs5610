import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";
import { useNavigate } from "react-router";
import * as client from '../Users/client';

function ProfileAdmin({ userName }: { userName: string }) {

    const [criteria, setCriteria] = React.useState('All');
    const GREETING = "Hi, " + userName;
    const navigate = useNavigate();

    const signout = async () => {
        await client.signout();
        navigate("/Bookazon/Home");
    };


    const favorits = () => {
        navigate("/Bookazon/Profile");
    };

    const home = () => {
        navigate(`/Bookazon/Home`)
    };



    const handleChange = (event: SelectChangeEvent) => {
        setCriteria(event.target.value as string);
    };

    const handleProfileNav = () => {
        navigate(`/Bookazon/Profile/${userName}`);
    };

    const handleReviewNav = () => {
        navigate(`/Bookazon/reviews/moderation`);
    };



    const avatarUrl = `https://api.dicebear.com/8.x/thumbs/svg?seed=${userName}.svg`;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mr: 2 }}>
            <Box sx={{ display: "flex", alignItems: 'center', mr: 1 }}>
                <Avatar sx={{ mr: 1 }} src={`${avatarUrl}`} />

                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel id="profileHome">{GREETING}</InputLabel>
                    <Select
                        labelId="profileHome"
                        id="profilSelect"
                        label="profileHome"
                        onChange={handleChange}
                    >
                        <MenuItem> <Button onClick={() => home()} > Home </Button></MenuItem>
                        <MenuItem><Button onClick={handleProfileNav}>My Profile</Button></MenuItem>
                        <MenuItem><Button onClick={handleReviewNav}>Review Moderation</Button></MenuItem>
                        <MenuItem><Button onClick={signout}>Log Out</Button></MenuItem>
                    </Select>
                </FormControl>

            </Box>

            <Divider sx={{ borderColor: "black" }} orientation="vertical" flexItem />

            <Box>
                <IconButton aria-label="wishlist" onClick={favorits}>
                    <FavoriteBorderIcon />
                    <Typography variant="button" >
                        Favorites
                    </Typography>
                </IconButton>
            </Box>

        </Box>
    );

}

export default ProfileAdmin
