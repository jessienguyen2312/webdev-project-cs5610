import {configureStore} from "@reduxjs/toolkit";
import bookReducer from "../BookDetail/BookReducer";

export interface bookState {
    bookReducer: {
      book: any;
    };
}

const store = configureStore({
    reducer: {
        bookReducer
    }
});

export default store;