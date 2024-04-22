import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../BookDetail/BookReducer";
import resultReducer from "../../Search/ResultReducer";
import searchReducer from "../../Search/SearchReducer";
import userReducer from "../Users/userReducer";

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


export interface userState{
    userReducer: {
        user: any;
    }
};

const store = configureStore({
    reducer: {
        bookReducer,
        resultReducer,
        searchReducer,
        userReducer
    }
});

export default store;