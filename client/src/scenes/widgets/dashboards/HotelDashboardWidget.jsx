import {
  Box,
  Divider,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import allProperties from "../../../data/properties";
//
import HotelDashboardGraph from "./HotelDashboardGraph";
import HotelAllDashboardGraph from "./HotelAllDashboardGraph";

const HotelDashboardWidget = ({ propertyId }) => {
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);

  const [selectedYear, setSelectedYear] = useState("2024-2025") //useState("Show All");
  //
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  const filturedProps = allProperties.filter(
    //(property) => property.subsidiary === subsidiary
    (property) => property._id === propertyId
  );

  let yearArray = [ "2022-2023", "2023-2024", "2024-2025"]// , "Show All"];
  let endYear = yearArray[yearArray.length - 1];
  /////////////////////Helper functions//////////////////////

  //////////////////////////Helper functions////////////////
  const handleYearChange = (event) => {
    //alert(event.target.value);
    endYear = event.target.value;
    setSelectedYear(endYear);
  };
  const makeDashboardMapping = ()=>{
    // console.log( "filturedProps *** from DashBoard wideget " )
    // console.log( filturedProps )
    // console.log("subsidiary: "+filturedProps[0].subsidiary)
    // console.log("PropertyCode is: "+ filturedProps[0].propertyCode )
    // console.log("Value is:"+ (filturedProps[0].subsidiary === "Hotel-All") )

    if(filturedProps[0].subsidiary === "Hotel-All"){
      return (
        <HotelAllDashboardGraph propertyId={propertyId} propertyCode = {filturedProps[0].propertyCode} selectedYear={selectedYear} />
      )
    }else{
      return (
        <HotelDashboardGraph propertyId={propertyId} propertyCode = {filturedProps[0].propertyCode} selectedYear={selectedYear} />
      )
    }
    
  }

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "1rem",
          //border: "1px solid",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: isNonMobileScreens ? "250px" : "150px" }} >
          <FormControl variant="standard"
          style={{ width: isNonMobileScreens ? "250px" : "150px" }}
          >
            <InputLabel id="select-target-year">Select Target Year</InputLabel>
            <Select
              labelId="select-target-year"
              id="select-target-year"
              //value={endYear}
              label="Target Year"
              onChange={handleYearChange}
            >
              {yearArray.map((year, index) => {
                return (
                  <MenuItem key={index} value={year} selected={index === 0} >
                    {year}
                  </MenuItem>
                );
              })}
              {/* <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem selected={true} value={30}>Thirty</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        { isNonMobileScreens && <div>
          <Typography
            color="#FF0000"
            variant="h2"
            fontWeight="500"
            align="center"
          >
            {filturedProps[0].title}
          </Typography>
        </div>}

        <div>
          <Button
            variant="outlined"
            style={{ width: isNonMobileScreens ? "200px" : "100px" }}
            onClick={() => navigate(`/property/show/${propertyId}`)}
          >
            Back
          </Button>
        </div>
      </Box>
      <Divider/>
      { makeDashboardMapping() }
      <Divider />
    </>
  );
};

export default HotelDashboardWidget;
