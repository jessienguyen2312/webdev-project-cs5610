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
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import {extractOLID} from "../../Search";
import {resetBook, setBook} from "../BookDetail/BookReducer";
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';

function OLAuthorProfile() {
    const OLAuthor = useSelector((state: bookState) => state.OLAuthorReducer.OLAuthor);
    const book = useSelector((state: bookState) => state.bookReducer.book);
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
        <Container maxWidth={false} sx={{ display: 'block', justifyContent: 'center', alignItems: 'center', height: "100%", minHeight: '10vh', backgroundColor: '#F4EEE7', p: 1}}>
            <Paper elevation={3} sx={{ mx: 'auto', mt: '2rem', p: 2, minWidth: '250px', maxWidth: '800px', borderRadius: '5px', bgcolor: 'background.paper' }}>  
            <Box
            
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography variant="h1" sx={{color: "#222C4E"}}>{OLAuthor.author_name}</Typography>
                <Divider component={"h1"} sx={{background: "#222C4E", borderBottomWidth: "2px"}}/>
                <Box
                    sx={{height: 300, m: 1, mt: 2}}
                    src={clientExternal.authorPhotoUrl(OLAuthor.author_key)}
                    component="img"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = no_cover}}
                />
                <Typography variant="h4" sx={{color: "#222C4E"}}>{OLAuthor.author_dob}</Typography>
                </Box>
                <Typography variant="body1" sx={{color: "#222C4E"}}>{OLAuthor.author_bio}</Typography>
            </Paper>

            <Paper elevation={3} sx={{ mx: 'auto', mt: '2rem', p: 2, minWidth: '250px', maxWidth: '800px', borderRadius: '5px', bgcolor: 'background.paper' }}>
                <Typography variant="h3">Works by {OLAuthor.author_name}</Typography>
                {/*<Divider component={"h1"} sx={{background: "gray", borderBottomWidth: "2px"}}/>*/}
                <List>
                    {OLAuthor.author_works?.map((work: any) => (
                        <ListItem sx={{backgroundColor: "#d8dced"}}>
                            <Paper elevation={3} sx={{m : 1, p: 1, width: '100%', display: 'flex', color: "#222C4E", textDecoration: "none"}} component={Link} to={`/Bookazon/BookDetail/${extractOLID(work.key)}`} onClick={() => fetchInfoForBookDetail(work)}>
                                <Box
                                    sx={{height: 50}}
                                    src={clientExternal.bookCoverUrlId(work.covers?.[0], "S")}
                                    component="img"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = no_cover}}
                                />
                                <Grid sx={{ml: 2}}>
                                    {work.title}
                                </Grid>
                            </Paper>
                        </ListItem>
                    ))}
                </List>

            </Paper>








        </Container>
    )

}

export default OLAuthorProfile;