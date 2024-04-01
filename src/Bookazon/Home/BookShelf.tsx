import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { CardActionArea, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';

function BookShelf() {
    // Example images data
    const imageData = [
        {
            img: 'logo192.png',
            title: 'Image 1',
            author: "author1",
        },
        {
            img: 'logo192.png',
            title: 'Image 2',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 3',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 4',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 5',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 5',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 5',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 5',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 5',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 5',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 5',
            author: "author1",


        },
        {
            img: 'logo192.png',
            title: 'Image 10',
            author: "author1",


        },

    ];


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div >

            < Box sx={{
                display: 'flex',
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'hidden',
                    width: '100%',
                    height: 200,
                }}  >
                    <Tabs
                       
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >

                        {imageData.map((item, index) => (
                            <Tab label={
                                <Card sx={{ minWidth: 150, width: '100%' }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                maxHeight: 100,
                                                // minHeight: 50,
                                                objectFit: 'contain',
                                                width: '100%'
                                            }}
                                            image={`${process.env.PUBLIC_URL}/${item.img}`}
                                            title={item.title}
                                        />
                                    </CardActionArea>

                                    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>

                                        <Box>
                                            <CardActionArea>
                                                <Typography variant='subtitle2' display="block">
                                                    {item.title}
                                                </Typography>
                                            </CardActionArea>

                                            <CardActionArea>
                                                <Typography variant='subtitle2' display="block">
                                                    {item.author}
                                                </Typography>
                                            </CardActionArea>
                                        </Box>
                                        <Box>
                                            <IconButton>
                                                <FavoriteBorderIcon />
                                            </IconButton>

                                        </Box>

                                    </CardContent>


                                </Card>
                            }
                            />

                        ))}
                    </Tabs>
                </Box>

            </Box>

        </div >
    );

}

export default BookShelf;