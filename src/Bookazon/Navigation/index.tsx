import {Link} from "react-router-dom";
import TitleBar from "../Home/TitleBar";
import ProfileAnon from "../Home/ProfileAnon";
import ProfileUser from "../Home/ProfileUser";
import SearchBar from "../Home/SearchBar";
import React from "react";
import {useSelector} from "react-redux";
import {userState} from "../store";

function Navigation() {
    const user = useSelector((state: userState) => state.userReducer.user);

    return (
        <div>
            <TitleBar />
            {user === null ? (<ProfileAnon />) : (<ProfileUser userName={user.username} />)}
            <SearchBar />
        </div>

    )
}

export default Navigation;