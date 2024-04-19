import {configureStore} from "@reduxjs/toolkit";
import bookReducer from "../BookDetail/BookReducer";
import resultReducer from "../../Search/ResultReducer";

export interface bookState {
    bookReducer: {
      book: any;
    };

    resultReducer: {
        result: any;
    }
}

const store = configureStore({
    reducer: {
        bookReducer,
        resultReducer
    }
});

export default store;