import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

import * as client from "./clientReview";

import { Review } from "./clientReview";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';



function ReviewsAdmin() {


    const { key } = useParams();


    const [reviews, setReviews] = useState<Review[]>([]);

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


    // useEffect(() => {
    //     // Filter and set reviews directly
    //     setReviews(reviews.filter(review => review.bookId === key));
    // }, [key]);


    const deleteReview = async (review: any) => {
        await client.deleteReview(review);
        setReviews(currentReviews => 
            currentReviews.filter(r => r._id !== review._id))

    };

    return (
        <Box>
            {reviews.length > 0 ? (
                <List sx={style} aria-label="review list">
                    {reviews.map((item, index) => (
                        <Box key={index}>
                            <ListItem sx={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}
                                secondaryAction={
                                    <IconButton aria-label="delete" onClick={() => deleteReview(item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }>
                                {item.flagged && (
                                    <ListItemIcon sx={{ color: 'red' }} >
                                        <PriorityHighIcon />
                                    </ListItemIcon>
                                )}
                                <ListItemText primary={item.text} secondary={<Link to={`/Bookazon/Profile/${item.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    By {item.username}
                                </Link>} />
                                <Rating name="read-only" value={item.rating} readOnly />
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