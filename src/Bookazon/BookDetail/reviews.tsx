import { Box, Divider, List, ListItem, ListItemText, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

interface Review {
    username: String;
    bookId: String;
    rating: number;
    text: String;
}

function Reviews() {


    const { key } = useParams();
    console.log(key)



    const [reviews, setReviews] = useState<Review[]>([]);

    // useEffect(() => {
    //     fetchReviews(bookId).then(data => {
    //         setReviews(data);
    //     });
    // }, [bookId]);


    const reviewList = [
        {
            "username": "booklover123",
            "bookId": "OL34886052M",
            "rating": 5,
            "text": "Absolutely loved this book! It's a masterpiece that's both captivating and emotionally driven."
        },
        {
            "username": "pageTurner",
            "bookId": "OL34886052M",
            "rating": 5,
            "text": "This book was a fantastic read! Highly recommend to anyone who loves epic sagas."
        },
        {
            "username": "pageTurner",
            "bookId": "OL22449759M",
            "rating": 1,
            "text": "Really struggled to finish this book. Not what I was hoping for at all."
        },
        {
            "username": "novelFan",
            "bookId": "OL7826547M",
            "rating": 4,
            "text": "Great thriller with lots of twists. Kept me on the edge of my seat!"
        },
        {
            "username": "novelFan",
            "bookId": "OL7826547M",
            "rating": 1,
            "text": "Too slow for my taste. The story didn't hold my interest."
        },
        {
            "username": "mysteryReader",
            "bookId": "OL22449759M",
            "rating": 5,
            "text": "A brilliant crime novel. Perfectly paced with a plot that keeps you guessing."
        },
        {
            "username": "mysteryReader",
            "bookId": "OL1743891M",
            "rating": 2,
            "text": "Not as thrilling as I expected. The mystery was too easily solved."
        },
        {
            "username": "epicReader",
            "bookId": "OL7826547M",
            "rating": 5,
            "text": "An epic story that I couldn't put down. The characters were deep and memorable."
        },
        {
            "username": "epicReader",
            "bookId": "OL1743891M",
            "rating": 2,
            "text": "I found it underwhelming. Lacked the depth and detail I look for in historical epics."
        }
    ]
    const style = {
        p: 3,
        width: '100%',
        borderRadius: 2,
        borderColor: 'divider',
    };


    useEffect(() => {
        // Filter and set reviews directly
        setReviews(reviewList.filter(review => review.bookId === key));
    }, [key]);

    return (
        <Box>


            <List sx={style} aria-label="review list">
                {reviews.map((item, index) => (
                    <Box key={index}  >
                        <ListItem sx={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
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