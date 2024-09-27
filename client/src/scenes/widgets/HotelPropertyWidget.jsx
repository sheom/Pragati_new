import {} from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import PropertyCard from "components/common/PropertyCard";
import { useNavigate } from "react-router-dom";
import allProperties from "../../data/properties";

const HotelPropertyWidget = ({ subs }) => {
  //
  const navigate = useNavigate();
  let filturedProps;
  console.log("subs: "+subs);
  let filtureValue = "Hotel-All";
  if(subs === "Hospital"){
    filtureValue = "Hospital-All";
  }
  filturedProps = allProperties.filter(
    (property) => property.subsidiary === filtureValue //"Hotel-All"//subs
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
    } else {
      return (
        <>
          <PropertyCard
            key={filturedProps[0]._id}
            id={filturedProps[0]._id}
            title={filturedProps[0].title}
            location={filturedProps[0].location}
            photo={filturedProps[0].photo_small}
            linkPath={`/property/show/${filturedProps[0]._id}`}
          />
          <PropertyCard
            key={filturedProps[1]._id}
            id={filturedProps[1]._id}
            title={filturedProps[1].title}
            location={filturedProps[1].location}
            photo={filturedProps[1].photo_small}
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
