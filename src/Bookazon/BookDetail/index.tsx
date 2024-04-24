import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import * as clientExternal from "../clientExternal";
import {useEffect, useState} from "react";
import no_cover from "../../no_cover.png";
import Button from "@mui/material/Button";
import { Container, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {setAuthorKey} from "../Profile/OLAuthorReducer";
import {setBook} from "./BookReducer";
import {bookCoverUrl} from "../clientExternal";


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

        if (synopsis) {
            const cover_image = await clientExternal.bookCoverUrl(book.cover_edition_key);

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

        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
        <Grid container spacing={0}>
            <Grid item xl={2}>
                <Container maxWidth={false} sx={{height: "100%", backgroundColor: '#5D6BA0 '}}>
                </Container>
            </Grid>
            <Grid item xl={8}>
               
            {book && (
                <>  
                    <Container  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
                    <h1>{book.title}</h1>
                    </Container>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>


                        <Box>
                            {book.author_name?.map((name: string, index: number) => (
                                <Typography key={index} variant="h3" onClick={() => authorDetail(book.author_key[index])}>
                                    {name}
                                </Typography>
                            ))}
                        </Box>

                    </Container>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
                    <img
                        src={book.cover_image_url}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = no_cover}}
                    />
                    </Container>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                    <Container maxWidth="sm">
                    <h4>Synopsis</h4>
                    {book.description}
                    <br/>
                    </Container>
                    </Container>
                    <Container  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to={`/Bookazon/BookDetail/${book.key}/reviews`}>
                        <Button variant="contained">
                            Reviews
                        </Button>
                    </Link>
                    </Container>
                </>
                )}
               
            </Grid>
            <Grid item xl={2}>
            <Container maxWidth={false} sx={{height: "100%", backgroundColor: '#5D6BA0 '}}>
                </Container>
            </Grid>
        </Grid>
        </Container>
    )
}

export default BookDetail;