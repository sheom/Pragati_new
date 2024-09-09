import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
//
import PropertyWidget from "scenes/widgets/PropertyWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";

//import FriendListWidget from "scenes/widgets/FriendListWidget";

const PropertyPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  const { propertyId } = useParams();

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
            <UserWidget userId={_id}  />
          </Box>

          <Box
            flexBasis={isNonMobileScreens ? "60%" : undefined}
            mt={isNonMobileScreens ? undefined : "1rem"}
            justifyContent="space-between"
          >
            <PropertyWidget propertyId={propertyId} />
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

export default PropertyPage;
