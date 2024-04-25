import {Link} from "react-router-dom";
import { UseSelector, useDispatch } from "react-redux";

import SearchBar from "../../Home/SearchBar";
// import ProfileNav from "../Home/ProfileNav"

import UserProfileInfo from "../UserInfo";
import FavoriteBooks from "../FavoriteBooks";
import ShowUserReviews from "../ShowUserReviews";
import ShowUserFollows from "../ShowUserFollows";

import ProfileUser from "../../Home/ProfileUser";

import useCurrentUser from "../../Users/useCurrentUser";
import { useSelector } from "react-redux";
import { bookState, userState } from "../../store";
import { useEffect } from "react";
import { setAuthorProfile, setAuthorWorks } from "../OLAuthorReducer";
import * as clientExternal from "../../clientExternal";



function AuthorProfile() {
    
    useCurrentUser();
    const user = useSelector((state: userState) => state.userReducer.user);
    const OLAuthor = useSelector((state: bookState) => state.OLAuthorReducer.OLAuthor);
    console.log(OLAuthor);

    // handle user == author
    if (user && user.OL_author_key == OLAuthor.author_key) {
        return (
            <h1>Private Profile</h1>    // handle view private profile
        )}
        else {
            return <h1>Public Profile</h1>
        };
    // handle user != author

    const dispatch = useDispatch();



}

export default AuthorProfile;