// import {
//   EditOutlined,
//   DeleteOutlined,
//   AttachFileOutlined,
//   GifBoxOutlined,
//   ImageOutlined,
//   MicOutlined,
//   MoreHorizOutlined,
// } from "@mui/icons-material";

import {
  Box,
  Divider,
  // Typography,
  // InputBase,
  //useTheme,
  // Button,
  // IconButton,
  //useMediaQuery,
  //Stack,
} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
//
//import PropertyCard from "components/common/PropertyCard";
//
//import { useState } from "react";
//import { useDispatch, 
//import {useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
//import { setPosts } from "state";
import PieChart from "components/charts/PieChart";

const PropertyGraphWidget = ({ propertyId }) => {
  // const dispatch = useDispatch();
  // const [isImage, setIsImage] = useState(false);
  // const [image, setImage] = useState(null);
  // const [post, setPost] = useState("");
  //const { palette } = useTheme();
  //const { _id } = useSelector((state) => state.user);
  //const token = useSelector((state) => state.token);
  //const subsidiary = useSelector((state) => state.user.subsidiary);
  //const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //const mediumMain = palette.neutral.mediumMain;
  //const medium = palette.neutral.medium;
  //const { propertyId } = useParams();

  const displayPropertyGraph =  ()=>{
      return(
        <>
        <Box mt="2px" display="flex" flexWrap="wrap" gap={4}>
          {/* <Stack direction="row" gap={0.5} alignItems="flex-start"> */}
                <PieChart
                    title="Revenue in Cr."
                    value={2684}
                    series={[75, 25]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="PBT in Cr."
                    value={250}
                    series={[60, 40]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Occupancy %"
                    value={65/100}
                    series={[65, 35]}
                    colors={["#275be8", "#c4e8ef"]}
                />
                <PieChart
                    title="Average Room Rate"
                    value={3800}
                    series={[70, 30]}
                    colors={["#275be8", "#c4e8ef"]}
                />
          {/* </Stack> */}
        </Box>
        </>
        )
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
      <Box mt="10px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {displayPropertyGraph()}
            </Box>
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />

    </WidgetWrapper>
  );
};

export default PropertyGraphWidget;
