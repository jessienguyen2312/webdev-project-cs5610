import { Box, Typography } from "@mui/material";

import Profile from "./ProfileAnon"; // which one is it?

//import Profile from "./ProfileNav"; <- this was on main


function TitleBar() {

    return (
        <Box sx={{ display: { sm: 'flex', md: 'none', background: "grey"}, height: 70,  alignContent: "center" }}>
            <Box>
                

            </Box>
            <Box sx={{justifyContent: "flex-end"}}>
            <Profile />
            </Box>
        </Box>

    );
}

export default TitleBar;