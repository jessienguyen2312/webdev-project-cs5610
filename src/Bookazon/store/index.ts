import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../BookDetail/BookReducer";
import resultReducer from "../../Search/ResultReducer";
import searchReducer from "../../Search/SearchReducer";
import OLAuthorReducer from "../Profile/OLAuthorReducer";
import userReducer from "../Users/userReducer";
import authorListReducer from "../../Search/authorListReducer";

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

    OLAuthorReducer: {
        OLAuthor: any;
    }

    authorListReducer: {
        authors: any;
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
        userReducer,
        OLAuthorReducer,
        authorListReducer
    }
});

export default store;