import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { bookDetail } from '../clientExternal'; 
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setBook } from '../BookDetail/BookReducer';


interface BookDetail {
    id: string;
    title: string;
    author_name: string[];
    cover: string;
    work_key: string;
}

interface FavoriteBooksProps {
    bookIds: string[]; // Adjusting the prop type here
}

function FavoriteBooks({ bookIds }: FavoriteBooksProps) {
    const [books, setBooks] = useState<BookDetail[]>([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const bookPromises = bookIds.map(bookId => bookDetail(bookId));
            const bookDetails = await Promise.all(bookPromises);
            console.log("Book details fetched:", bookDetails); // Log to see what the book IDs look like
            const formattedBooks = bookDetails.map(book => ({
                id: book.key.replace('/books/', ''), // Strip the '/books/' prefix
                title: book.title,
                author_name: book.author_name,
                cover: book.cover_edition_key,
                work_key: book.key
            }));
            setBooks(formattedBooks);
            setLoading(false);
        };

        fetchData();
    }, [bookIds]);

    const bookDetailPage = (bookItem: BookDetail) => {
        dispatch(setBook({
            key: bookItem.id,
            author_name: bookItem.author_name,
            cover: bookItem.cover,
            work_key: bookItem.work_key
        }));
        navigate(`/Bookazon/BookDetail/${bookItem.id}`);
    };

    if (loading) return <div>Loading favorite books...</div>;

    return (
        <Box sx={{ mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
            <h3>Favorite Books</h3>
            <ul>
                {books.map(book => (
                    <li key={book.id} onClick={() => bookDetailPage(book)} >
                        {book.title}
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FavoriteBooks;
