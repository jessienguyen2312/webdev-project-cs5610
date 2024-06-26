import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import * as clientExternal from "../clientExternal";
import {useEffect, useState} from "react";
import no_cover from "../../no_cover.png";
import Button from "@mui/material/Button";
import {Container, Divider, Grid, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {setAuthorKey} from "../Profile/OLAuthorReducer";
import {setBook} from "./BookReducer";
import {bookCoverUrl, bookCoverUrUniversal} from "../clientExternal";
import { extractOLID } from "../../Search";



interface bookDetail {
    description: string
    title: string
    cover: string
}

function BookDetail() {

    const dispatch = useDispatch();
    const book = useSelector((state: bookState) => state.bookReducer.book);

    const navigate = useNavigate();


    const fetchBookDetail = async (key: string) => {
        const synopsis = await clientExternal.bookDetail(key);
        const cover_image = await clientExternal.bookCoverUrUniversal(book.cover_edition_key, "M");

        if (synopsis) {

            dispatch(setBook({
                ...book,
                description: synopsis.description ? (typeof synopsis.description === "string" ? synopsis.description : synopsis.description.value) : "No synopsis found",
                cover_image_url: cover_image || no_cover
            }))

            console.log(book);
        }

    }

    const authorDetail = (authorID: any) => {
        dispatch(setAuthorKey({author_key: authorID}));
        navigate(`/Bookazon/Profile/OlAuthorProfile`);
    };

    useEffect(()=> {
        // @ts-ignore
        fetchBookDetail(book.key);
    }, [book.key, dispatch])

    return (
        <>
            {book && (
                <Container maxWidth={false} sx={{marginTop: 2, display: 'block', justifyContent: 'center', alignItems: 'center', height: "100%", minHeight: '10vh', backgroundColor: '#F4EEE7', p: 1}}>
                    <Paper elevation={3} sx={{ mx: 'auto', mt: '2rem', p: 2, minWidth: '250px', maxWidth: '800px', borderRadius: '5px', bgcolor: 'background.paper' }}>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                        <Typography sx={{color: '#222C4E'}} variant="h3">{book.title}</Typography>
                        <Typography sx={{color: '#222C4E'}} display='inline' variant="subtitle2">By   </Typography>
                        {book.author_name?.map((name: string, index: number) => (
                            <Typography display='inline' key={index} variant="subtitle2"
                                        onClick={() => authorDetail(book.author_key[index])}
                                        sx={{"&:hover": {color: "#F1A467"}}}>
                                | {name} |
                            </Typography>
                        ))}
                        <br/>
                        <Box
                            component="img"
                            src={book.cover_image_url}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = no_cover}}
                            display = 'block'
                        />

                        <Link to={`/Bookazon/BookDetail/${extractOLID(book.key)}/reviews`} >
                            <Button variant="contained" sx = {{
                                mt: 1,
                                marginTop: 2, 
                                color: "#FFFFFF",
                                backgroundColor: '#EF8D40',
                                '&:hover': {
                                backgroundColor: '#F1A467'
                                }
                                }}>

                                Reviews
                            </Button>
                        </Link>
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{ mx: 'auto', mt: '2rem', p: 2, minWidth: '250px', maxWidth: '800px', borderRadius: '5px', bgcolor: 'background.paper' }}>
                        <Typography variant="h4" sx={{color: '#222C4E'}}>Synopsis:</Typography>
                        <Divider component={"h1"} sx={{background: "#222C4E", borderBottomWidth: "2px"}}/>
                        <Typography variant="subtitle2" sx={{mt: 2, color: '#222C4E'}}>{book.description}</Typography>

                    </Paper>
                </Container>
            )}
        </>



    )
}

export default BookDetail;