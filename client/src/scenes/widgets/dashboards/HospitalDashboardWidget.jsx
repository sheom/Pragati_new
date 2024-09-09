import { Directions } from "@mui/icons-material";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";

import {
  Box,
  Divider,
  Typography,
  //InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//
//import PropertyCard from "components/common/PropertyCard";
import { phh_logo } from "assets";

//
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import allProperties from "../../../data/properties";
import HospitalDashboardGraph from "./HospitalDashboardGraph";

//import StatBox from "../../components/StatBox";
//import ProgressCircle from "../../components/ProgressCircle";

import PieChart from "components/charts/PieChart";
import LineChart from "components/charts/LineChart";
import LineChartQuarterly from "components/charts/LineChartQuarterly";
import AllChart from "components/charts/AllChart";
import AllChartQuarterly from "components/charts/AllChartQuarterly";
import MultipleRadialbars from "components/charts/MultipleRadialbars";

const HospitalDashboardWidget = ({ propertyId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [isImage, setIsImage] = useState(false);
  //const [image, setImage] = useState(null);
  //const [selectedYear, setSelectedYear] = useState("Show All");
  const [selectedYear, setSelectedYear] = useState("2024-2025");
  //const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //const mediumMain = palette.neutral.mediumMain;
  //const medium = palette.neutral.medium;
  //
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  const filturedProps = allProperties.filter(
    (property) => property.subsidiary === subsidiary
  );
  const { palette } = useTheme();
  //const dark = palette.neutral.dark;
  //const medium = palette.neutral.medium;
  //const main = palette.neutral.main;
  //const colors = tokens(theme.palette.mode);
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
            Peerless Hospital
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

      {/* <WidgetWrapper > */}
      
      <Divider />
      <HospitalDashboardGraph propertyId={propertyId} propertyCode = "PHH" selectedYear={selectedYear} ></HospitalDashboardGraph>
      

      {/* </WidgetWrapper> */}
    </>
  );
};

export default HospitalDashboardWidget;
