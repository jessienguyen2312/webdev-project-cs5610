import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import * as clientExternal from "../clientExternal";
import {useEffect, useState} from "react";
import no_cover from "../../no_cover.png";
import {bookDetailBookey} from "../clientExternal";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

interface bookDetail {
    description: string
    title: string
    cover: string
}

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
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
                    <h3>{book.author_name}</h3>
                    </Container>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '10vh' }}>
                    <img
                        src={`https://covers.openlibrary.org/b/olid/${book.key}-M.jpg?default=false`}
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = no_cover}}
                    />
                    </Container>
                    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}> 
                    <Container maxWidth="sm" sx={{ height: "100vh" }}>
                    <h4>Synopsis</h4>
                    {bookDetail.description ? bookDetail.description : "No synopsis found"}
                    <br/>
                    </Container>
                    </Container>


                    <Link to={`/Bookazon/BookDetail/${book.key}/reviews`}>
                        <Button variant="contained">
                            Reviews
                        </Button>
                    </Link>


                </>
                )}
        </div>
    )
}

export default BookDetail;