import {useEffect, useState} from "react";
import {Alert, Button, ImageList, ImageListItem, List, ListItem, TextField} from "@mui/material";
import image from "../logo192.png"

function Search() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState();
    const [covers, setCover] = useState([]);
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
            // @ts-ignore
            // const covers = result.docs.map(doc => doc.cover_edition_key);
            // const filtered_covers = covers.filter((item: any) => item !== null && item !== undefined);
            // setCover(filtered_covers);
            // console.log(filtered_covers)

        } catch (error: any) {
            setErrorMessage(error.response.data.message)
        }

    }

    useEffect(() => {
        // @ts-ignore
        if (result && result.docs) {
            // @ts-ignore
            const covers = result.docs.map(doc => doc.cover_edition_key);
            const filtered_covers = covers.filter((item: any) => item !== null && item !== undefined);
            setCover(filtered_covers);
        }
    }, [result]);

    return(
        <div>
            <h1>Search </h1>
            <TextField variant="outlined" label="Search books" id="search-query" onChange={(e) => setQuery(e.target.value)} size="small"/>
            <Button variant="contained" size="large" onClick={processInput}>Search</Button>
            <h1>Result: {covers.length}</h1>
            {errorMessage && (
                <Alert severity="error">
                    {errorMessage}
                </Alert>
            )}


            {covers.map((cover) => (
                <List>
                    <ListItem>
                        <img
                            src={COVER_API + cover + "-M.jpg?default=false"}
                        />
                    </ListItem>
                </List>
            ))}


        </div>
    )
}

export default Search