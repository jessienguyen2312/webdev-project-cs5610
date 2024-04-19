import { Link } from "react-router-dom";
import React from "react";
import SearchBar from "./SearchBar";
import BookShelf from "./BookShelf";
import ListOfBooks from "./ListOfBooks";
import ProfileNav from "./ProfileNav";
import TitleBar from "./TitleBar";


function Home() {
    return (
        <div>
            {/* <h1>Bookazon :D</h1> */}
            <TitleBar />
            <ProfileNav />
            <SearchBar />
            <ListOfBooks />
            {/* <BookShelf genre={"romance"} /> */}
        </div>
    )
}

export default Home;