import * as React from 'react';
import {useState, useEffect} from "react"; 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import * as client from "../BookDetail/clientReview"; 
import Popover from '@mui/material/Popover';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Paper, Rating, TextField } from '@mui/material';
import * as clientExternal from '../clientExternal'; 
import { useDispatch, useSelector } from 'react-redux';
import { bookState } from '../store';
import { resetBook, setBook } from '../BookDetail/BookReducer';
import { extractOLID } from '../../Search';
 
interface Review {
  _id: string;
  username: string; 
  bookId: string;
  rating: number;
  text: string; 
  datePosted: string; 
  flagged: boolean; 
  likes: Number; 
}

export default function PublicUserReviewsPage() {
 
  const { username } = useParams();
  const loggedInUser = useSelector((state: any) => state.userReducer.user);
  const [review, setReview] = useState<Review>({_id: "", username: "", bookId: "",
    rating: 0, text: "", datePosted: "01/01/1998", flagged: false, 
    likes: 0
  })
  const [reviews, setReviews] = useState<Review[]>([]); 
  
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [currentUser, setCurrentUser] = useState({ _id:"",
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  dateCreated: new Date(),
  aboutMe: "",
  profilePicture: "", 
  follower: [],
  following: [],
  favoriteBook: [],
  OL_author_key: ""})
  const [error, setError] = useState("");
  const book = useSelector((state: bookState) => state.bookReducer.book);
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  
  const fetchReviews = async () => {
    const reviews = await client.findReviewsByUsername(username); 
    setReviews(reviews); 
  }

  const deleteReview = async (review: any) => {
    await client.deleteReview(review)
    setReviews(reviews.filter((u) => u._id !== review._id));
  }

  const updateReview = async(review: any) => {
    try {
      await client.updateReview(review);
      setReviews(prevReviews => prevReviews.map((prevReview: any) => prevReview._id === review._id ? review : prevReview));
      setReview({_id: "", username: "", bookId: "",
      rating: 0, text: "", datePosted: "01/01/1998", flagged: false, 
      likes: 0
    })

    } catch (err: any) {
        setError("Please select a review to update");
    }
    
  }
  

const fetchInfoForBookDetail = async (work: string) => {
    // fetch work info
    const result = await clientExternal.bookDetail('/works/' + work);
    console.log(result);
    dispatch(resetBook(book));
    // fetch author keys
    const authorsKeys: string[] = [];
    result.authors.forEach((author: any) => {
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
        title: result.title,
        key: result.key,
        author_key: authorsKeys,
        author_name: authorsNames,
        // cover_id: work.covers? work.covers[0] : "",
        cover_edition_key: result.covers? result.covers[0] : "",
    }))
    console.log(book)
    navigate(`/Bookazon/BookDetail/${extractOLID(result.key)}`)
}

  useEffect(() => {
    fetchReviews();
  }, []);  

  //Delete if too much trouble & delete conditional
  // const isCurrentUser = loggedInUser.username === username;

    return (
      <>
      {/* {isCurrentUser ? ( */}
      <Container maxWidth={false} sx={{ display: 'block', justifyContent: 'center', alignItems: 'center', height: "100%", minHeight: '10vh', backgroundColor: '#5D6BA0', p: 1}}>
      <Paper elevation={3} sx={{ mx: 'auto', mt: '2rem', p: 2, minWidth: '250px', maxWidth: '500px', borderRadius: '5px', bgcolor: 'background.paper' }}>            
            <Container component="main" maxWidth="lg" sx={{padding: 0.25}}>
            <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <h1>My Reviews</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            </Container>
        <div>
      <ul>
      <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
        {reviews.map(a => (
          <Box

          width={600}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{
            border: '1px solid black',
            marginTop: 3, 
            width: '100%', 
            height: 'auto', 
            minHeight: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Rating name="read-only" value={a.rating} readOnly />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     
            <p>{a.text}</p>
            </div>
            
          </Box>
        ))}
        </Container>
      </ul>
        </div>
        </Box>
        </Container>
    </Paper>
    </Container>
    {/* ) : <Container maxWidth={false} sx={{ display: 'block', justifyContent: 'center', alignItems: 'center', height: "100%", minHeight: '10vh', p: 1}}><h1>Not current user</h1></Container>} */}
    </>
    );
  }