import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import * as clientExternal from "../clientExternal";
import {useEffect, useState} from "react";

function BookDetail() {
    const dispatch = useDispatch();
    const book = useSelector((state: bookState) => state.bookReducer.book);

    const [bookDetail, setBookDetail] = useState();
    // const [bookRating, setBookRating] = useState();

    const fetchBookDetail = async (key: string) => {
        await clientExternal.bookDetail(key);
        // const rating = await clientExternal.bookRating(key);
        // setBookDetail(results);
        // setBookRating(rating);
    }

    useEffect(()=> {
        // @ts-ignore
        fetchBookDetail(book.key).then((book) => setBookDetail(book));
        console.log(bookDetail);
    })

    return (
        <div>
            <h1>Book detail</h1>
            {JSON.stringify(bookDetail)}
        </div>
    )
}

export default BookDetail;