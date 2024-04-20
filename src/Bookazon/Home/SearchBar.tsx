
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
import { Link } from 'react-router-dom';



function SearchBar() {
    // temp search criteria list, can be changed
    const searchCriteria = [
        'All', 'Audiobooks', 'eboks', 'Textbooks', 'Kids', 'Romance', 'Ficton'
    ]
    const [criteria, setCriteria] = React.useState('All');

    const handleChange = (event: SelectChangeEvent) => {
        setCriteria(event.target.value as string);
    };

    return (
        <Box sx={{ flexGrow: 1, ml: 1 }}>
            <Grid container alignItems="center" sx={{ mt: 2 }}>
                <Grid item sx={{ mr: 2, display: { xs: 'none', sm: 'none', md: 'block' } }}>
                    <Link to="/Bookazon/Home"  style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h3">Bookazone</Typography>
                    </Link>
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
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {/* this needs to be able to navigate to the search page */}
                                    <IconButton aria-label="search" color='primary'>
                                        <SearchIcon />
                                    </IconButton>
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