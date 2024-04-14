import {Link} from "react-router-dom";

import SearchBar from "../Home/SearchBar";
import ProfileNav from "../Home/ProfileNav"

import UserProfileInfo from "./UserInfo";
import FavoriteBooks from "./FavoriteBooks";
import ShowUserReviews from "./ShowUserReviews";
import ShowUserFollows from "./ShowUserFollows";

function Profile() {
    const user = {
        username: "IHaveNoName",
        firstName: "First",
        lastName: "Last",
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
            <ProfileNav />
            <SearchBar />
            <UserProfileInfo user={user} />
            <FavoriteBooks books={user.favoriteBooks} />
            <ShowUserReviews reviews={user.reviews} />
            <ShowUserFollows followers={user.followers} following={user.following} />
        </div>
    )
}

export default Profile;