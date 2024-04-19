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
import {bookState} from "../Bookazon/store";

function Search() {
    // grab query
    const [query, setQuery] = useState("");
    // result of search
    const [result, setResult] = useState<any>([]);
    const [resObjects, setResObject] = useState([]);

    const dispatch = useDispatch();

    const fullTextSearch = async (query: string) => {
        const results = await clientExternal.fullTextBookSearch(query);
        setResult(results);
    }

    useEffect(() => {
        if (result && result.docs) {
            console.log(result.docs.slice(1));
            setResObject(result.docs.slice(1))
        }
    }, [result]);

    const book = useSelector((state: bookState) => state.bookReducer.book);


    return(
        <div>
            <h1>Search </h1>
            <TextField variant="outlined" label="Search books" id="search-query" onChange={(e) => setQuery(e.target.value)} size="small"/>
            <Button variant="contained" size="large" onClick={() => fullTextSearch(query)}>Search</Button>

            <h1>{resObjects.length} result(s): </h1>


            <Grid container spacing={2} justifySelf="center">
                    {resObjects.map((object: any) => (
                        <Grid item spacing={2}>
                            <Card sx={{ width: 400, maxHeight: 500 }} key={object.key}>

                                <CardMedia
                                    sx={{height: 300}}
                                    src={clientExternal.bookCoverUrl(object)}
                                    component="img"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = no_cover}
                                    }
                                />

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        <Link to={`/Bookazon/BookDetail/${object.edition_key[0]}`} onClick={()=> dispatch(setBook({
                                            key: object.edition_key[0],
                                            author_name: object.author_name,
                                            author_key: object.author_key,
                                            cover: object.cover_edition_key,
                                        }))}>
                                            {object.title}
                                        </Link>
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {object.author_name}
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