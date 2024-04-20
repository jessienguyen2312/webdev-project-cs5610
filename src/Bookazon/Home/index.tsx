import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";
import BookShelf from "./BookShelf";
import ListOfBooks from "./ListOfBooks";
import ProfileAnon from "./ProfileAnon";
import TitleBar from "./TitleBar";
import ProfileUser from "./ProfileUser";


function Home() {
    // to navigate between an anon and non anon user test
    const user = null
     const userRole = 'admin'
    return (

        <div>
            {/* <h1>Bookazon :D</h1> */}
            <TitleBar />
            {/* needs to be changed to incorporate the actual session variables */}
            {user === null ? (<ProfileAnon />): (<ProfileUser userName = {user}/>)}
            
            <SearchBar />
            <ListOfBooks />
        </div>
    )
}

export default Home;