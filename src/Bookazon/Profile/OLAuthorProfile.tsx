import {useDispatch, useSelector} from "react-redux";
import {bookState} from "../store";
import {useEffect} from "react";
import * as clientExternal from "../clientExternal";
import {setAuthorKey, setAuthorProfile, setAuthorWorks} from "./OLAuthorReducer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import no_cover from "../../no_cover.png";
import {Button, Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {extractOLID} from "../../Search";
import {setBook} from "../BookDetail/BookReducer";
function OLAuthorProfile() {
    const OLAuthor = useSelector((state: bookState) => state.OLAuthorReducer.OLAuthor);
    console.log(OLAuthor);
    const dispatch = useDispatch();

    const fetchAuthorDetail = async (authorId: string) => {
        const authorProfile = await clientExternal.fetchSpecificAuthorPage(authorId);
        const authorWorks = await clientExternal.fetchOLAuthorWorks(authorId);
        dispatch(setAuthorProfile(
            {...OLAuthor,
                author_name: authorProfile.name,
                author_dob: authorProfile.birth_date,
                author_bio: authorProfile.bio}));
        dispatch(setAuthorWorks({...OLAuthor, author_works: authorWorks}))
        console.log(OLAuthor)
    }

    useEffect(()=> {
        fetchAuthorDetail(OLAuthor.author_key)

    }, [dispatch]);



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
            {<Grid container spacing={2} justifySelf="center">
                {OLAuthor.author_works?.map((work: any) => (
                    <Grid item spacing={2}>
                        <Card sx={{ width: 400, maxHeight: 500 }} key={work.key}>
                            <CardMedia
                                sx={{height: 300}}
                                src={clientExternal.bookCoverUrl(extractOLID(work.key))}
                                component="img"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = no_cover}
                                }
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    <Link style={{textDecoration: "none", color: "#222C4E"}} to={`/Bookazon/BookDetail/${extractOLID(work.key)}`} onClick={()=> dispatch(setBook({
                                        key: extractOLID(work.key),
                                        author_name: [OLAuthor.author_name],
                                        author_key: OLAuthor.author_key,
                                        work_key: work.works[0].key
                                    }))}>
                                        {work.title}
                                    </Link>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>}
        </div>
    )

}

export default OLAuthorProfile;