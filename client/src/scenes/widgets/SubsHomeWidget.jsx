import {
  Box,
  Divider,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
//
import PropertyCard from "components/common/PropertyCard";
//
import { useNavigate } from "react-router-dom";
import allProperties  from "../../data/properties";

const SubsHomeWidget = ({ subs }) => {
  //
  const navigate = useNavigate();
  
  let filturedProps;
  filturedProps = allProperties.filter(property => property.subsidiary === subs );
  const displayProperties =  ()=>{
    if (filturedProps.length === 0){
      return <h1>No Property is available for this user</h1>
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
          {displayProperties()}
        </Box>
      </FlexBetween>
      <Divider sx={{ margin: "1.25rem 0" }} />
    </WidgetWrapper>
  );
};

export default SubsHomeWidget;
