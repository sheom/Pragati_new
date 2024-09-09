import { Box, Divider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import SubsPropertyWidget from "scenes/widgets/SubsPropertyWidget"; 
import PgfiPropertyWidget from "scenes/widgets/PgfiPropertyWidget";
//import MyPostWidget from "scenes/widgets/MyPostWidget";
//import PostsWidget from "scenes/widgets/PostsWidget";
//
import UpdatePasswordWidget from "scenes/widgets/UpdatePasswordWidget";
//
import AdvertWidget from "scenes/widgets/AdvertWidget";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
//import FriendListWidget from "scenes/widgets/FriendListWidget";

const UserPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, subsidiary } = useSelector((state) => state.user);

  const makeWidget = ()=>{
    // if(subsidiary === "PGFI"){
    //   return <PgfiPropertyWidget />
    // }else{
    //   return <SubsPropertyWidget />
    // }
    // return ("Hello from make Widget")
    return (
      <WidgetWrapper>
      <FlexBetween gap="1.5rem">
      <Box mt="10px" sx={{ display: "flex", justifyContent: 'space-evenly', flexWrap: "wrap", gap: 3 }}>
      <UpdatePasswordWidget />
        </Box>
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />
      
    </WidgetWrapper>
    )
  }

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
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

export default UserPage;
