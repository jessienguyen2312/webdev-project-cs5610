import { useNavigate, useParams } from "react-router";
import Reviews from "./reviews";
import ReviewsAdmin from "./reviewsAdmin";
import { useEffect } from "react";


function reviewsIndex() {
    const currentUser = {
        username: "WilliamShakespeare",
        OL_author_key: "OL9388A",
        password: "bookazonpassword",
        firstName: "William",
        lastName: "Shakespeare",
        email: "williamshakespeare@bookazon.com",
        role: "AUTHOR",
        aboutMe: "William Shakespeare was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language.",
        profilePicture: "profile_pictures/william_shakespeare.jpg",
        follower: ["username1", "username2", "username3"],
        following: ["username1", "username2", "username3"],
        favoriteBook: ["OL20930632M", "OL1216826M"]
    }

    const currentUserAdmin = {
        username: "epicReader",
        password: "pass123",
        firstName: "Emily",
        lastName: "White",
        email: "emilyw@example.com",
        role: "ADMIN",
        aboutMe: "All about grand stories and historical epics. The bigger the book, the better.",
        profilePicture: "https://api.dicebear.com/8.x/thumbs/svg?seed=epicReader",
        follower: ["novelFan", "mysteryReader"],
        following: ["booklover123", "mysteryReader"],
        favoriteBook: ["OL7826547M", "OL1743891M"]
    }

    const navigate = useNavigate();
    const { key } = useParams();

    useEffect(() => {
        // Redirect based on the role
        switch (currentUser.role) {
            case 'ADMIN':
                navigate(`Bookazon/BookDetail/${key}/reviews/admin`);
                break;
            case 'AUTHOR':
                navigate(`Bookazon/BookDetail/${key}/reviews/reader/${currentUser.username}`);
                break;
            default:
                navigate(`Bookazon/BookDetail/${key}/reviews/reader`);
        }
    }, []);



  
}

export default reviewsIndex;