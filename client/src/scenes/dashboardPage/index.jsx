// EBIDTA margin = (EBIDTA/TotalRevenue)*100
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import FlexBetween from "components/FlexBetween";
import PropertyDetailsCard from "components/common/PropertyDetailsCard";
import UserWidget from "scenes/widgets/UserWidget";
import allProperties from "data/properties";
import DashboardWidget from "scenes/widgets/DashboardWidget";
import HospitalDashboardWidget from "scenes/widgets/dashboards/HospitalDashboardWidget";
import HotelDashboardWidget from "scenes/widgets/dashboards/HotelDashboardWidget";
import PfpdlDashboardWidget from "scenes/widgets/dashboards/PfpdlDashboardWidget";
import PfslDashboardWidget from "scenes/widgets/dashboards/PfslDashboardWidget";
import PslDashboardWidget from "scenes/widgets/dashboards/PslDashboardWidget";
//import MyPostWidget from "scenes/widgets/MyPostWidget";
//import PostsWidget from "scenes/widgets/PostsWidget";
//import FriendListWidget from "scenes/widgets/FriendListWidget";

const DashboardPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, subsidiary } = useSelector((state) => state.user);
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const filturedProperty = allProperties.filter(property => property._id === propertyId );

  const checkMapping = ()=>{
    if( (subsidiary === "PGFI") || (subsidiary === "Hotel") || (filturedProperty[0].subsidiary === subsidiary ) ){
      let selectedWidget
      if ( (filturedProperty[0].subsidiary === "Hotel") || (filturedProperty[0].subsidiary === "Hotel-All") || (filturedProperty[0].subsidiary === "PGFI") ){
        selectedWidget = <HotelDashboardWidget propertyId={propertyId} />
      }else if (filturedProperty[0].subsidiary === "Hospital"){
        selectedWidget = <HospitalDashboardWidget propertyId={propertyId} />
      }else if(filturedProperty[0].subsidiary === "Financial Product Distribution"){
        selectedWidget = <PfpdlDashboardWidget propertyId={propertyId} />
      }else if(filturedProperty[0].subsidiary === "Financial Services"){
        selectedWidget = <PfslDashboardWidget propertyId={propertyId} />
      }else if(filturedProperty[0].subsidiary === "Securities"){
        selectedWidget = <PslDashboardWidget propertyId={propertyId} />
        //selectedWidget =  `No Dashboard is available for this unit.` //<DashboardWidget propertyId={propertyId} />
      }
      else{
        selectedWidget = `No Dashboard is available for this unit.`
      }

      return(
        <>
           {/* <PropertyDetailsCard
                key={filturedProperty[0]._id}
                id={filturedProperty[0]._id}
                title={filturedProperty[0].title}
                location={filturedProperty[0].location}
                photo={filturedProperty[0].photo}
            />
          <Divider sx={{ margin: "1.25rem 0" }} /> */}
          { selectedWidget }
          <FlexBetween gap="1rem" mb="0.5rem">
          <Button variant="outlined" fullWidth onClick={() => navigate(`/property/show/${propertyId}`)} >
            Back
          </Button>
        </FlexBetween>
        </>
        )
    }else{
      return (
        <>
          <h1>You are Not Authorised to view this page.</h1>
        </>
      );
    }
  }




  return (
    <Box>
      {/* <Navbar /> */}
      <Box
        width="100%"
        padding="1rem 3%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* <Box flexBasis={isNonMobileScreens ? "20%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box> */}
        <Box
          flexBasis={isNonMobileScreens ? "100%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
          justifyContent="space-between"
        >
          { checkMapping() }
          

        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
