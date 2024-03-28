import {useEffect, useState} from "react";
import {
    Alert,
    Button,
    List,
    ListItem,
    TextField,
    ListItemText
} from "@mui/material";
import image from "../no_cover.png"

function Search() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState();
    const [resObjects, setResObject] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const OPENLIB_API = "https://openlibrary.org/search.json?q=";
    const COVER_API = "https://covers.openlibrary.org/b/olid/";
    const processInput = async () => {
        const queryList = query.split(" ");
        const queryString = queryList.join("+");
        try {
            const res = await fetch(OPENLIB_API + queryString + "&limit=10");
            const data = await res.json();
            setResult(data)

        } catch (error: any) {
            setErrorMessage(error.response.data.message)
        }
    }

    useEffect(() => {
        // @ts-ignore
        if (result && result.docs) {
            // @ts-ignore
            // const resList = result.docs.map(doc => doc.cover_edition_key);
            // const filtered_covers = resList.filter((item: any) => item !== null && item !== undefined);

            const resList = result.docs;
            // @ts-ignore

            // const filtered_covers = resList.filter((item: any) => item !== null && item !== undefined);
            console.log(resList)
            setResObject(resList);
        }
    }, [result]);

    return(
        <div>
            <h1>Search </h1>
            <TextField variant="outlined" label="Search books" id="search-query" onChange={(e) => setQuery(e.target.value)} size="small"/>
            <Button variant="contained" size="large" onClick={processInput}>Search</Button>
            <h1>{resObjects.length} result(s) for {query}: </h1>
            {errorMessage && (
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            )}


            {resObjects.map((object: any) => (
                <List>
                    <ListItem sx={{border: "1px solid grey"}}>

                        <img src={COVER_API + object?.cover_edition_key + "-M.jpg?default=false"}
                             onError={(e) => (e.target as HTMLImageElement).src=image}
                             style={{width:200, height: 200}}
                        />
                        <ListItemText
                            primary={object.title}
                            secondary={object.author_name}
                        />

                    </ListItem>
                </List>
            ))}


        </div>
    )
}

export default Search