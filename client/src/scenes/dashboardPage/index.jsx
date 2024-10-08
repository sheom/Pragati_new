// EBIDTA margin = (EBIDTA/TotalRevenue)*100
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Box, useMediaQuery, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";
import FlexBetween from "components/FlexBetween";
import allProperties from "data/properties";
import HospitalDashboardWidget from "scenes/widgets/dashboards/HospitalDashboardWidget";
import HotelDashboardWidget from "scenes/widgets/dashboards/HotelDashboardWidget";
import PfpdlDashboardWidget from "scenes/widgets/dashboards/PfpdlDashboardWidget";
import PfslDashboardWidget from "scenes/widgets/dashboards/PfslDashboardWidget";
import PslDashboardWidget from "scenes/widgets/dashboards/PslDashboardWidget";

const DashboardPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath, subsidiary } = useSelector((state) => state.user);
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const filturedProperty = allProperties.filter(property => property._id === propertyId );

  const checkMapping = ()=>{
    if( (subsidiary === "PGFI") || (subsidiary === "Hotel")  || (subsidiary === "Hospital") || (filturedProperty[0].subsidiary === subsidiary ) ){
      let selectedWidget
      if ( (filturedProperty[0].subsidiary === "Hotel") || (filturedProperty[0].subsidiary === "Hotel-All") || (filturedProperty[0].subsidiary === "PGFI") ){
        selectedWidget = <HotelDashboardWidget propertyId={propertyId} />
      }else if ( (filturedProperty[0].subsidiary === "Hospital") || (filturedProperty[0].subsidiary === "Hospital-All") || (filturedProperty[0].subsidiary === "PGFI") ){
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
          <h1>You are Not Authorised to view this page. {filturedProperty[0].subsidiary} Hello</h1>
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
