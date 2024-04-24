import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Slide, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React from "react";
import { useNavigate } from "react-router";
import { TransitionProps } from "@mui/material/transitions";



const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




function ProfileAnon() {
    const navigate = useNavigate();
    const [criteria, setCriteria] = React.useState('All');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: SelectChangeEvent) => {
        setCriteria(event.target.value as string);
    };

    // navigate to author sign in page 
    const signIn = () => {
        setOpen(false); 
        navigate(`/Bookazon/SignIn`)
    };

    // navigate to author sign in page 
    const signUp = () => {
        navigate(`/Bookazon/SignUp`)
    };


    const handleDialogOpen = () => {
        setOpen(true);  // Open the dialog
    };

    const handleDialogClose = () => {
        setOpen(false);  // Close the dialog
    };





    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mr: 2, mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: 'center', mr: 1 }}>
                <Avatar sx={{ mr: 1 }}>
                    <PersonOutlinedIcon />
                </Avatar>


                <FormControl sx={{ minWidth: 100 }}>
                    <InputLabel id="profileHome">Profile</InputLabel>
                    <Select
                        labelId="profileHome"
                        id="profilSelect"
                        label="profile"
                        onChange={handleChange}
                    >
                        <MenuItem onClick={() => signIn()} >Sign In</MenuItem>
                        <MenuItem onClick={() => signUp()}>Sign Up</MenuItem>
                    </Select>
                </FormControl>

            </Box>

            <Divider sx={{ borderColor: "black" }} orientation="vertical" flexItem />

            <Box>
                <IconButton onClick={() => handleDialogOpen()} aria-label="wishlist" >
                    <FavoriteBorderIcon />
                    <Typography variant="button" >
                        FAVORITS
                    </Typography>
                </IconButton>
            </Box>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDialogClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Sign in?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                       Need to be signed in to add books to favorits 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                    <Button onClick={signIn}>Sign in</Button>
                </DialogActions>
            </Dialog>

        </Box>
    );

}
export default ProfileAnon