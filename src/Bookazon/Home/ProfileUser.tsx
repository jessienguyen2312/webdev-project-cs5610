import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";
import { useNavigate } from "react-router";
import * as client from '../Users/client'; 

function ProfileUser({ userName }: { userName: string }) {
    
    const [criteria, setCriteria] = React.useState('All');
    const GREETING = "Hi, " + userName;
    const navigate = useNavigate(); 

    const signout = async () => {
        await client.signout();
        navigate("/Bookazon/Home");
      };

    const handleChange = (event: SelectChangeEvent) => {
        setCriteria(event.target.value as string);
    };

    const avatarUrl = `https://api.dicebear.com/8.x/thumbs/svg?seed=${userName}.svg`;

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mr: 2 }}>
            <Box sx={{display: "flex",  alignItems: 'center', mr: 1}}>
                <Avatar sx={{ mr: 1}} src={`${avatarUrl}`} />

                <FormControl sx={{minWidth: 100}}>
                    <InputLabel id="profileHome">{GREETING}</InputLabel>
                    <Select
                        labelId="profileHome"
                        id="profilSelect"
                        label= "profileHome"
                        onChange={handleChange}
                    >
                        <MenuItem><Button>My Profile</Button></MenuItem>
                        <MenuItem><Button>Favorites List</Button></MenuItem>
                        <MenuItem><Button>Want to Read</Button></MenuItem>
                        <MenuItem><Button>Add Friends</Button></MenuItem>
                        <MenuItem><Button>Reviews</Button></MenuItem>
                        <MenuItem><Button>Authors</Button></MenuItem>
                        <MenuItem><Button onClick={signout}>Log Out</Button></MenuItem>
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
