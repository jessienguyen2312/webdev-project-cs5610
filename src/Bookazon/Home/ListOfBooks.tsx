import { Box, Typography } from '@mui/material';
import BookShelf from './BookShelf';

function ListOfBooks(){
    const books = ["Bestsellers", "Fiction", "History", "Non-Fiction"];

    return(
        <Box sx={{ ml: 5, mr: 5, mt: 2 }}>
             {books.map((item, index) => (
                <Box  key={index}>
                    <Typography variant="h4"  gutterBottom>
                        {item}
                    </Typography>
                    <BookShelf  />
                </Box>
            ))}
        </Box>
        
    );
}
export default ListOfBooks;