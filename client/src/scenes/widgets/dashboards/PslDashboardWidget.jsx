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
//
//import PropertyCard from "components/common/PropertyCard";
import { phh_logo } from "assets";

//
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import allProperties from "../../../data/properties";

//import StatBox from "../../components/StatBox";
//import ProgressCircle from "../../components/ProgressCircle";

import PieChart from "components/charts/PieChart";
import LineChart from "components/charts/LineChart";
import LineChartQuarterly from "components/charts/LineChartQuarterly";
import AllChart from "components/charts/AllChart";
import AllChartQuarterly from "components/charts/AllChartQuarterly";
import MultipleRadialbars from "components/charts/MultipleRadialbars";

const PslDashboardWidget = ({ propertyId }) => {
  const dispatch = useDispatch();
  //const [isImage, setIsImage] = useState(false);
  //const [image, setImage] = useState(null);
  //const [post, setPost] = useState("");
  //const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  //const mediumMain = palette.neutral.mediumMain;
  //const medium = palette.neutral.medium;
  //
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const filturedProps = allProperties.filter(
    //(property) => property.subsidiary === subsidiary
    (property) => property._id === propertyId
  );
  console.log(filturedProps);
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

  return (
    <>
      {/* <WidgetWrapper > */}
        <div style={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }}>
          <div style={{ minWidth: 260, flexDirection: "row" }} >
            <Box sx={{ display: 'flex', flexDirection: "row"   }} >
            <Card sx={{ minWidth: 250, height:"100%" }}>
              <CardMedia 
              sx={{ height: 140, marginTop:"1.5rem" }}
               image={filturedProps[0].photo}
               title="Subsidiary Logo"
              />
              <CardContent>
              {/* <Typography variant="h4" component="div" >
                  Financial Year: 2022-23
                </Typography>
                <Divider ></Divider> */}

                <Typography variant="h5" component="div" marginTop="1rem">
                  Revenue (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                ₹ 10.96 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  PBT (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                ₹ 2.34 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  EBITDA Margin (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  { Math.round((2.41/10.96)*100) } %
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                Number of active clients(Average)
                </Typography>
                <ul>
                  <li>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                Retail (FY 23): 1832
                </Typography>
                </li>
                <li>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                Institutional (FY 23): 8.91
                </Typography>
                </li>
                <li>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                DP (FY 23): 14726
                </Typography>
                </li>
                </ul>
                <Divider></Divider>

                <Typography variant="h5" component="div" marginTop={"1rem"}>
                Number of active business associates(FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                90.25 (Average)
                </Typography>
                
                {/* <Typography variant="h5" component="div" marginTop={"1rem"}>
                  &nbsp;
                </Typography> */}
                
                {/* <Divider></Divider> */}
              </CardContent>
            </Card>
            </Box>
          </div>

          <div style={{
            width: "100%",
            marginLeft : "1rem"
          }}>

            <Card sx={{ width: "100%", height: "100%",  backgroundColor: palette.neutral.light }} >
              {/* 
                line, area, bar, radar, histogram, pie, donut, radialBar, scatter, bubble, heatmap, candlestick
              */}
              <CardContent>
                <Box>
                  <Box style={{ display: "flex", flexDirection: "row" , justifyContent: "space-between", marginBottom: "1rem", marginTop:"1rem" }} >
                    <div style={{width : "59%" }}>
                      <AllChartQuarterly
                        title="Revenue (in Cr.)"
                        series= {[
                          {
                            name: "FY 22 Actuals",
                            data: [ 2.71, 2.95, 2.84, 2.96]
                          },
                          {
                            name: "FY 23 Budget",
                            data: [2.80, 2.80, 2.80, 2.80]
                          },
                          {
                            name: "FY 23 Actuals",
                            data: [2.61, 2.82, 2.80, 2.72]
                          }
                        ]}
                        //colors={["#275be8", "#c4e8ef"]}
                      />
                    </div>
                    <div style={{width : "39%" }}  >
                      {/* <MultipleRadialbars
                        title="Occupancy (in %)"
                        //series= {[ 33.35, 16.45, -35.87, 86.07 ]}
                        //series= {[ .75, .37, -0.81, 1.94 ]}
                        series={[ 62,	70,	83, 88  ]}
                        total = {76}
                      /> */}
                      <AllChartQuarterly
                      title="PBT (in Cr.)"
                      type="bar"
                      series= {[
                        {
                          name: "FY 22 Actuals",
                          data: [ 0.51, 0.63, 0.67, 0.88 ]
                        },
                        {
                          name: "FY 23 Budget",
                          data: [ 0.58, 0.58, 0.58, 0.58 ]
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [ 0.47, 0.54, 0.72, 0.61 ]
                        }
                      ]}
                    />
                    </div>
                  </Box>

                  <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",   }} >
                  <div style={{width : "32%" }} >
                  <AllChartQuarterly
                      title="EBITDA (in Cr.)"
                      type="bar"
                      series= {[
                        {
                          name: "FY 22 Actuals",
                          data: [ 0.54, 0.66, 0.68, 0.93 ]
                        },
                        {
                          name: "FY 23 Budget",
                          data: [ 0.63, 0.63, 0.63, 0.63 ]
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [ 0.50, 0.57, 0.75, 0.59 ]
                        }
                      ]}
                    />
                  </div>

                    <div style={{width : "32%" }}>
                    <AllChartQuarterly
                      title="Life insurance - new (in Cr.)"
                      type="area"
                      series= {[
                        {
                          name: "FY 22 Actuals",
                          data: [ ]
                        },
                        {
                          name: "FY 23 Budget",
                          data: [  ]
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [  ]
                        }
                      ]}
                    />
                    </div>
                    <div style={{width : "32%" }}>
                    <AllChartQuarterly
                      title="Life insurance - renewal (in Cr.)"
                      type="bar"
                      series= {[
                        {
                          name: "FY 22 Actuals",
                          data: [   ]
                        },
                        {
                          name: "FY 23 Budget",
                          data: [   ]
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [   ]
                        }
                      ]}
                    />
                    </div>
                  </Box>

                </Box>
              </CardContent>
            </Card>

          </div>
        </div>

        <Divider />

        <Card sx={{backgroundColor: palette.neutral.light }}>
          
          <CardContent alignItems="center" alignContent="center" >
          <Box flexDirection={"column"} flexBasis={isNonMobileScreens ? "100%" : undefined} alignItems="center" alignContent="center">
          <div>
              <Typography variant="h1" color={"#FF0000"} sx={{ m: 1 }} align="center">
                Month wise data
              </Typography>
              <p>&nbsp;</p>
            </div>

                <AllChart
                  title="Revenue (in Cr.)"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 0.74, 0.93, 1.04, 0.92, 0.99, 1.04, 0.96, 0.90, 0.98, 0.91, 0.91, 1.14 ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93, 0.93 ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 0.85, 0.89, 0.88, 0.86, 0.96, 1.01, 0.92, 0.92, 0.96, 0.94, 0.87, 0.91 ]
                    }
                  ]}
                  //colors={["#275be8", "#c4e8ef"]}
                 />

                 <Divider>
                  <p>&nbsp;</p>
                 </Divider>
                 
                 <AllChart
                  title="PBT (in Cr.)"
                  //type="line"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 0.06, 0.15, 0.30, 0.12, 0.21, 0.30, 0.18, 0.14, 0.34, 0.15, 0.16, 0.57 ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19 ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 0.11, 0.12, 0.24, 0.13, 0.13, 0.27, 0.21, 0.23, 0.28, 0.21, 0.19, 0.21 ]
                    }
                  ]}
                 />

                 <Divider>
                  <p>&nbsp;</p>
                 </Divider>
                 
                 <AllChart
                  title="EBIDTA (in Cr.)"
                  type="bar"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 0.07, 0.16, 0.30, 0.14, 0.23, 0.30, 0.20, 0.15, 0.34, 0.17, 0.17, 0.60 ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21, 0.21 ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 0.12, 0.13, 0.24, 0.14, 0.15, 0.27, 0.23, 0.24, 0.29, 0.22, 0.20, 0.17 ]
                    }
                  ]}
                 />

                 <Divider>
                  <p>&nbsp;</p>
                 </Divider>
                 
                 <AllChart
                  title="Number of active clients - Retail"
                  //type="bar"
                  type="area"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 1648, 1808, 1825, 2115, 1858, 1972, 2011, 1940, 1831, 1953, 1810, 2093 ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000 ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 1899, 1937, 1738, 1692, 1870, 2073, 1657, 1974, 1877, 1721, 1690, 1859 ]
                    }
                  ]}
                 />


                 <Divider>
                  <p>&nbsp;</p>
                 </Divider>
                 
                 <AllChart
                  title="Number of active clients - Institutional"
                  type="bar"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 8, 11, 13, 14, 12, 12, 12, 12, 11, 8, 10, 11 ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13 ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 9, 11, 13, 4, 11, 10, 8, 9, 10, 5, 9, 8 ]
                    }
                  ]}
                 />

                  <Divider>
                    <p>&nbsp;</p>
                  </Divider>
                 
                 <AllChart
                  title="Number of active clients - DP"
                  type="bar"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 13424, 13482, 13546, 13641, 13726, 13800, 13952, 14048, 14146, 14231, 14310, 14310 ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 14000, 14000, 14000, 14000, 14000, 14000, 14000, 14000, 14000, 14000, 14000, 14000 ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 14374, 14461, 14534, 14592, 14655, 14689, 14735, 14798, 14884, 14950, 15003, 15042 ]
                    }
                  ]}
                 />


                  <Divider>
                    <p>&nbsp;</p>
                  </Divider>
                 
                 <AllChart
                  title="Number of active business associates"
                  type="bar"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 76, 83, 87, 87, 88, 92, 97, 97, 101, 94, 90, ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 90, 90, 90, 94, 90, 90, 90, 95, 90, 90, 90, ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 95, 86, 84, 84, 89, 87, 91, 92, 82, 92, 95, 106 ]
                    }
                  ]}
                 />



              </Box>
          </CardContent>
        </Card>
        
      {/* </WidgetWrapper> */}
    </>
  );
};

export default PslDashboardWidget;
