import { Place } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
    Typography,
    Box,
    Card,
    CardMedia,
    CardContent,
    Stack,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const PropertyDetailsCard = ({ id, title, description, location, photo, }) => {
    const {palette} = useTheme();
    return (
        <Card
            //component={span}
            //to={`/property/show/${id}`}
            sx={{
                width: "100%",
                padding: "5px",
                borderRadius: "10px"
            }}
            elevation={0}
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
                {/* <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {title}
                    </Typography>
                    <Typography fontSize={14} fontWeight={400} color="#11142d">
                        {description}
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
                </Stack> */}
            </CardContent>
        </Card>
    );
};

export default PropertyDetailsCard;
