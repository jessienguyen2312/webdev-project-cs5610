
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, IconButton, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import {setSearch} from "../../Search/SearchReducer";
import * as clientExternal from "../clientExternal";
import {useState} from "react";
import {resetResult, setResult} from "../../Search/ResultReducer";
import {setBook} from "../BookDetail/BookReducer";
import {extractOLID} from "../../Search";
import {titleTextBookSearch} from "../clientExternal";



function SearchBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: bookState) => state.searchReducer.search);
    console.log(searchQuery);
    const result = useSelector((state: bookState) => state.resultReducer.result);

    // search criteria by title, author, subject, isbn
    const searchCriteria = [
        "Title", "Author", "Subject", "ISBN"
    ]

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setSearch({...searchQuery, criteria: event.target.value}));
        dispatch(resetResult(result));
        console.log(searchQuery);
    };

    const OpenLibrarySearch = async (query: string) => {
        switch (searchQuery.criteria) {
            // This returns a list of books
            case 'Title': {
                const object = await clientExternal.titleTextBookSearch(query);
                dispatch(setResult(object?.docs));
                break;
            }
            // This returns a list of authors
            case 'Author': {
                const object = await clientExternal.searchAuthorsByName(query);
                dispatch(setResult(object?.docs));
                break;
            }
            // This returns a list of books
            case 'Subject': {
                const object = await clientExternal.subjectTextBookSearch(query)
                dispatch(setResult(object?.docs));
                break;
            }
            case 'ISBN': {
                // This directs straight to the book detail page
                const object = await clientExternal.isbnSearch(query);
                console.log(object);
                dispatch(setBook({
                    key: extractOLID(object.key),
                    author_key: object.authors,
                    work_key: object.works[0].key
                }));
                navigate(`/Bookazon/BookDetail/${extractOLID(object.key)}`);
                break;
            }
            default: {
                const object = await clientExternal.titleTextBookSearch(query);
                dispatch(setResult(object?.docs));
                break;

            }


        }



    }


    return (
        <Box sx={{ flexGrow: 1, ml: 1 }}>
            <Grid container alignItems="center" sx={{ mt: 2 }}>
                <Grid item sx={{ mr: 2, display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    <Link to="/Bookazon/Home"  style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h3">Bookazon</Typography>
                    </Link>
                </Grid>
                {/* Drop Down Menu */}
                <Grid item xs={1}>
                    <FormControl fullWidth>
                        <InputLabel id="search-criteria-label">Category</InputLabel>
                        <Select variant='filled'
                            labelId="search-criteria-label"
                            id="search-criteria"
                            value={searchQuery.criteria}
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
                        label="Search by Title, Author, Subject, ISBN"
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
                                            onClick={() => OpenLibrarySearch(searchQuery.query)}
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