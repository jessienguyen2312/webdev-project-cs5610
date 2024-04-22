import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, Rating, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

import * as client from "./clientReview";


import { Review } from "./clientReview";
import { User } from "../Users/client";


function Reviews({ user }: { user: any }) {
    // console.log(user)


    // const { usernameID = '' } = useParams(useParams<{ username: string | undefined }>(););
    const { key = '' } = useParams<{ key: string | undefined }>();
    // const { usernameId = '' } = useParams<{ usernameId: string | undefined }>();



    const [newReview, setNewReview] = useState<Review>({
        _id: "",
        username: user.username,
        bookId: key,
        rating: 0,
        text: "",
        datePosted: new Date(),
        flagged: false,
        likes: 0
    });
    console.log(newReview)

    const [reviews, setReviews] = useState<Review[]>([]);

    const fetchReviews = async () => {
        console.log(key)
        const bookReviews = await client.findReviewByBook(key);
        setReviews(bookReviews)
    };
    useEffect(() => { fetchReviews(); }, []);


    const createReview = async () => {
        try {
            const userReview = await client.createReview(newReview);
            setReviews(prevReviews => [userReview, ...prevReviews]);

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
            console.log(err);
        }

    }



    const style = {
        p: 3,
        width: '100%',
        borderRadius: 2,
        borderColor: 'divider',
    };


    // useEffect(() => {
    //     // Filter and set reviews directly
    //     setReviews(reviewList.filter(review => review.bookId === key));
    // }, [key]);

    return (


        <Box>
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
                                rating: newValue || 0 // Ensures a number is always set
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
                    <Button variant="contained" onClick={createReview}>Post</Button>

                </Box>
            </Box>



            <List sx={style} aria-label="review list">

                {reviews.map((item, index) => (
                    <Box key={index}  >
                        <ListItem sx={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                            <IconButton >
                                <FlagOutlinedIcon />
                            </IconButton>
                            <ListItemText primary={item.text} secondary={<Link to={`/Bookazon/Profile/${item.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                By {item.username}
                            </Link>} />
                            <Rating name="read-only" value={item.rating} readOnly />

                        </ListItem>
                        <Divider component="li" />
                    </Box>
                ))}

            </List>

        </Box>
    )
}

export default Reviews;