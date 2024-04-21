import {configureStore} from "@reduxjs/toolkit";
import bookReducer from "../BookDetail/BookReducer";
import resultReducer from "../../Search/ResultReducer";
import searchReducer from "../../Search/SearchReducer";

export interface bookState {
    bookReducer: {
      book: any;
    };

    resultReducer: {
        result: any;
    };

    searchReducer: {
        search: any;
    }
}

const store = configureStore({
    reducer: {
        bookReducer,
        resultReducer,
        searchReducer
    }
});

export default store;