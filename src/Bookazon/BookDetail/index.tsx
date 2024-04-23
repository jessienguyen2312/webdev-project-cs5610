import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import * as clientExternal from "../clientExternal";
import {useEffect, useState} from "react";
import no_cover from "../../no_cover.png";
import {bookDetailBookey} from "../clientExternal";
import Button from "@mui/material/Button";

interface bookDetail {
    description: string
    title: string
    cover: string
}

//TODO: Add link to the button to navigate to review page

function BookDetail() {
    const dispatch = useDispatch();
    const book = useSelector((state: bookState) => state.bookReducer.book);
    // console.log(book)

    const [bookDetail, setBookDetail] = useState<bookDetail>();

    const fetchBookDetail = async (key: string, work_key: string) => {
        const result = await clientExternal.bookDetailBookey(key);
        const synopsis = await clientExternal.bookSynopsis(work_key);
        console.log(synopsis);
        setBookDetail({...result, description: synopsis.description?.value === undefined? synopsis.description : synopsis.description?.value});
        console.log(bookDetail);
    }

    useEffect(()=> {
        // @ts-ignore
        fetchBookDetail(book.key, book.work_key);
        console.log(bookDetail);
    }, [book.cover])

    return (
        <div>
            {bookDetail && (
                <>
                    <h1>{bookDetail.title}</h1>
                    <h3>{book.author_name}</h3>
                    <img
                        src={`https://covers.openlibrary.org/b/olid/${book.key}-M.jpg?default=false`}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = no_cover}}
                    />
                    <h4>Synopsis</h4>
                    {bookDetail.description ? bookDetail.description : "No synopsis found"}
                    <br/>

                    <Button variant="contained">Reviews</Button>

                </>
                )}
        </div>
    )
}

export default BookDetail;