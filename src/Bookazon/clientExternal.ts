import axios from "axios";
import no_cover from "../no_cover.png"
const OPENLIB_API = "https://openlibrary.org/search.json?q=";
const COVER_API = "https://covers.openlibrary.org/b/olid";

//TODO: search by ISBN, author

/**
 * Function to fetch result of book search using full text. Each query string will be split
 * by white space, and "+" is added between each word. The result is currently limited
 * to 10 pages because of API throttling.
 * @param text: query string.
 */
export const fullTextBookSearch = async (text: string) => {
    const queryList = text.split(" ");
    const queryString = queryList.join("+");
    try {
        const response = await axios.get(`${OPENLIB_API}/${queryString}/&limit=10`);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

/**
 * Function to fetch the result of book cover from the book search result. If a book
 * cannot be found, it will return an 404 error.
 * @param book
 */
export const bookCoverUrl = (book: any) => {
    try {
        return `${COVER_API}/${book?.cover_edition_key}-M.jpg?default=false`;
    } catch (error: any) {
        return no_cover;
    }
}

