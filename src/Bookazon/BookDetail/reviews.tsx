import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, List, ListItem, ListItemText, Rating, Slide, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import * as client from "./clientReview";
import * as userClient from "../Users/client";


import { Review } from "./clientReview";
import useCurrentUser from "../Users/useCurrentUser";
import { useSelector } from "react-redux";
import { userState } from "../store";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function Reviews() {

    const { key = '' } = useParams<{ key: string | undefined }>();

    const navigate = useNavigate();

    useCurrentUser()

    const user = useSelector((state: userState) => state.userReducer.user);

    const [open, setOpen] = React.useState(false);


    const [authors, setAuthors] = useState<String[]>([]);

    const fetchUsersByRole = async (role: string) => {
        try {
            const fetchedAuthors = await userClient.findUsersByRole(role);
            console.log(fetchedAuthors);
            setAuthors(fetchedAuthors.map((author: any) => author.username));
        } catch (error) {
            console.error('Failed to fetch authors:', error);
        }
    };

    useEffect(() => {
        const role = "AUTHOR";
        fetchUsersByRole(role);
    }, []);


    // For creating new reviews
    const [newReview, setNewReview] = useState<Review>({
        _id: "",
        username: "",
        bookId: key,
        rating: 0,
        text: "",
        datePosted: new Date(),
        flagged: false,
        likes: 0
    });


    useEffect(() => {
        if (user) {
            setNewReview(prevReview => ({
                ...prevReview,
                username: user.username
            }));
        }
    }, [user]);



    // for displaying reviews in database
    const [reviews, setReviews] = useState<Review[]>([]);
    const [error, setError] = useState("");

    const fetchReviews = async () => {
        const bookReviews = await client.findReviewByBook(key);
        setReviews(bookReviews)
    };
    useEffect(() => { fetchReviews(); }, []);


    const createReview = async () => {
        try {
            const userReview = await client.createReview(newReview);
            setReviews(prevReviews => [userReview, ...prevReviews]);

            setError("");
            // reset newReview
            setNewReview({
                _id: "",
                username: user.username,
                bookId: key,
                rating: 0,
                text: "",
                datePosted: new Date(),
                flagged: false,
                likes: 0
            });

        } catch (err) {
            setError("Missing Fields");
        }

    }


    const handleFlag = (index: any) => {
        const updatedReviews = [...reviews];
        updatedReviews[index].flagged = true;
        console.log(  updatedReviews[index])
        setReviews(updatedReviews);
        updateReview(updatedReviews[index]);
    };


    const updateReview = async (flaggedReview: any) => {
        try {
            const status = await client.updateReview(flaggedReview);
            setReviews(reviews.map((r) =>
                (r._id === flaggedReview._id ? flaggedReview : r)));
        } catch (err) {
            console.log(err);
        }
    };





    const handleDialogOpen = () => {
        setOpen(true);  // Open the dialog
    };

    const handleDialogClose = () => {
        setOpen(false);  // Close the dialog
    };

    // navigate to author sign in page 
    const signIn = () => {
        setOpen(false);
        navigate(`/Bookazon/SignIn`)
    };



    const style = {
        p: 3,
        width: '100%',
        borderRadius: 2,
        borderColor: 'divider',
    };




    return (


        <Box  >
              {error && <Alert severity="warning">{error}</Alert>}
              
            <Box sx={{
                m: 2,
                mt: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                    <Rating
                        sx={{ mb: 2 }}
                        size="large"
                        name="new-rating"
                        value={newReview.rating}
                        onChange={(event, newValue) => {
                            setNewReview(prevReview => ({
                                ...prevReview,
                                rating: newValue || 1 // Ensures a number is always set
                            }));
                        }}
                    />
                </Box>

                <TextField sx={{ width: '100%' }}
                    placeholder="What did you think about the book?"
                    multiline
                    rows={2}
                    value={newReview.text}
                    onChange={(event) => {
                        const newText = event.target.value;
                        setNewReview(prevReview => ({
                            ...prevReview,
                            text: newText
                        }));
                    }}
                />


                <Box sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    width: '100%',
                    mt: 1
                }}>
                    <Button sx={{
                        bgcolor: "#EF8D40 ", '&:hover': {
                            backgroundColor: '#F1A467 ',
                        }
                    }} variant="contained" onClick={user ? createReview : handleDialogOpen}>Post</Button>


                </Box>
            </Box>



            <List sx={style} aria-label="review list">

                {reviews.map((item, index) => (
                    <Box key={index}  >
                        <ListItem sx={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            {user && (
                                <IconButton onClick={() => handleFlag(index)}>
                                    <FlagOutlinedIcon />
                                </IconButton>
                            )}
                            <ListItemText primary={item.text}
                                secondary={
                                    <>
                                        <Link to={`/Bookazon/Profile/${item.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            By {item.username}
                                        </Link>
                                        {authors.includes(item.username) && (
                                            <HistoryEduIcon style={{ marginLeft: 4, fontSize: 'small', color: "blue" }} />
                                        )}
                                    </>
                                }
                            />
                            <Rating name="read-only" value={item.rating} readOnly />

                        </ListItem>
                        <Divider component="li" />
                    </Box>
                ))}

            </List>


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
                        Need to be signed in to add books to review a book
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                    <Button onClick={signIn}>Sign in</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Reviews;