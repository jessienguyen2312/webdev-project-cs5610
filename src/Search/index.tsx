import {useEffect, useState} from "react";
import {
    Alert,
    Button,
    List,
    ListItem,
    TextField,
    ListItemText, Card, CardContent, CardMedia, CardActions, Typography, Grid, Paper, ButtonBase
} from "@mui/material";
import no_cover from "../no_cover.png"
import * as clientExternal from "../../src/Bookazon/clientExternal";
import * as userClient from "../Bookazon/Users/client";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBook, resetBook} from "../Bookazon/BookDetail/BookReducer";
import {setResult, resetResult} from "./ResultReducer";
import {bookState} from "../Bookazon/store";
import SearchBar from "../Bookazon/Home/SearchBar";
import {setAuthorKey} from "../Bookazon/Profile/OLAuthorReducer";
import {setAuthors} from "./authorListReducer";
import Container from "@mui/material/Container";
import { styled } from '@mui/material/styles';


export const extractOLID = (input: string) => {
    const result = input.match(/OL.*$/);
    if (result !== null) {
        return result[0];
    }
}

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function Search() {
    const searchQuery = useSelector((state: bookState) => state.searchReducer.search);

    const dispatch = useDispatch();


    const book = useSelector((state: bookState) => state.bookReducer.book);
    const result = useSelector((state: bookState) => state.resultReducer.result)
    const OLAuthor = useSelector((state: bookState) => state.OLAuthorReducer.OLAuthor);
    const authorsList = useSelector((state: bookState) => state.authorListReducer.authors);

    const extractOLID = (input: string) => {
        const result = input.match(/OL.*$/);
        if (result !== null) {
            return result[0];
        }
    }

    // load all authors here into a dictionary, if an author id is in the dictionary, display result


    useEffect(() => {
        const loadAllAuthors = async () => {
            const authorsList = await userClient.findAllAuthors();
            if (authorsList) {
                const authorsDictionary: {[key: string] : string} = {};
                for (const author of authorsList) {
                    const {username, OL_author_key} = author;
                    authorsDictionary[OL_author_key] = username;
                }
                dispatch(setAuthors(authorsDictionary));
                console.log(authorsDictionary);
            }

        }
        loadAllAuthors();
    }, [dispatch])


    return(
        <Container>

            <Typography variant="h3">{result.length} result(s) found: </Typography>

            {searchQuery.criteria === 'Author' && result && (
                <Grid container spacing={2} justifySelf="center">
                    {result.map((object: any) => (
                        <Grid item spacing={2} xs={4}>
                            <Card sx={{ width: 300, maxHeight: 400 }} key={object.key}>
                                <CardMedia
                                    sx={{height: 200}}
                                    src={clientExternal.authorPhotoUrl(object.key)}
                                    component="img"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = no_cover}
                                    }
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div" sx={{textDecoration: 'none'}}>
                                        <Link to={`/Bookazon/Profile/OlAuthorProfile`} onClick={() => {
                                            dispatch(setAuthorKey({author_key: object.key}));
                                            console.log(OLAuthor);
                                        }}>
                                            {object.name}
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Top work: {object.top_work === undefined? 'No work found' : object.top_work} <br/>
                                        Work count: {object.work_count}
                                    </Typography>
                                </CardContent>
                                {object.key in authorsList && (
                                    <CardActions>
                                        <Link to={`/Bookazon/Profile/${authorsList[object.key]}`}>
                                            <Button size="small" variant="contained" style={{backgroundColor: "#EF8D40"}}>View Author's Bookazon Profile</Button>
                                        </Link>
                                    </CardActions>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {searchQuery.criteria !== 'Author' && result && result.type !== 'author' && (
                <Grid container spacing={2} justifySelf="center">
                    {result.map((object: any) => (
                        <Grid item spacing={2} xs={12} sm={6} md={4} lg={4} xl={4}>
                            <Card sx={{ width: 300}} key={object.key}>
                                <CardMedia
                                    sx={{height: 200}}
                                    src={clientExternal.bookCoverUrl(object.cover_edition_key)}
                                    component="img"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = no_cover}
                                    }
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <Link style={{textDecoration: "none", color: "#222C4E"}} to={`/Bookazon/BookDetail/${extractOLID(object.key)}`} onClick={()=> dispatch(setBook({...book,
                                            key: object.key,
                                            author_name: object.author_name,
                                            author_key: object.author_key,
                                            cover_edition_key: object.cover_edition_key,
                                            title: object.title
                                        }))}>
                                            {object.title}
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {object.author_name.map((name: string) => (
                                            <h6>{name}</h6>
                                        ))}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/Bookazon/BookDetail/${extractOLID(object.key)}/reviews`}>
                                        <Button size="small" variant="contained" style={{backgroundColor: "#EF8D40"}}>Reviews</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}



        </Container>
    )
}

export default Search