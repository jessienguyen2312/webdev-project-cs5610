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
import { Box } from "@mui/material";
// import * as userClient from "./client";



function Home() {
    

    // this tests if there is a logged in user (reducer will set it to null if no one is logged in)
    // useCurrentUser();




    return (

        
        <Box sx={{bgcolor: "#F4EEE7"}}>
            <ListOfBooks />
        </Box>
    )
}

export default Home;


