import { Box, Typography } from '@mui/material';
import BookShelf from './BookShelf';

function ListOfBooks(){
    // / might want to have this as a database
    const books = ["History", "Fiction", "Fantasy", "Academic"];

    return(
        <Box sx={{ ml: 5, mr: 5, mt: 2 }}>
             {books.map((item, index) => (
                <Box  key={index}>
                    <Typography variant="h4"  gutterBottom>
                        {item}
                    </Typography>
                    <BookShelf genre = {item}  />
                </Box>
            ))}
        </Box>
        
    );
}
export default ListOfBooks;