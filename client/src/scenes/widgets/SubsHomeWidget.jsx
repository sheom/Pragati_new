import {
  // EditOutlined,
  // DeleteOutlined,
  // AttachFileOutlined,
  // GifBoxOutlined,
  // ImageOutlined,
  // MicOutlined,
  // MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  //Typography,
  //InputBase,
  useTheme,
  //Button,
  //IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
//
import PropertyCard from "components/common/PropertyCard";
//
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "state";
import allProperties  from "../../data/properties";

const SubsHomeWidget = ({ subs }) => {
  const dispatch = useDispatch();
  //const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //const mediumMain = palette.neutral.mediumMain;
  //const medium = palette.neutral.medium;
  //
  const navigate = useNavigate();

  // if (subsidiary !== "PGFI"){
  //   return (
  //     <h1> you Are not authorised to view this page</h1>
  //   )
  // }

  let filturedProps;
  // if(subsidiary === "PGFI"){
  //   //filturedProps = (allProperties.filter(property => property.subsidiary !== "Hotel" ));
  //   filturedProps = [...allProperties]
  // }else{
  //   filturedProps = allProperties.filter(property => property.subsidiary === subsidiary );
  // }
  filturedProps = allProperties.filter(property => property.subsidiary === subs );
  // console.log("filturedProps.length")
  // console.log(filturedProps.length)
  // console.log(filturedProps)
  //alert(subs)

  
  
  const displayProperties =  ()=>{

    if (filturedProps.length === 0){
      return <h1>No Property is available for this user</h1>
    // }else if(filturedProps.length === 1 ){
    //   //alert("Only One Property is available now: "+filturedProps[0]._id)
    //   return navigate(`/property/show/${filturedProps[0]._id}`)
    } else{
      return filturedProps?.map((property) => (
        <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            location={property.location}
            price={property.price}
            photo={property.photo_small}
            
        />
    ))
    }
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
      <Box mt="20px" sx={{ display: "flex", justifyContent: 'space-evenly', flexWrap: "wrap", gap: 3 }}>
      {/* <h1>Subsidiary Property Widget</h1> */}
          {displayProperties()}
        </Box>
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />
    </WidgetWrapper>

  );
};

export default SubsHomeWidget;
