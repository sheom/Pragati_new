import { Box, useMediaQuery } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
//import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//
//
import allProperties from "data/properties";
import WidgetWrapper from "components/WidgetWrapper";
//
import PropertyDetailsCard from "components/common/PropertyDetailsCard";
import HotelActualFormWidget from "scenes/widgets/forms/HotelActualFormWidget";

import HospitalActualFormWidget from "scenes/widgets/forms/HospitalActualFormWidget";
// import PfpdlActualFormWidget from "scenes/widgets/forms/PfpdlActualFormWidget";
// import PfslActualFormWidget from "scenes/widgets/forms/PfslActualFormWidget";
// import PslActualFormWidget from "scenes/widgets/forms/PslActualFormWidget";
import HotelAllActualFormWidget from "scenes/widgets/forms/HotelAllActualFormWidget";

const ActualPage = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams();
  //

  //
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //
  const filturedProperty = allProperties.filter(
    (property) => property._id === propertyId
  );

  const checkMapping = () => {
    //if (filturedProperty[0].subsidiary === subsidiary) {
      if (
        filturedProperty[0].subsidiary === subsidiary ||
        filturedProperty[0].subsidiary.split("-")[0] === subsidiary
      ){
      let selectedWidget;
      //alert("subsidiary: "+subsidiary +" filturedProperty[0].subsidiary: "+filturedProperty[0].subsidiary)
      if (subsidiary === "Hotel") {
        if(filturedProperty[0].subsidiary === "Hotel-All" ){
          selectedWidget = (
            <HotelAllActualFormWidget
              propertyName={filturedProperty[0].title}
              propertyCode={filturedProperty[0].propertyCode}
              propertyId={propertyId}
            />
          );
        }else{
          selectedWidget = (
            <HotelActualFormWidget
              propertyName={filturedProperty[0].title}
              propertyCode={filturedProperty[0].propertyCode}
              propertyId={propertyId}
            />
          );
        }
        
      } else if (subsidiary === "Hospital") {
        selectedWidget = (
          <HospitalActualFormWidget
            propertyId={propertyId}
            propertyName={"Peerless Hospital"}
            propertyCode={"PHH"}
          />
        );
      // } else if (subsidiary === "Financial Product Distribution") {
      //   selectedWidget = <PfpdlActualFormWidget propertyId={propertyId} />;
      // } else if (subsidiary === "Financial Services") {
      //   selectedWidget = <PfslActualFormWidget propertyId={propertyId} />;
      // } else if (subsidiary === "Securities") {
      //   selectedWidget = <PslActualFormWidget propertyId={propertyId} />;
      } else {
        selectedWidget = "<h1>No form is asigned for this unit.</h1>";
      }

      return (
        <>
          {/* Actual Page
           <PropertyDetailsCard
                key={filturedProperty[0]._id}
                id={filturedProperty[0]._id}
                title={filturedProperty[0].title}
                location={filturedProperty[0].location}
                photo={filturedProperty[0].photo}
            />
          <Divider sx={{ margin: "1.25rem 0" }} /> */}
          {selectedWidget}
        </>
      );
    } else {
      return (
        <>
          <h1>You are Not Authorised to view this page.</h1>
        </>
      );
    }
  };

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
          <UserWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "60%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
          justifyContent="space-between"
        >
          <WidgetWrapper>{checkMapping()}</WidgetWrapper>
        </Box>

        {isNonMobileScreens && (
          <Box flexBasis="20%">
            <AdvertWidget />
            <Box />
            {/* <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ActualPage;
