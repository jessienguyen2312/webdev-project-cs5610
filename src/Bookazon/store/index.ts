import {configureStore} from "@reduxjs/toolkit";
import bookReducer from "../BookDetail/BookReducer";
import resultReducer from "../../Search/ResultReducer";
import searchReducer from "../../Search/SearchReducer";
import OLAuthorReducer from "../Profile/OLAuthorReducer";

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
}

const store = configureStore({
    reducer: {
        bookReducer,
        resultReducer,
        searchReducer,
        OLAuthorReducer
    }
});

export default store;