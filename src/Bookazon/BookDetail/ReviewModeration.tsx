import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

import * as client from "./clientReview";
import { Review } from "./clientReview";

import * as userClient from "../Users/client";


import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import useCurrentUser from "../Users/useCurrentUser";
import { useSelector } from "react-redux";
import { bookState, userState } from "../store";


import { extractOLID } from '../../Search';
import { resetBook, setBook } from '../BookDetail/BookReducer';
import * as clientExternal from '../clientExternal';
import { useDispatch } from 'react-redux';
import { Button } from "react-bootstrap";






function ReviewModeration() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const book = useSelector((state: bookState) => state.bookReducer.book);


    const fetchInfoForBookDetail = async (work: String) => {
        // fetch work info
        const result = await clientExternal.bookDetail('/works/' + work);
        console.log(result);
        //reset book state
        dispatch(resetBook(book));
        // fetch author keys
        const authorsKeys: string[] = [];
        result.authors.forEach((author: any) => {
            // @ts-ignore
            authorsKeys.push(extractOLID(author.author.key));
        });
        // fetch author names from author keys
        const authorsNames: string[] = [];
        for (const author of authorsKeys) {
            authorsNames.push(await clientExternal.fetchAuthorName(author));
        }

        dispatch(setBook({
            ...book,
            title: result.title,
            key: result.key,
            author_key: authorsKeys,
            author_name: authorsNames,
            // cover_id: work.covers? work.covers[0] : "",
            cover_edition_key: result.covers ? result.covers[0] : "",
        }))

        console.log(book)

        navigate(`/Bookazon/BookDetail/${extractOLID(result.key)}`)

    }

    useCurrentUser()

    const user = useSelector((state: userState) => state.userReducer.user);






    // get all reviews from DB
    const [reviews, setReviews] = useState<Review[]>([]);

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

    const fetchReviews = async () => {

        const bookReviews = await client.findAllReviews();
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


    if (user) {
        if (user.role === 'ADMIN') {

            return (
                <Box>
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
                                                    <Link to={`/Bookazon/Profile/${item.username}`} style={{ textDecoration: 'none', color: '#222C4E' }}>
                                                        By {item.username}
                                                    </Link>
                                                    {authors.includes(item.username) && (
                                                        <VerifiedIcon style={{ marginLeft: 4, fontSize: 'small', color: "blue" }} />
                                                    )}
                                                    <Button onClick={() => fetchInfoForBookDetail(item.bookId)} style={{
                                                        backgroundColor: 'transparent',
                                                        boxShadow: 'none',
                                                        padding: 0,
                                                        minWidth: 0,
                                                        textTransform: 'none',
                                                        marginLeft: 10,
                                                        border: 'none'
                                                    }}>
                                                        <Link to={`/Bookazon/BookDetail/${item.bookId}`} style={{
                                                            textDecoration: 'none',
                                                            color: '#EF8D40 ', 
                                                            fontSize: '14px' 
                                                        }}>
                                                            View Details
                                                        </Link>
                                                    </Button>

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
        else { return (<h1> YOU MUST BE AN ADMIN TO ACCESS THIS PAGE</h1>) }
    }
    else { return (<h1> YOU MUST BE AN ADMIN TO ACCESS THIS PAGE</h1>) }
}

export default ReviewModeration;