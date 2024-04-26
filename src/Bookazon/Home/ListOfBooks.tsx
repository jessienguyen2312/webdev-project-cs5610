import { Box, Typography } from '@mui/material';
import BookShelf from './BookShelf';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userState } from '../store';
import useCurrentUser from '../Users/useCurrentUser';

function ListOfBooks() {
    // / might want to have this as a database

    // console.log("entering the list of books user is being rest")
    useCurrentUser()

    const user = useSelector((state: userState) => state.userReducer.user);
    // console.log("current user is (LIST OF BOOKS) ", user)




    const [display, setDisplay] = useState(["Daily Trending", "History", "Fiction", "Fantasy", "Academic"])


        // useEffect(() => {
        //     if (user) {
        //         setDisplay(["Daily Trending", "Favorites", "History", "Fiction", "Fantasy", "Academic"]);
        //     }
        // }, []);

       



        
  

    return (
        <Box sx={{ ml: 5, mr: 5, mt: 2 }}>
            {display.map((item, index) => (
                <Box key={index}>
                    <Typography variant="h4" gutterBottom>
                        {item}
                    </Typography>
                    <BookShelf genre={item}/>
                </Box>
            ))}
        </Box>

    );
}
export default ListOfBooks;