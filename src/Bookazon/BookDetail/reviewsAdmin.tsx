import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

import * as client from "./clientReview";
import { Review } from "./clientReview";

import * as userClient from "../Users/client";


import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';


function ReviewsAdmin() {


    const { key } = useParams();

    // get all reviews from DB
    const [reviews, setReviews] = useState<Review[]>([]);

    const [authors, setAuthors] =  useState<String[]>([]);

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

    const fetchReviews = async () => {
        console.log(key)
        const bookReviews = await client.findReviewByBook(key);
        console.log(bookReviews)
        setReviews(bookReviews)
    };

    useEffect(() => { fetchReviews(); }, []);


    const style = {
        p: 3,
        width: '100%',
        borderRadius: 2,
        borderColor: 'divider',
    };



    const deleteReview = async (review: any) => {
        console.log(review._id)
        await client.deleteReview(review);
        setReviews(currentReviews =>
            currentReviews.filter(r => r._id !== review._id))

    };


    const handleFlag = (index: any) => {
        const updatedReviews = [...reviews];
        updatedReviews[index].flagged = false;
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

    return (
        <Box >
            {reviews.length > 0 ? (
                <List sx={style} aria-label="review list">
                    {reviews.map((item, index) => (
                        <Box key={index}>
                            <ListItem sx={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
                                secondaryAction={
                                    <Box>
                                        <IconButton aria-label="delete" onClick={() => deleteReview(item)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton sx={{ color: 'green' }} aria-label="unflag" onClick={() => handleFlag(index)}>
                                            <CheckCircleOutlineIcon />
                                        </IconButton>
                                    </Box>

                                }>
                                {item.flagged && (
                                    <ListItemIcon sx={{ color: 'red' }} >
                                        <PriorityHighIcon />
                                    </ListItemIcon>
                                )}
                                <ListItemText primary={item.text}
                                    secondary={
                                        <>
                                            <Link to={`/Bookazon/Profile/${item.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                By {item.username}
                                            </Link>
                                            {authors.includes(item.username) &&  (
                                                <HistoryEduIcon style={{ marginLeft: 4, fontSize: 'small', color: "blue " }} />
                                            )}
                                        </>
                                    }
                                />
                                <Rating sx={{ mr: 6 }} name="read-only" value={item.rating} readOnly />
                            </ListItem>
                            <Divider component="li" />
                        </Box>
                    ))}
                </List>
            ) : (
                <Box sx={{ p: 3 }}>
                    <Typography>No reviews available for this book at this time.</Typography>
                </Box>
            )}
        </Box>
    )
}

export default ReviewsAdmin;