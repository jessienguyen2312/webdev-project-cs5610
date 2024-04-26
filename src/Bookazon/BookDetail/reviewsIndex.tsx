import { useNavigate, useParams } from "react-router";
import Reviews from "./reviews";
import ReviewsAdmin from "./reviewsAdmin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../store";
import useCurrentUser from "../Users/useCurrentUser";
import { Box } from "@mui/material";



function ReviewsIndex() {

    // this function is used to check if there is a current session and save it to a reducer
    useCurrentUser()


    const user = useSelector((state: userState) => state.userReducer.user);
    // console.log(user)


    const getComponentBasedOnRole = () => {
        if (user) {
            switch (user.role) {
                case 'ADMIN':
                    return <ReviewsAdmin />;

                default:
                    return <Reviews />;
            }
        } else {
            return <Reviews />;
        }
    };


    return (
        <Box >


            {getComponentBasedOnRole()}

        </Box>
    );



}

export default ReviewsIndex;