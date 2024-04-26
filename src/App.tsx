import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Navigate, Route, Routes} from "react-router";
import {HashRouter, Link} from "react-router-dom";
import Home from "./Bookazon/Home";
import Profile from "./Bookazon/Profile";
import Navigation from "./Bookazon/Navigation";
import SignIn from "./Bookazon/SignIn";
import SignUp from "./Bookazon/SignUp";
import Search from "./Search";
import BookDetail from './Bookazon/BookDetail';

import store from '../src/Bookazon/store'
import {Provider} from "react-redux";

import EditUserProfile from './Bookazon/Profile/EditProfile/EditUserProfile';
import OLAuthorProfile from "./Bookazon/Profile/OLAuthorProfile";
import ReviewsIndex from './Bookazon/BookDetail/reviewsIndex';
import ReviewModeration from './Bookazon/BookDetail/ReviewModeration';
import UserFollowing from './UserFollowing';
import UserReviewsPage from './UserReviews';


// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';

function App() {
  const user = {
        username: "IHaveNoName",
        password: "hashed_password",
        firstName: "First",
        lastName: "Last",
        email: "john.doe@example.com",
        role: "READER",
        description: "Valar Morghulis",
        favoriteBooks: [
            { key: "book1" }, // These would be expanded in a real app
            { key: "book2" }
          ],
        reviews: [
        {
            key: "review1",
            dateReviewed: "2024-04-13T12:00:00Z",
            rating: 4.5,
            content: "This book was fantastic!",
            bookId: "book123"
        }
        ],
        followers: [
        { username: "follower1" },
        { username: "follower2" }
        ], 
        following: [
            { username: "following1" },
            { username: "following2" }
        ]
        };
  return (

    <div>
        <Provider store={store}>
            <HashRouter>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<Navigate to="Bookazon/Home/"/>} />
                    <Route path="Bookazon/Home" element={<Home/>}/>
                    <Route path="Bookazon/Profile/:username" element={<Profile/>}/>
                    <Route path="Bookazon/SignIn" element={<SignIn/>}/>
                    <Route path="Bookazon/SignUp" element={<SignUp/>}/>
                    <Route path="Bookazon/Search" element={<Search/>}/>             
                    <Route path="Bookazon/BookDetail/:key" element={<BookDetail/>}/>
                    <Route path="/Bookazon/Profile/OlAuthorProfile" element={<OLAuthorProfile/>}/>
                    <Route path="Bookazon/BookDetail/:key/reviews" element={<ReviewsIndex />}/>

                    <Route path="Bookazon/reviews/moderation" element={<ReviewModeration />}/>

                    <Route path="Bookazon/Profile/:username/Reviews" element={<UserReviewsPage/>}/>

                </Routes>
            </HashRouter>
        </Provider>
    </div>

  );
}

export default App;
