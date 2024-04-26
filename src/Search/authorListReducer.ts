import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    authors: {}
};

const authorsSlice = createSlice({
    name: "authors",
    initialState,
    reducers: {
        setAuthors: (state, action) => {
            state.authors = action.payload;
        },
        resetAuthors: (state) => {
            state.authors = initialState.authors;
        }
    }
});

export const {setAuthors, resetAuthors} = authorsSlice.actions;
export default authorsSlice.reducer;