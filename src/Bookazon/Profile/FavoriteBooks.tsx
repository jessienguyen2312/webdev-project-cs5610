import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import * as clientExternal from '../clientExternal'; 
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { resetBook, setBook } from '../BookDetail/BookReducer';
import { bookState } from '../store';
import { extractOLID } from '../../Search';
import no_cover from "../../no_cover.png";


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


    const [books, setBooks] = useState<{[key: string] : string}>({});

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const bookTitles: {[key: string] : string} = {};
            for (const work of bookIds) {
                const result = await clientExternal.bookDetail('/works/' + work)
                if (result && result.title) {
                    // @ts-ignore
                    bookTitles[result.title] = result.covers?.[0];
                }
            }
            setBooks(bookTitles);

        };

        fetchData();
    }, [bookIds]);

    const book = useSelector((state: bookState) => state.bookReducer.book);


    const fetchInfoForBookDetail = async (work: string) => {
        console.log(work);
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
            cover_edition_key: result.covers? result.covers[0] : "",
        }))
    
        console.log(book)

        navigate(`/Bookazon/BookDetail/${extractOLID(result.key)}`)
    
    }

    // if (loading) return <div>Loading favorite books...</div>;

    return (
        <Box sx={{ mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
            <h3>Favorite Books</h3>
            <ul>
                {Object.entries(books).map(([title, cover_id], index) => (
                    <li key={title} onClick={() => fetchInfoForBookDetail(bookIds[index])}>
                        <Box
                            sx={{height: 50}}
                            src={clientExternal.bookCoverUrlId(cover_id, "S")}
                            component="img"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = no_cover}}
                        />
                        {title}
                    </li>
                ))}

            </ul>
        </Box>
    );
}

export default FavoriteBooks;
