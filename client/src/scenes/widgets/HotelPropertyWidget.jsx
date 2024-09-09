import {} from "@mui/icons-material";
import { Box, Divider, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
//
import PropertyCard from "components/common/PropertyCard";
//
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPosts } from "state";
import allProperties from "../../data/properties";

const HotelPropertyWidget = ({ subs }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //
  const navigate = useNavigate();
  let filturedProps;
  // if (subsidiary === "PGFI") {
  //   //filturedProps = (allProperties.filter(property => property.subsidiary !== "Hotel" ));
  //   filturedProps = [...allProperties];
  // } else {
  //   filturedProps = allProperties.filter(
  //     (property) => property.subsidiary === subsidiary
  //   );
  // }
  // filturedProps = allProperties.filter(
  //   (property) => property.subsidiary === subs
  // );
  filturedProps = allProperties.filter(
    (property) => property.subsidiary === "Hotel-All"//subs
  );
  let second_path
  if(subs=== "PGFI"){
    second_path = `/subs_home`
  }else{
    second_path = `/home`
  }
  console.log(filturedProps);

  const displayProperties = () => {
    if (filturedProps.length === 0) {
      return <h1>No Property is available for this user</h1>;
      // }else if(filturedProps.length === 1 ){
      //   //alert("Only One Property is available now: "+filturedProps[0]._id)
      //   return navigate(`/property/show/${filturedProps[0]._id}`)
    } else {
      //   return filturedProps?.map((property) => (
      //     // {if(property.propertyType == ){
      //     // }}
      //     <PropertyCard
      //         key={property._id}
      //         id={property._id}
      //         title={property.title}
      //         location={property.location}
      //         price={property.price}
      //         photo={property.photo}
      //         //linkPath={`/property/show/${property._id}`}
      //         linkPath={`/home`}
      //     />
      // ))
      return (
        <>
          <PropertyCard
            key={filturedProps[0]._id}
            id={filturedProps[0]._id}
            title={filturedProps[0].title}
            location={filturedProps[0].location}
            //price={property.price}
            photo={filturedProps[0].photo_small}
            linkPath={`/property/show/${filturedProps[0]._id}`}
            //linkPath={`/home`}
          />
          <PropertyCard
            key={filturedProps[1]._id}
            id={filturedProps[1]._id}
            title={filturedProps[1].title}
            location={filturedProps[1].location}
            //price={property.price}
            photo={filturedProps[1].photo_small}
            //linkPath={`/property/show/${filturedProps[0]._id}`}
            linkPath={ second_path }
          />
        </>
      );
    }
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <Box
          mt="20px"
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {displayProperties()}
        </Box>
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />
    </WidgetWrapper>
  );
};

export default HotelPropertyWidget;
