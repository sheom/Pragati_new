import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import HotelPropertyWidget from "scenes/widgets/HotelPropertyWidget";
import SubsPropertyWidget from "scenes/widgets/SubsPropertyWidget"; 
import PgfiPropertyWidget from "scenes/widgets/PgfiPropertyWidget";
//import MyPostWidget from "scenes/widgets/MyPostWidget";
//import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
//import FriendListWidget from "scenes/widgets/FriendListWidget";

const HotelHomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, subsidiary } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const makeWidget = ()=>{
    if(subsidiary === "PGFI"){
      return "PGFI Content to appear here"
    }else if(subsidiary === "Hotel"){
      return <HotelPropertyWidget subs="Hotel-All" />
    }else{
      //return <SubsPropertyWidget />
      return [<h1> You are not authorized to view this content </h1>]
    }
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent= "space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "20%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "60%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
          justifyContent="space-evenly"
        >
          {makeWidget()}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="20%">
            <AdvertWidget />
            <Box />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HotelHomePage;
