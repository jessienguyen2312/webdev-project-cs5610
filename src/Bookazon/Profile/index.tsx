import {Link} from "react-router-dom";

import SearchBar from "../Home/SearchBar";
import ProfileNav from "../Home/ProfileNav";

import UserProfileInfo from "./UserInfo";
import FavoriteBooks from "./FavoriteBooks";
import ShowUserReviews from "./ShowUserReviews";
import ShowUserFollows from "./ShowUserFollows";

import ProfileUser from "../Home/ProfileUser";
import { useSelector } from "react-redux";
import { userState } from "../store";
import useCurrentUser from "../Users/useCurrentUser";


function Profile() {
    const user = useSelector((state: userState) => state.userReducer.user);

    useCurrentUser();


    // const user = {
    //     username: "IHaveNoName",
    //     password: "hashed_password",
    //     firstName: "First",
    //     lastName: "Last",
    //     email: "john.doe@example.com",
    //     role: "READER",
    //     description: "Valar Morghulis",
    //     favoriteBooks: [
    //         { key: "book1" }, // These would be expanded in a real app
    //         { key: "book2" }
    //       ],
    //     reviews: [
    //     {
    //         key: "review1",
    //         dateReviewed: "2024-04-13T12:00:00Z",
    //         rating: 4.5,
    //         content: "This book was fantastic!",
    //         bookId: "book123"
    //     }
    //     ],
    //     followers: [
    //     { username: "follower1" },
    //     { username: "follower2" }
    //     ], 
    //     following: [
    //         { username: "following1" },
    //         { username: "following2" }
    //     ]
    //     };

    if (user) {
    return (
        <div>
                <ProfileUser userName={user.username} />
                <SearchBar />
                <UserProfileInfo user={user} />
                {/* <FavoriteBooks books={user.favoriteBooks} /> */}
                {/* <ShowUserReviews reviews={user.reviews} />
                <ShowUserFollows followers={user.followers} following={user.following} />  */}

        </div>
    ) } 
    else {
        return (
        <h1>No user found</h1>) 
    }
}

export default Profile;