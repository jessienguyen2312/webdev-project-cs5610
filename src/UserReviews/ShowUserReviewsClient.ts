import axios from "axios";

interface Review {
    _id: string;
    username: string; 
    bookId: string;
    rating: Number;
    text: string; 
    datePosted: Date; 
    flagged: boolean; 
    likes: Number; 
  }

const API_BASE = process.env.REACT_APP_API_BASE;
const REVIEWS_API = `http://localhost:4000/api/reviews`;


export const deleteReview = async (review: any) => {
    const response = await axios
      .delete(`${REVIEWS_API}/${review._id}`);
    return response.data;
  };
  

export const updateReview = async (review: any) => {
    const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
    return response.data;
};

export const findAllReviews = async () => {
    const response = await axios.get(`${REVIEWS_API}`);
    console.log(response);
    return response.data;  
};