import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BookShelf from "./BookShelf";
import ListOfBooks from "./ListOfBooks";
import ProfileAnon from "./ProfileAnon";
import TitleBar from "./TitleBar";
import ProfileUser from "./ProfileUser";
import useCurrentUser from "../Users/useCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import *  as userClient from "../Users/client";
import { userState } from "../store";
import { resetUser, setUser } from "../Users/userReducer";
// import * as userClient from "./client";



function Home() {
    const user = useSelector((state: userState) => state.userReducer.user);


    const fakeUser = {
        "_id": { "$oid": "6622b1a306e1d4495ab452d7" },
        "username": "WilliamShakespeare",
        "OL_author_key": "OL9388A",
        "password": "bookazonpassword",
        "firstName": "William",
        "lastName": "Shakespeare",
        "email": "williamshakespeare@bookazon.com",
        "role": "AUTHOR",
        "aboutMe": "William Shakespeare was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language.",
        "profilePicture": "profile_pictures/william_shakespeare.jpg",
        "follower": ["username1", "username2", "username3"],
        "following": ["username1", "username2", "username3"],
        "favoriteBook": ["OL20930632M", "OL1216826M"]
    };

  

    // UNCOMMENT THIS TO DO A FAKE LOG IN

    // const signin = async () => {
    //     const userlog = await userClient.signin(fakeUser);
    //     console.log("Signed in successfully.");
    // };

    // useEffect(() => {
    //     signin(); // testing sign in
    // }, []);




    // this tests if there is a logged in user (reducer will set it to null if no one is logged in)
    useCurrentUser();




    return (

        
        <div>
            <ListOfBooks user={user}/>
        </div>
    )
}

export default Home;


