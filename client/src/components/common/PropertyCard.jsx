import { Place } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,
} from "@mui/material";
import { useTheme } from "@emotion/react";


const PropertyCard = ({ id, title, location, photo, linkPath }) => {
    const {palette} = useTheme();
    const subsidiary = useSelector((state) => state.user.subsidiary);
    let targetLink = linkPath? linkPath:`/property/show/${id}`

    // if( (subsidiary === "PGFI")&& (id === "6454b3ee679237cb26ce7add")){
    //     targetLink = `/dashboard/${id}`
    // }

    return (
        <Card
            component={Link}
            to={targetLink}
            sx={{
                minWidth: "325px",
                maxWidth: "325px",
                padding: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176, 176, 0.1)",
                    border: "1px solid #0000F0",
                },
                backgroundColor: palette.neutral.light,
                cursor: "pointer",
                borderRadius: "10px"
            }}
            elevation={1}
        >
            <CardMedia
                component="img"
                width="100%"
                height={210}
                image={photo}
                alt="card image"
                sx={{ borderRadius: "10px" }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {title}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                        <Place
                            sx={{
                                fontSize: 18,
                                color: "#11142d",
                                marginTop: 0.5,
                            }}
                        />
                        <Typography fontSize={14} color="#808191">
                            {location}
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default PropertyCard;
