import axios from "axios";
import no_cover from "../no_cover.png"

const OPENLIB_API = "https://openlibrary.org/search.json?q=";
const TITLE_SEARCH_API = "https://openlibrary.org/search.json?title="
const SUBJECT_SEARCH_API = "https://openlibrary.org/search.json?subject="
const ISBN_SEARCH_API = "https://openlibrary.org/isbn/"
const COVER_API = "https://covers.openlibrary.org/b/olid";
const AUTHOR_SEARCH_API = "https://openlibrary.org/search/authors.json?q="
const AUTHORS_PAGE_API = "https://openlibrary.org/authors"
const AUTHOR_PHOTO_API = "https://covers.openlibrary.org/a/olid"

const BOOK_DETAIL_API = "https://openlibrary.org"


// CONST FOR DEBUGGING PURPOSE
const LIMIT_PAGE = "&limit=10"
const LIMIT_PAGE_AUTHOR = "&limit=20"

//TODO: search by ISBN, author, search for authors

/**
 * Function to process query string by separating it by "+".
 * @param text
 */
const stringQueryProcess = (text: string) => {
    const queryList = text.split(" ");
    return queryList.join("+");
}

/**
 * Function to fetch book ratings on OpenLibrary.
 * A sample book rating can be seen here: https://openlibrary.org/works/OL18020194W/ratings.json
 * @param key format "/work/OL#####W"
 */
export const bookRating = async (key: string) => {
    try {
        const response = await axios.get(`${BOOK_DETAIL_API}${key}/ratings.json`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

/**
 * Function to fetch book detail by book key with the format "/book/OL#####M".
 * Book detail consists of title, author, synopsis
 * A sample book detail can be seen here: https://openlibrary.org/books/OL20930632M.json
 * @param key format "/work/OL#####M"
 */
export const bookDetailBookey = async (key: String) => {
    try {
        const response = await axios.get(`${BOOK_DETAIL_API}/books/${key}.json`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}


/**
 * Function to fetch book detail by work key with the format "/work/OL#####W".
 * Book detail consists of title, author, synopsis
 * A sample book detail can be seen here: https://openlibrary.org/works/OL45804W.json
 * @param key format "/work/OL#####W"
 */
export const bookDetail = async (key: String) => {
    try {
        const response = await axios.get(`${BOOK_DETAIL_API}${key}.json`);
        console.log(response.data);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}

/**
 * Function to fetch result of a specific book by ISBN. The search result will
 * redirect to the book detail API with the following
 * URL format https://openlibrary.org/books/OL7353617M.json
 * OL7353617M is an example of the primary key for all books.
 * @param isbn can be 10 or 13 digit format.
 */
export const isbnSearch = async (isbn: string) => {
    if (isbn.length === 10 || isbn.length === 13) {
        try {
            const response = await axios.get(`${ISBN_SEARCH_API}${isbn}.json`);
            return response.data;
        } catch (error: any) {
            console.log(error);
        }
    } else {
        throw new Error("isbn has to be 10 or 13 digits format");
    }
}


/**
 * Function to fetch result of search by subject/genre. Each query string will be split
 * by white space, and "+" is added between each word. The result is currently limited
 * to 10 pages because of API throttling.
 * @param text
 */
export const subjectTextBookSearch = async (text: string) => {
    const queryString = stringQueryProcess(text);
    try {
        const response = await axios.get(`${SUBJECT_SEARCH_API}${queryString}&fields=key,title,author_name,editions,author_key${LIMIT_PAGE}&language=eng`);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}


/**
 * Function to fetch result of search specifically by book title. Each query string will be split
 * by white space, and "+" is added between each word. The result is currently limited
 * to 10 pages because of API throttling.
 * @param text
 */
export const titleTextBookSearch = async (text: string) => {
    const queryString = stringQueryProcess(text);
    try {
        const response = await axios.get(`${TITLE_SEARCH_API}${queryString}&fields=key,title,author_name,editions,author_key${LIMIT_PAGE}&language=eng`);
        return response.data;
    } catch (error: any) {
        console.log(error);
    }
}


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
        const response = await axios.get(`${OPENLIB_API}${queryString}&fields=key,title,author_name,editions,author_key${LIMIT_PAGE}&language=eng`);
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
        return `${COVER_API}/${book}-M.jpg?default=false`;
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
    const queryString = queryList.join("+");
    try {
        const response = await axios.get(`${AUTHOR_SEARCH_API}/${queryString}&fields=key,name,top_work,work_count,type${LIMIT_PAGE_AUTHOR}`);
        console.log(`${AUTHOR_SEARCH_API}/${queryString}&fields=key,name,top_work,work_count${LIMIT_PAGE_AUTHOR}`)
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
export const authorPhotoUrl = (authorId: any) => {
    try {
        // const response = await axios.get(`${AUTHOR_PHOTO_API}/${authorId}-M.jpg`);
        // return response.data;
        return `${AUTHOR_PHOTO_API}/${authorId}-M.jpg?default=false`
    } catch (error: any) {
        return no_cover;
    }
}



