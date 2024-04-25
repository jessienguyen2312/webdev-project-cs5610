import * as React from 'react';
import {useState, useEffect} from "react"; 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import SearchBar from '../Bookazon/Home/SearchBar';
import ProfileNav from "../Bookazon/Home/ProfileNav";
import * as client from "../Bookazon/BookDetail/clientReview"; 
import Popover from '@mui/material/Popover';
import { Link, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
 
interface Review {
  _id: string;
  username: string; 
  bookId: string;
  rating: Number;
  text: string; 
  datePosted: string; 
  flagged: boolean; 
  likes: Number; 
}

export default function UserReviewsPage() {
 
  const { username } = useParams();

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
    } catch (err: any) {
        setError("Please select a review to update");


    }
    
  }

  useEffect(() => {
    fetchReviews();
  }, []);  


    return (
        <Container maxWidth="xl" >
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            

            <h1>Reviews</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            </Container>
        <div>
   
          <Container>
          
          <TextField
                  fullWidth
                  id="rating"
                  label="Rating"
                  name="rating"
                  autoComplete="rating"
                  value = {review.rating}
                  onChange={(event) => setReview({...review, rating: parseInt(event.target.value)})} 
                  inputProps={{ pattern: "[0-9]*" }}
                  sx={{
                    color: '#222C4E',
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#222C4E', 
                      },
                    },
                  }}
                />
                 <TextField
                  fullWidth
                  id="text"
                  label="Review Text"
                  name="review"
                  autoComplete="review"
                  value = {review.text}
                  onChange={(event) => setReview({...review, text: event.target.value})} 
                  inputProps={{ pattern: "[0-9]*" }}
                  sx={{
                    color: '#222C4E',
                    bgcolor: 'white',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#222C4E', 
                      },
                    },
                  }}
                />
                <Button variant="contained"
                onClick={() => {updateReview(review)}}
                sx = {{
                  backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
                }}
                >Update Review</Button>
          </Container>
      <ul>
        {reviews.map(a => (
          <Box
          height={200}
          width={600}
          my={4}
          display="flex"
          alignItems="center"
          gap={4}
          p={2}
          sx={{ border: '2px solid grey' }}
        >
            <p style={{width: '66.67%'}}>{`${a.rating}`}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{width: '66.67%'}}>{a.text}</p>
            <Button onClick={handleClick} style={{width: '10%'}}><MoreVertIcon/></Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Button className="editing-dashboard-button" onClick={(event) => {
                event.preventDefault();
                setReview(a);
                handleClose();
              }}>Edit</Button>
              <Button className="editing-dashboard-button" onClick={(event) => {
                        event.preventDefault();
                        deleteReview(a);
                        handleClose();
                      }}>Delete</Button>
              </Popover> 
            </div>
            
          </Box>
        ))}
      </ul>
        </div>
        </Box>
        </Container>
    </Container>
    );
  }