import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    book: {
        key: "",
        author_name: "",
        author_key: "",
        cover: "",
    }
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBook: (state, action) => {
            state.book = action.payload;
        },
        resetBook: (state) => {
            state.book = initialState.book;
        }
    }
});

export const { setBook, resetBook } = bookSlice.actions;
export default bookSlice.reducer;