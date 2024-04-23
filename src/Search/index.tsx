import {useEffect, useState} from "react";
import {
    Alert,
    Button,
    List,
    ListItem,
    TextField,
    ListItemText, Card, CardContent, CardMedia, CardActions, Typography, Grid
} from "@mui/material";
import no_cover from "../no_cover.png"
import * as clientExternal from "../../src/Bookazon/clientExternal";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setBook, resetBook} from "../Bookazon/BookDetail/BookReducer";
import {setResult, resetResult} from "./ResultReducer";
import {bookState} from "../Bookazon/store";
import SearchBar from "../Bookazon/Home/SearchBar";
import {setAuthorKey} from "../Bookazon/Profile/OLAuthorReducer";


export const extractOLID = (input: string) => {
    const result = input.match(/OL.*$/);
    if (result !== null) {
        return result[0];
    }
}

//TODO: Add link to the button to navigate to review page

function Search() {
    const searchQuery = useSelector((state: bookState) => state.searchReducer.search);

    const dispatch = useDispatch();


    const book = useSelector((state: bookState) => state.bookReducer.book);
    const result = useSelector((state: bookState) => state.resultReducer.result)
    const OLAuthor = useSelector((state: bookState) => state.OLAuthorReducer.OLAuthor);

    const extractOLID = (input: string) => {
        const result = input.match(/OL.*$/);
        if (result !== null) {
            return result[0];
        }
    }


    return(
        <div>
            {/*<SearchBar/>*/}
            <h1>{result.length} result(s): </h1>
            {/*display search result for authors*/}
            {searchQuery.criteria === 'Author' && result && (
                <Grid container spacing={2} justifySelf="center">
                    {result.map((object: any) => (
                        <Grid item spacing={2}>
                            <Card sx={{ width: 400, maxHeight: 500 }} key={object.key}>
                                <CardMedia
                                    sx={{height: 300}}
                                    src={clientExternal.authorPhotoUrl(object.key)}
                                    component="img"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = no_cover}
                                    }
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
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
                                <CardActions>
                                    <Button size="small">View Bookazon Profile</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {searchQuery.criteria !== 'Author' && result && result.type !== 'author' && (
                <Grid container spacing={2} justifySelf="center">
                    {result.map((object: any) => (
                        <Grid item spacing={2}>
                            <Card sx={{ width: 400, maxHeight: 500 }} key={object.key}>
                                <CardMedia
                                    sx={{height: 300}}
                                    src={clientExternal.bookCoverUrl(extractOLID(object.editions.docs[0].key))}
                                    component="img"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = no_cover}
                                    }
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <Link style={{textDecoration: "none", color: "#222C4E"}} to={`/Bookazon/BookDetail/${extractOLID(object.editions.docs[0].key)}`} onClick={()=> dispatch(setBook({
                                            key: extractOLID(object.editions.docs[0].key),
                                            author_name: object.author_name,
                                            author_key: object.author_key,
                                            cover: object.cover_edition_key,
                                            work_key: object.key
                                        }))}>
                                            {object.title}
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {object.author_name[0]}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/Bookazon/BookDetail/${book.key}/reviews`}>
                                        <Button size="small" variant="contained" style={{backgroundColor: "#EF8D40"}}>Reviews</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}



        </div>
    )
}

export default Search