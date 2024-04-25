import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import {useEffect} from "react";
import * as clientExternal from "../clientExternal";
import {setAuthorKey, setAuthorProfile, setAuthorWorks} from "./OLAuthorReducer";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import no_cover from "../../no_cover.png";
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {extractOLID} from "../../Search";
import {resetBook, setBook} from "../BookDetail/BookReducer";
function OLAuthorProfile() {
    const OLAuthor = useSelector((state: bookState) => state.OLAuthorReducer.OLAuthor);
    const book = useSelector((state: bookState) => state.bookReducer.book);
    console.log(OLAuthor);
    const dispatch = useDispatch();

    const fetchAuthorDetail = async (authorId: string) => {
        const authorProfile = await clientExternal.fetchSpecificAuthorPage(authorId);
        const authorWorks = await clientExternal.searchBooksByAuthors(authorId);
        dispatch(setAuthorProfile(
            {...OLAuthor,
                author_name: authorProfile.name,
                author_dob: authorProfile.birth_date,
                author_bio: authorProfile.bio ? (typeof authorProfile.bio === "string"? authorProfile.bio : authorProfile.bio.value) : "No bio found",
                author_works: authorWorks.entries}));

        console.log(OLAuthor)
    }

    // function to fetch book details for the book detail page
    const fetchInfoForBookDetail = async (work: any) => {
        //reset book state
        dispatch(resetBook(book));
        // fetch author keys
        const authorsKeys: string[] = [];
        work.authors.forEach((author: any) => {
            // @ts-ignore
            authorsKeys.push(extractOLID(author.author.key));
        });
        // fetch author names from author keys
        const authorsNames: string[] = [];
        for (const author of authorsKeys) {
            authorsNames.push(await clientExternal.fetchAuthorName(author));
        }

        dispatch(setBook({
            ...book,
            title: work.title,
            key: work.key,
            author_key: authorsKeys,
            author_name: authorsNames,
            // cover_id: work.covers? work.covers[0] : "",
            cover_edition_key: work.covers? work.covers[0] : "",
        }))

        console.log(book)

    }

    useEffect(()=> {
        fetchAuthorDetail(OLAuthor.author_key)

    }, [OLAuthor.author_key, dispatch]);



    return(
        <div>
            <Typography variant="h1">{OLAuthor.author_name}</Typography>
            <Box
                sx={{height: 300}}
                src={clientExternal.authorPhotoUrl(OLAuthor.author_key)}
                component="img"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = no_cover}}
            />
            <Typography variant="h4">{OLAuthor.author_dob}</Typography>
            <Typography variant="body1">{OLAuthor.author_bio}</Typography>
            <Typography variant="h3">Works by {OLAuthor.author_name}</Typography>
            <List>
                {OLAuthor.author_works?.map((work: any) => (
                    <ListItem>
                        <Box
                            sx={{height: 50}}
                            src={clientExternal.bookCoverUrlId(work.covers?.[0], "S")}
                            component="img"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = no_cover}}
                        />
                        <Link to={`/Bookazon/BookDetail/${extractOLID(work.key)}`} onClick={() => fetchInfoForBookDetail(work)}>
                            {work.title}
                        </Link>

                    </ListItem>
                ))}
            </List>



        </div>
    )

}

export default OLAuthorProfile;