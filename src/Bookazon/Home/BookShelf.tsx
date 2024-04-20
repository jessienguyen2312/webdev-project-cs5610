import { Box, Card, CardContent, CardMedia, IconButton, Tab, Tabs, Typography, CardActionArea } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { bookState } from "../store";
import { setBook } from '../BookDetail/BookReducer';

const OPENLIB_API = "https://openlibrary.org/search.json?q=subject:";
const COVER_API = "https://covers.openlibrary.org/b/olid/";




interface Book {
    edition_key: any;
    // key: string;
    title: string;
    author_name: string[];
    author_key: string[];
    cover_edition_key: string;
}

interface bookDetail {
    description: string
    title: string
    cover: string
}



function BookShelf({ genre }: { genre: string }) {
    
    
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const book = useSelector((state: bookState) => state.bookReducer.book);
    // const [bookDetail, setBookDetail] = useState<bookDetail>();

    // navigate to book detail page and pass in key for book
    const bookDetailPage = (bookItem: Book) => {
        dispatch(setBook({
            key: bookItem.edition_key[0],
            author_name: bookItem.author_name,
            author_key: bookItem.author_key,
            cover_edition_key: bookItem.cover_edition_key,
        }))
        console.log(JSON.stringify(book, null, 2))
        navigate(`/Bookazon/BookDetail/${bookItem.edition_key[0]}`)
    };

    // navigate to author profil page and pass in author key
    const authorDetail = (authorID: any) => {
        navigate(`/Bookazon/Profile/${authorID}`)
    };

    const url = OPENLIB_API + genre + "&limit=7";

    const [books, setBooks] = useState<Book[]>([]);


    useEffect(() => {
        const fetchData = async () => {

            try {
                const res = await axios.get(`${url}`);
                setBooks(res.data.docs || []);

            } catch (error) {
                console.error('There was an error fetching the books:', error);
            }
        };
        fetchData();
    }, [genre]);


    // console.log({ books })

    // making sure I can get the info USED FOR checking
    useEffect(() => {
        if (books.length > 1) {
            // console.log(books[0].cover_edition_key);
            // console.log(typeof books[0].author_name);
        }
    }, [books]);


    // used for the arrow clicks on the shelf
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div >


            < Box sx={{
                display: 'flex',
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto',
                    width: '100%',
                    height: 300,
                }}  >
                    <Tabs

                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >

                        {books.map((item, index) => (


                            <Tab label={
                                <Card sx={{ width: 250, height: '100%' }}>
                                    <CardActionArea onClick={() => bookDetailPage(item)} >
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                maxHeight: 100,

                                                // minHeight: 50,
                                                objectFit: 'contain',
                                                width: '100%'
                                            }}
                                            image={item.cover_edition_key ? `${COVER_API}${item.cover_edition_key}.jpg?default=false` : '/no_cover.png'}

                                            title={item.title}

                                        />
                                    </CardActionArea>

                                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>

                                        <Box>
                                            <CardActionArea onClick={() => bookDetailPage(item)}>
                                                <Typography variant='subtitle1' display="block" sx={{

                                                    whiteSpace: 'nowrap',
                                                    // overflow: 'hidden',      
                                                    textOverflow: 'ellipsis',
                                                    width: 190,
                                                }}>
                                                    {item.title}
                                                </Typography>
                                            </CardActionArea>

                                            <Box sx={{ display: 'flex' }}>
                                                {item.author_name.map((author, index) => (
                                                    <CardActionArea onClick={() => authorDetail(item.author_key[index])}>
                                                        <Typography key={index} variant='caption'>
                                                            {author}
                                                        </Typography>
                                                    </CardActionArea>
                                                ))}
                                            </Box>


                                        </Box>


                                    </CardContent>

                                    <IconButton>
                                        <FavoriteBorderIcon />
                                    </IconButton>




                                </Card>
                            }
                            />

                        ))}
                    </Tabs>
                </Box>

            </Box>

        </div >
    );

}

export default BookShelf;