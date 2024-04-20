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

function Search() {
    const searchQuery = useSelector((state: bookState) => state.searchReducer.search);
    console.log(searchQuery);

    const dispatch = useDispatch();


    const book = useSelector((state: bookState) => state.bookReducer.book);
    const result = useSelector((state: bookState) => state.resultReducer.result)

    const extractOLID = (input: string) => {
        const result = input.match(/OL.*$/);
        if (result !== null) {
            return result[0];
        }
    }


    return(
        <div>
            <h1>Search </h1>
            <SearchBar/>

            <h1>{result.length} result(s): </h1>


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
                                        <Link to={`/Bookazon/BookDetail${object.editions.docs[0].key}`} onClick={()=> dispatch(setBook({
                                            key: extractOLID(object.editions.docs[0].key),
                                            author_name: object.author_name[0],
                                            author_key: object.author_key,
                                            cover: object.cover_edition_key,
                                        }))}>
                                            {object.title}
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {object.author_name[0]}
                                    </Typography>
                                    {book.key}
                                </CardContent>
                                <CardActions>
                                    <Button size="small">See reviews</Button>
                                    <Button size="small">Write a review</Button>
                                </CardActions>
                            </Card>
                        </Grid>

                    ))}


            </Grid>




        </div>
    )
}

export default Search