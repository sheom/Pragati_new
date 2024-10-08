import {
  Box,
  Divider,
  Typography,
  //InputBase,
  useTheme,
  Button,
  useMediaQuery,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//
//import PropertyCard from "components/common/PropertyCard";
//
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import allProperties from "../../../data/properties";
import HospitalDashboardGraph from "./HospitalDashboardGraph";
import HospitalAllDashboardGraph from "./HospitalAllDashboardGraph";

//import StatBox from "../../components/StatBox";
//import ProgressCircle from "../../components/ProgressCircle";

const HospitalDashboardWidget = ({ propertyId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  //const { palette } = useTheme();
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  const filturedProps = allProperties.filter(
    //(property) => property.subsidiary === subsidiary
    (property) => property._id === propertyId
  );
  const { palette } = useTheme();
  const colors = palette.neutral.main;

  const displayProperties = () => {
    if (filturedProps.length === 0) {
      return <h1>No Property is available for this user</h1>;
    } else {
      return <h1>Dashboard Page: {subsidiary}</h1>;
    }
  };

  //let yearArray = [ "2022-2023", "2023-2024", "Show All"];
  let yearArray = [ "2022-2023", "2023-2024", "2024-2025"];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const makeDashboardMapping = ()=>{
    if(filturedProps[0].subsidiary === "Hospital-All"){
      return (
        <HospitalAllDashboardGraph propertyId={propertyId} propertyCode = {filturedProps[0].propertyCode} propertyCodeOld = "PHH" selectedYear={selectedYear} >
      </HospitalAllDashboardGraph>
      )
    }else{
      return (
        <HospitalDashboardGraph propertyId={propertyId} propertyCode = {filturedProps[0].propertyCode} propertyCodeOld = "PHH" selectedYear={selectedYear} >
      </HospitalDashboardGraph>
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
        <div style={{ width: isNonMobileScreens ? "250px" : "150px" }}>
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
              { yearArray.map( (year, index) => {
                //console.log("Year:"+ year+ " index: "+index +" Selected: "+(index === 0) )
                  return (
                      <MenuItem key={index} value={year} selected={index === 0}>
                          {year}
                      </MenuItem>
                  );
              })}
            </Select>
          </FormControl>
        </div>

        { isNonMobileScreens && <div >
          <Typography
            color="#FF0000"
            variant="h2"
            fontWeight="500"
            align="center"
          >
            {/* Peerless Hospital */}
            {filturedProps[0].title}
          </Typography>
          {propertyId} & {filturedProps[0].title}
        </div>}

        <div>
          <Button
            variant="outlined"
            style={{ width: isNonMobileScreens ? "200px" : "100px" }}
            onClick={() => navigate(`/property/show/${propertyId}`)}
          >
            Back from Hospital Dashboard
          </Button>
        </div>

    </Box>

      {/* <WidgetWrapper > */}
      
      <Divider />
      { makeDashboardMapping() }
      {/* </WidgetWrapper> */}
    </>
  );
};

export default HospitalDashboardWidget;
