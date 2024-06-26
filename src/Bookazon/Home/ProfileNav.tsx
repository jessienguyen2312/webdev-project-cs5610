import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";



function ProfileNav() {
    const [criteria, setCriteria] = React.useState('All');

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
                    <InputLabel id="profileHome">Profile</InputLabel>
                    <Select
                        labelId="profileHome"
                        id="profilSelect"
                        label="profile"
                        onChange={handleChange}
                    >
                        <MenuItem>Ten</MenuItem>
                        <MenuItem>Twenty</MenuItem>
                        <MenuItem>Thirty</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            <Divider sx={{ borderColor: "black" }} orientation="vertical" flexItem />

            <Box>
                <IconButton aria-label="wishlist">
                    <FavoriteBorderIcon />
                    <Typography variant="button" >
                        WISHLIST
                    </Typography>
                </IconButton>
            </Box>

        </Box>
    );

}
export default ProfileNav