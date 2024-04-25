import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    book: {
        author_key: [],
        author_name: [],
        cover_edition_key: "",
        cover_image_url: "",
        cover_id: "",
        key: "",
        title: "",
        description: ""
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