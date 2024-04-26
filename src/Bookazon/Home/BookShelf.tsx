import { Box, Card, CardContent, CardMedia, IconButton, Tab, Tabs, Typography, CardActionArea, tabsClasses, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useDispatch, useSelector } from 'react-redux';
import { bookState, userState } from "../store";
import { setBook } from '../BookDetail/BookReducer';
import * as clientExternal from "../clientExternal";
import no_cover from "../../no_cover.png";
import { extractOLID } from "../../Search";
import { setAuthorKey } from "../Profile/OLAuthorReducer";
import { TransitionProps } from '@mui/material/transitions';
import { addFavorite, removeFavorite } from '../Users/userReducer';
import * as userClient from "../Users/client"
import { User } from "../Users/client"


interface Book {
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

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




function BookShelf({ genre }: { genre: string }) {
    // console.log(genre)


    const user = useSelector((state: userState) => state.userReducer.user);

    // useCurrentUser()
    console.log("we start here")
    // console.log("user parma", user)
    // console.log("user BOOKSHELF", Currentuser)

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const book = useSelector((state: bookState) => state.bookReducer.book);

    const [open, setOpen] = React.useState(false);


    // navigate to book detail page and pass in key for book
    const bookDetailPage = (bookItem: Book) => {
        if (genre === 'Daily Trending') {
            dispatch(setBook({
                ...book,
                author_key: bookItem.author_key,
                author_name: bookItem.author_name,
                cover_edition_key: bookItem.cover_edition_key,
                key: bookItem.key,
                title: bookItem.title
            }));

            navigate(`/Bookazon/BookDetail/${extractOLID(bookItem.key)}`);

        } else {
            dispatch(setBook({
                ...book,
                author_key: bookItem.author_key,
                author_name: bookItem.author_name,
                cover_edition_key: bookItem.cover_edition_key,
                key: bookItem.key,
                title: bookItem.title
            }))

            navigate(`/Bookazon/BookDetail/${extractOLID(bookItem.key)}`)
        }

    };

    // navigate to author profil page and pass in author key
    const authorDetail = (authorID: any) => {
        dispatch(setAuthorKey({ author_key: authorID }));
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
            // console.log(response.docs);
            setBooks(response.docs || []);
        }
    }





    // const handleFavoriteClick = async (book: any) => {
    //     const olid = extractOLID(book);

    //     if (user && olid) {
    //         console.log(user)

    //         dispatch(addFavorite(olid));
    //         setUser({ ...user, favoriteBook: [...user.favoriteBook, olid] });  // Optimistic updat

    //         try {
    //             console.log("the following user is being passed: ", user)
    //             // const status = await userClient.updateUser(user); // Perform the async update
    //             console.log('User updated successfully:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //             console.log('THIS COMES AFTER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //         } catch (error) {
    //             console.error('Failed to update user:', error);
    //         }
    //     } else {
    //         console.error("Invalid book key, unable to extract OLID.");
    //     }


    // };

    const handleTest = (book: any) => {
        const olid = extractOLID(book);

        if (user && olid) {


            dispatch(addFavorite(olid));
            console.log(user)
            const handleUodate = async () => {
                console.log("the following user is being passed: ", user)
                const status = await userClient.updateUser(user); // Perform the async update
                console.log('User updated successfully:!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.log('THIS COMES AFTER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

            }
        }
    };



    const handleRemoveFavorite = async (book: any) => {
        const olid = extractOLID(book);
        if (user && olid) {
            dispatch(removeFavorite(olid)); // Dispatch Redux action immediately
            try {
                const status = await userClient.updateUser(user); // Perform the async update
                console.log('User updated successfully:', status);
            } catch (error) {
                console.error('Failed to update user:', error);
            }
        } else {
            console.error("Invalid book key, unable to extract OLID.");
        }
    };








    const handleDialogOpen = () => {
        setOpen(true);  // Open the dialog
    };

    const handleDialogClose = () => {
        setOpen(false);  // Close the dialog
    };

    // navigate to author sign in page 
    const signIn = () => {
        setOpen(false);
        navigate(`/Bookazon/SignIn`)
    };





    useEffect(() => {
        if (genre === 'Favorites') {
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
    }, []);





    // used for the arrow clicks on the shelf
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    if (books.length === 0) {
        return <div>Loading</div>;
    }


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
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                        sx={{
                            [`& .${tabsClasses.indicator}`]: {
                                display: 'none', // This hides the indicator
                            },
                        }}

                    >

                        {books.map((item, index) => {
                            // Log each item to the console
                            // console.log("Book Item:", item);

                            return (
                                <Tab label={
                                    <Card sx={{ width: 250, height: '100%' }}>
                                        <CardActionArea onClick={() => bookDetailPage(item)} >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    maxHeight: 100,
                                                    objectFit: 'contain',
                                                    width: '100%'
                                                }}
                                                src={clientExternal.bookCoverUrl(item.cover_edition_key)}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = no_cover
                                                }}
                                                title={item.title}
                                            />
                                        </CardActionArea>

                                        <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                            <Box>
                                                <CardActionArea onClick={() => bookDetailPage(item)}>
                                                    <Typography variant='subtitle1' display="block" sx={{
                                                        whiteSpace: 'nowrap',
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

                                        {!user ? (
                                            <IconButton onClick={handleDialogOpen}>
                                                <FavoriteBorderIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton >
                                                {user.favoriteBook.includes(extractOLID(item.key)) ?
                                                    <FavoriteIcon sx={{ color: 'red' }} onClick={() => handleRemoveFavorite(item.key)} /> :
                                                    <FavoriteBorderIcon onClick={() => handleTest(item.key)} />
                                                }
                                            </IconButton>
                                        )}
                                    </Card>
                                } />
                            );
                        })}

                    </Tabs>
                </Box>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleDialogClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Sign in?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Need to be signed in to add books to favorits
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose}>Close</Button>
                        <Button onClick={signIn}>Sign in</Button>
                    </DialogActions>
                </Dialog>

            </Box>

        </div >
    );

}

export default BookShelf;