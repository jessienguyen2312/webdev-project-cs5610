import { Box, Typography } from "@mui/material";

import Profile from "./ProfileAnon"; // which one is it?



function TitleBar() {

    return (
        <Box sx={{display: { sm: 'flex', md: 'none', background: "grey"}, height: 70,  alignContent: "center" }}>
            <Box sx={{display: { sm: 'none', md: 'flex', background: "white"}, justifyContent: "flex-end"}}>
            <Profile />
            </Box>
        </Box>



    );
}

export default TitleBar;