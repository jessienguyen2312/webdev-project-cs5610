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

    // handle user == author

    // handle user != author

    const OLAuthor = useSelector((state: bookState) => state.OLAuthorReducer.OLAuthor);
    console.log(OLAuthor);
    const dispatch = useDispatch();




    return (
        <div>
            <ProfileUser userName={user.username} />
            <SearchBar />
            <UserProfileInfo user={user} />
            <FavoriteBooks books={user.favoriteBooks} />
            <ShowUserReviews reviews={user.reviews} />
            <ShowUserFollows followers={user.followers} following={user.following} />
        </div>
    )
}

export default AuthorProfile;