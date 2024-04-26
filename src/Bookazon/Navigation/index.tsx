import {Link} from "react-router-dom";
import TitleBar from "../Home/TitleBar";
import ProfileAnon from "../Home/ProfileAnon";
import ProfileUser from "../Home/ProfileUser";
import SearchBar from "../Home/SearchBar";
import React from "react";
import {useSelector} from "react-redux";
import {userState} from "../store";
import { Box } from "@mui/material";
import ProfileAdmin from "../Home/ProfileAdmin";

function Navigation() {
    const user = useSelector((state: userState) => state.userReducer.user);


    const getComponentBasedOnRole = () => {
        if (user) {
            switch (user.role) {
                case 'ADMIN':
                    return <ProfileAdmin userName={user.username} />;
                
                default:
                    return <ProfileUser userName={user.username} />;
            }
        } else {
            return <ProfileAnon />;
        }
    };


 

    return (
        <Box sx={{mt: 2 }}>
            {/* <TitleBar /> */}
            {getComponentBasedOnRole()}
            <SearchBar />
        </Box>

    )
}

export default Navigation;