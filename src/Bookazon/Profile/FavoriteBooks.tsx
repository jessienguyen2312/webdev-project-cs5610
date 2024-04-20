import React from 'react';
import { Box } from '@mui/material';

function FavoriteBooks({ books }: { books: any[] }) {
    return (
        <Box sx={{ mx: '25rem', mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
            <h3>Favorite Books</h3>
            <ul>
                {books.map(book => (
                    <li key={book.key}>{book.key} - Placeholder for book title</li>
                ))}
            </ul>
        </Box>
    );
}

export default FavoriteBooks;
