import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import * as clientExternal from '../clientExternal'; 
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { resetBook, setBook } from '../BookDetail/BookReducer';
import { bookState } from '../store';
import { extractOLID } from '../../Search';


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

//TODO: Sign in routing is still a bit off though - it's going to /Bookazon/Profile but needs to go to /Bookazon/Profile/userId -Leo

function FavoriteBooks({ bookIds }: FavoriteBooksProps) {


    const [books, setBooks] = useState<BookDetail[]>([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const bookPromises = bookIds.map(bookId => clientExternal.bookDetail(bookId));
            const bookDetails = await Promise.all(bookPromises);
            console.log("Book details fetched:", bookDetails); // Log to see what the book IDs look like
            const formattedBooks = bookDetails.map(book => ({
                id: book.key.replace('/works/', ''), // Strip the '/books/' prefix
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

    const book = useSelector((state: bookState) => state.bookReducer.book);


    const fetchInfoForBookDetail = async (work: any) => {
        //reset book state
        dispatch(resetBook(book));
        // fetch author keys
        const authorsKeys: string[] = [];
        work.authors.forEach((author: any) => {
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
            title: work.title,
            key: work.key,
            author_key: authorsKeys,
            author_name: authorsNames,
            // cover_id: work.covers? work.covers[0] : "",
            cover_edition_key: work.covers? work.covers[0] : "",
        }))
    
        console.log(book)

        navigate(`/Bookazon/BookDetail/${extractOLID(work.key)}`)
    
    }

    if (loading) return <div>Loading favorite books...</div>;

    return (
        <Box sx={{ mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
            <h3>Favorite Books</h3>
            <ul>
                {books.map(book => (
                    <li key={book.id} onClick={() => fetchInfoForBookDetail(book)} >
                        {book.title}
                    </li>
                ))}
            </ul>
        </Box>
    );
}

export default FavoriteBooks;
