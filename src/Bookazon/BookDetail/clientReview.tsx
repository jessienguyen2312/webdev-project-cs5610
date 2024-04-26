import axios from "axios";


const API_BASE = process.env.REACT_APP_API_BASE;


// const API_BASE = `https://bookazon-node-server.onrender.com`

//const API_BASE = "http://localhost:4000"

const REVIEWS_API = `${API_BASE}/api/reviews`;

// axios.defaults.withCredentials = true
// const request = axios.create({
//     withCredentials: true,
// });

export interface Review {
    _id: String,
    username: String,
    bookId: String,
    rating: number,
    text: String,
    datePosted: Date,
    flagged: Boolean,
    likes: Number
    };


  



export const updateReview = async (review: any) => {
    const response = await axios.put(`${API_BASE}/${review._id}`, review);
    return response.data;
};

export const findAllReviews = async () => {
    const response = await axios.get(`${REVIEWS_API}`);
    return response.data;
};

export const createReview = async (review: any) => {
    const response = await axios.post(`${REVIEWS_API}`, review);
    return response.data;
};

export const deleteReview = async (review: any) => {
    const response = await axios.delete(
        `${REVIEWS_API}/${review._id}`);
    return response.data;
};

export const findReviewByBook = async (bookId: any) => {
    const response = await axios.get(`${REVIEWS_API}/book/${bookId}`);
    console.log(`${REVIEWS_API}/book/${bookId}`)
    return response.data;
};

export const findReviewsByUsername = async (username: any) => {
    const response = await axios.get(`${REVIEWS_API}/user/${username}`);
    return response.data; 
};

// export const findReviewById = async (id: string) => {
//     const response = await axios.get(`${USERS_API}/${id}`);
//     return response.data;
// };

// export const findUsersByRole = async (role: string) => {
//     const response = await
//         axios.get(`${USERS_API}?role=${role}`);
//     return response.data;
// };


