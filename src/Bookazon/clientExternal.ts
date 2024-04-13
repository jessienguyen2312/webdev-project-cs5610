import axios from "axios";
import no_cover from "../no_cover.png"
const OPENLIB_API = "https://openlibrary.org/search.json?q=";
const COVER_API = "https://covers.openlibrary.org/b/olid";
const AUTHOR_SEARCH_API = "https://openlibrary.org/search/authors.json?q="
const AUTHORS_PAGE_API = "https://openlibrary.org/authors"
const AUTHOR_PHOTO_API = "https://covers.openlibrary.org/a/olid"

//TODO: search by ISBN, author, search for authors

/**
 * Function to fetch result of book search using full text. Each query string will be split
 * by white space, and "+" is added between each word. The result is currently limited
 * to 10 pages because of API throttling.
 * https://openlibrary.org/dev/docs/api/search
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
 * https://openlibrary.org/dev/docs/api/covers
 * @param book
 */
export const bookCoverUrl = (book: any) => {
    try {
        return `${COVER_API}/${book?.cover_edition_key}-M.jpg?default=false`;
    } catch (error: any) {
        return no_cover;
    }
}

/**
 * Function to fetch a list of authors by name (will return multiple authors)
 * https://openlibrary.org/dev/docs/api/authors
 * @param name: name of author, separated by space
 */
export const searchAuthorsByName = async (name: string) => {
    const queryList = name.split(" ");
    const queryString = queryList.join("%");
    try {
        const response = await axios.get(`${AUTHOR_SEARCH_API}/${queryString}`);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

/**
 * Function to fetch a list of books by a specific authorId, this data is retrieved by selecting the "key"
 * field from the returned result from the function searchAuthorsByName like so: result.key. The authorId
 * has the format "OL#####A". The book can be viewed in detail by selecting the field key
 * https://openlibrary.org/dev/docs/api/authors
 * @param authorId
 */
export const searchBooksByAuthors = async (authorId: string) => {
    try {
        const response = await axios.get(`${AUTHORS_PAGE_API}/${authorId}/works.json`);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

/**
 * Function to fetch a specific author's bio, which includes personal_name, bio, birth_date.
 * https://openlibrary.org/dev/docs/api/authors
 * @param authorId
 */
export const fetchSpecificAuthorPage = async (authorId: string) => {
    try {
        const response = await axios.get(`${AUTHORS_PAGE_API}/${authorId}.json`);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

/**
 * Function to fetch the author's cover image by their authorId.
 * https://openlibrary.org/dev/docs/api/covers
 * @param authorId
 */
export const authorPhotoUrl = async (authorId: string) => {
    try {
        const response = await axios.get(`${AUTHOR_PHOTO_API}/${authorId}-M.jpg`);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}



