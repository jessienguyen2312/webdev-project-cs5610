import { Box, Typography } from '@mui/material';
import BookShelf from './BookShelf';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userState } from '../store';

function ListOfBooks() {
    // / might want to have this as a database

    // console.log("entering the list of books user is being rest")

    const user = useSelector((state: userState) => state.userReducer.user);
    console.log("entering the list of books user is being rest to ", user)

    const [display, setDisplay] = useState(["Daily Trending", "History", "Fiction", "Fantasy", "Academic"])


        useEffect(() => {
            if (user) {
                setDisplay(["Daily Trending", "Favorites", "History", "Fiction", "Fantasy", "Academic"]);
            }
        }, [user]);
  

    return (
        <Box sx={{ ml: 5, mr: 5, mt: 2 }}>
            {display.map((item, index) => (
                <Box key={index}>
                    <Typography variant="h4" gutterBottom>
                        {item}
                    </Typography>
                    <BookShelf genre={item} />
                </Box>
            ))}
        </Box>

    );
}
export default ListOfBooks;