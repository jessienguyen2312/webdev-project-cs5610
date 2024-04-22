import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    search: {
        criteria: "Title",
        query: ""
    }
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        resetSearch: (state) => {
            state.search = initialState.search;
        }
    }
});

export const {setSearch, resetSearch} = searchSlice.actions;
export default searchSlice.reducer;