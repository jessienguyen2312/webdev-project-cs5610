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

function Search() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<any>([]);
    const [resObjects, setResObject] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const fullTextSearch = async (query: string) => {
        const results = await clientExternal.fullTextBookSearch(query);
        setResult(results);
    }

    useEffect(() => {
        if (result && result.docs) {
            console.log(result.docs);
            setResObject(result.docs)
        }
    }, [result]);


    return(
        <div>
            <h1>Search </h1>
            <TextField variant="outlined" label="Search books" id="search-query" onChange={(e) => setQuery(e.target.value)} size="small"/>
            <Button variant="contained" size="large" onClick={() => fullTextSearch(query)}>Search</Button>

            <h1>{resObjects.length} result(s): </h1>
            {errorMessage && (
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            )}


            <Grid container spacing={2} justifySelf="center">

                    {resObjects.map((object: any) => (
                        <Grid item spacing={2}>
                            <Card sx={{ width: 400, maxHeight: 500 }}>

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
                                        {object.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {object.author_name}
                                    </Typography>
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