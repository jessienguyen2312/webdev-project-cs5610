import * as React from 'react';
import {useState, useEffect} from "react"; 
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Container from '@mui/material/Container';
import SearchBar from '../Bookazon/Home/SearchBar';
import ProfileNav from "../Bookazon/Home/ProfileNav";
import * as client from "./ShowUserReviewsClient"; 
import Popover from '@mui/material/Popover';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
 
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
 
  const [review, setReview] = useState({username: "", bookId: "",
    rating: 0, text: "", datePosted: "01/01/1998", flagged: false, 
    likes: 0
  })
  const [reviews, setReviews] = useState<Review[]>([]); 
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  
  const fetchReviews = async () => {
    const reviews = await client.findAllReviews(); 
    setReviews(reviews); 
  }

  const deleteReview = async (review: any) => {
    await client.deleteReview(review)
    setReviews(reviews.filter((u) => u._id !== review._id));
  }

  useEffect(() => {
    fetchReviews();
  }, []);  


    return (
        <Container maxWidth="xl" >
          <ProfileNav/>
          <SearchBar/>
            <Container component="main" maxWidth="lg" sx={{padding: 0.25}}>
            <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
    
            <Container  maxWidth="xl"  sx={{ backgroundColor: "#F4EEE7" }}>
                <Button variant="contained" className="blah" sx={{ 
                mt: 3, 
                mb: 2,
                width: '25%',
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}>
                    Settings
                </Button>
                <Button variant="contained" sx={{ 
                mt: 3, 
                mb: 2,
                width: '25%',
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}>
                    Reviews
                </Button>
                <Button variant="contained" sx={{ 
                mt: 3, 
                mb: 2,
                width: '25%',
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}>
                    Favorites
                </Button>
                <Button variant="contained" sx={{ 
                mt: 3, 
                mb: 2,
                width: '25%',
                backgroundColor: '#EF8D40',
                '&:hover': {
                  backgroundColor: '#F1A467'
                }
              }}>
                    Following
                </Button>
            </Container>
            <Container sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            

            <h1>Reviews</h1>
            </Container>
        <div>
   
      <ul>
        {reviews.map(a => (
          <Box sx={{ mx: '25rem', mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
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
              <Button><Link to="/Bookazon/Profile/EditReview">Edit</Link></Button>
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
      Review Container 

      <Button>
        <MoreVertIcon/>
      </Button>
    </Box>
        </div>
        </Box>
        </Container>
    </Container>
    );
  }