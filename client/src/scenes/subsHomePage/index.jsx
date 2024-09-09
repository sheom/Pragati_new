import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import SubsPropertyWidget from "scenes/widgets/SubsPropertyWidget"; 
import PgfiPropertyWidget from "scenes/widgets/PgfiPropertyWidget";
//import MyPostWidget from "scenes/widgets/MyPostWidget";
//import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import PgfiHomeWidget from "scenes/widgets/PgfiHomeWidget";
import SubsHomeWidget from "scenes/widgets/SubsHomeWidget";
//import FriendListWidget from "scenes/widgets/FriendListWidget";

const SubsHomePage = ({subs}) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, subsidiary } = useSelector((state) => state.user);

  const makeWidget_old = ()=>{
    if(subsidiary === "PGFI"){
      return <PgfiHomeWidget />
      //return <PgfiPropertyWidget />
      //return <SubsPropertyWidget />
    }else{
      return <SubsPropertyWidget />
    }
    // return ("Hello from make Widget")
  }
  const makeWidget = ()=>{
    return <SubsHomeWidget subs={"Hotel"} />
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

export default SubsHomePage;
