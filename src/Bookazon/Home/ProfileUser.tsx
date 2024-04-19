import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";



function ProfileUser({ userName }: { userName: string }) {
    
    const [criteria, setCriteria] = React.useState('All');
    const GREETING = "Hi, " + userName;
    console.log(GREETING)

    const handleChange = (event: SelectChangeEvent) => {
        setCriteria(event.target.value as string);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mr: 2 }}>
            <Box sx={{display: "flex",  alignItems: 'center', mr: 1}}>
                <Avatar sx={{ mr: 1 }}>
                    <PersonOutlinedIcon />
                </Avatar>

                <FormControl sx={{minWidth: 100}}>
                    <InputLabel id="profileHome">{GREETING}</InputLabel>
                    <Select
                        labelId="profileHome"
                        id="profilSelect"
                        label= "profileHome"
                        onChange={handleChange}
                    >
                        <MenuItem>My Profile</MenuItem>
                        <MenuItem>Favorites List</MenuItem>
                        <MenuItem>Want to Read</MenuItem>
                        <MenuItem>Add Friends</MenuItem>
                        <MenuItem>Reviews</MenuItem>
                        <MenuItem>Authors</MenuItem>
                        <MenuItem>Log Out</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            <Divider sx={{ borderColor: "black" }} orientation="vertical" flexItem />

            <Box>
                <IconButton aria-label="wishlist">
                    <FavoriteBorderIcon />
                    <Typography variant="button" >
                        Favorits
                    </Typography>
                </IconButton>
            </Box>

        </Box>
    );

}
export default ProfileUser