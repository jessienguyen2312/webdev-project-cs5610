import { Box, Typography } from '@mui/material';
import BookShelf from './BookShelf';
import { useEffect, useState } from 'react';

function ListOfBooks({ user }: { user: any }) {
    // / might want to have this as a database

    const [display, setDisplay] = useState(["History", "Fiction", "Fantasy", "Academic"])


   


        useEffect(() => {
            if (user) {
                setDisplay(["Favorites","History", "Fiction", "Fantasy", "Academic"]);
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