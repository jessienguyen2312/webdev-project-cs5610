
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import {setSearch} from "../../Search/SearchReducer";
import * as clientExternal from "../clientExternal";
import {useState} from "react";
import {setResult} from "../../Search/ResultReducer";



function SearchBar() {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: bookState) => state.searchReducer.search);

    // search criteria by title, author, subject, isbn
    const searchCriteria = [
        "Title/Fulltext", "Author", "Subject", "ISBN"
    ]
    const [criteria, setCriteria] = React.useState("Title/Fulltext");

    const handleChange = (event: SelectChangeEvent) => {
        setCriteria(event.target.value as string);
        dispatch(setSearch({...searchQuery, criteria: event.target.value}));
        console.log(searchQuery);
    };

    const [resObjects, setResObject] = useState<any>([]);
    const fullTextSearch = async (query: string) => {
        const object = await clientExternal.fullTextBookSearch(query);
        dispatch(setResult(object?.docs));

    }


    return (
        <Box sx={{ flexGrow: 1, ml:1 }}>
            <Grid container alignItems="center" sx={{ mt: 2 }}>
                <Grid item sx={{ mr: 2, display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    <h1>Bookazon</h1>
                </Grid>
                {/* Drop Down Menu */}
                <Grid item xs={1}>
                    <FormControl fullWidth>
                        <InputLabel id="search-criteria-label">Category</InputLabel>
                        <Select variant='filled'
                            labelId="search-criteria-label"
                            id="search-criteria"
                            value={criteria}
                            label="Category"
                            onChange={handleChange}
                        >
                            {searchCriteria.map((criteria) => (
                                <MenuItem key={criteria} value={criteria}>{criteria}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* search bar maybe change this to autocomplete */}
                <Grid item md={8} xs={10}>
                    <TextField
                        fullWidth
                        label="Search by Title, Author, Keyword, ISBN"
                        variant="outlined"
                        value={searchQuery.query}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearch({...searchQuery, query: event.target.value}))}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Link to={`/Bookazon/Search`}>
                                        <IconButton
                                            aria-label= "search"
                                            color='primary'
                                            onClick={() => fullTextSearch(searchQuery.query)}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </Link>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>


            </Grid>

        </Box>

    );
}
export default SearchBar;