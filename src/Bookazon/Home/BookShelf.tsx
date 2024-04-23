import { Box, Card, CardContent, CardMedia, IconButton, Tab, Tabs, Typography, CardActionArea } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { bookState } from "../store";
import { setBook } from '../BookDetail/BookReducer';
import * as clientExternal from "../clientExternal";
import no_cover from "../../no_cover.png";
import {extractOLID} from "../../Search";
import {setAuthorKey} from "../Profile/OLAuthorReducer";


interface Book {
    editions: { docs: [{key: string}] }
    // key: string;
    title: string;
    author_name: string[];
    author_key: string[];
    cover_edition_key: string;
    key: string;
}

interface bookDetail {
    description: string
    title: string
    cover: string
}



function BookShelf({ genre }: { genre: string }) {
    // console.log(genre)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const book = useSelector((state: bookState) => state.bookReducer.book);


    // navigate to book detail page and pass in key for book
    const bookDetailPage = (bookItem: Book) => {
        if (genre === 'Daily Trending') {
            dispatch(setBook({
                key: bookItem.cover_edition_key,
                author_name: bookItem.author_name,
                author_key: bookItem.author_key,
                cover: bookItem.cover_edition_key,
                work_key: bookItem.key
            }));

            navigate(`/Bookazon/BookDetail/${bookItem.cover_edition_key}`);

        } else {
            dispatch(setBook({
                key: extractOLID(bookItem.editions.docs[0].key),
                author_name: bookItem.author_name,
                author_key: bookItem.author_key,
                cover: bookItem.cover_edition_key,
                work_key: bookItem.key
            }))

            navigate(`/Bookazon/BookDetail/${extractOLID(bookItem.editions.docs[0].key)}`)
        }

    };

    // navigate to author profil page and pass in author key
    const authorDetail = (authorID: any) => {
        dispatch(setAuthorKey({author_key: authorID}));
        navigate(`/Bookazon/Profile/OlAuthorProfile`);
    };

    // const url = OPENLIB_API + genre + "&limit=7";
    const [books, setBooks] = useState<Book[]>([]);

    const fetchBookSelection = async () => {
        if (genre === 'Daily Trending') {
            const response = await clientExternal.trendingDaily();
            setBooks(response.works || []);

        } else {
            const response = await clientExternal.subjectTextBookSearch(genre);
            console.log(response.docs);
            setBooks(response.docs || []);
        }
    }


    useEffect(() => {
        if (genre.toLowerCase() === 'favorites') {
            // If the genre is 'favorites', skip fetching 
            console.log('Skipping fetch for favorites genre');
            return;
        }
    
        const fetchData = async () => {
            try {
                // const response = await axios.get(`${OPENLIB_API}${genre}&limit=7`);
                // setBooks(response.data.docs || []);
                fetchBookSelection()
            } catch (error) {
                console.error('There was an error fetching the books:', error);
            }
        };
    
        fetchData();
    }, [genre]);
    


    // console.log({ books })

    // making sure I can get the info USED FOR checking
    // useEffect(() => {
    //     if (books.length > 1) {
    //         // console.log(books[0].cover_edition_key);
    //         // console.log(typeof books[0].author_name);
    //         // console.log(books);
    //     }
    // }, [books]);


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
                                            src={clientExternal.bookCoverUrl(item.editions === undefined? item.cover_edition_key : extractOLID(item.editions.docs[0].key))}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = no_cover}
                                            }

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