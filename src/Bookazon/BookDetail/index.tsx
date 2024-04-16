import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import * as clientExternal from "../clientExternal";
import {useEffect, useState} from "react";
import no_cover from "../../no_cover.png";

interface bookDetail {
    description: string
    title: string
    cover: string
}

function BookDetail() {
    const dispatch = useDispatch();
    const book = useSelector((state: bookState) => state.bookReducer.book);

    const [bookDetail, setBookDetail] = useState<bookDetail>();
    // const [bookRating, setBookRating] = useState();

    const fetchBookDetail = async (key: string) => {
        const result = await clientExternal.bookDetail(key);
        // const rating = await clientExternal.bookRating(key);
        setBookDetail(result);
        // setBookRating(rating);
    }

    useEffect(()=> {
        // @ts-ignore
        fetchBookDetail(book.key);
        // await clientExternal.bookDetail(book.key)
        console.log(bookDetail);
    }, [book.key])

    return (
        <div>
            {bookDetail && (
                <>
                    <h1>{bookDetail.title}</h1>
                    <h3>{book.author_name}</h3>
                    <h4>Local DB rating here...</h4>
                    <img
                        src={`https://covers.openlibrary.org/b/olid/${book.cover}-M.jpg?default=false`}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = no_cover}}
                    />
                    <p>{bookDetail.description}</p>
                    <button>Add to Favorite</button>
                    <button> Write a review</button>


                </>
                )}
        </div>
    )
}

export default BookDetail;