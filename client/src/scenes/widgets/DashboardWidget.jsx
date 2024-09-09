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
import allProperties from "../../data/properties";

//import StatBox from "../../components/StatBox";
//import ProgressCircle from "../../components/ProgressCircle";

import PieChart from "components/charts/PieChart";
import LineChart from "components/charts/LineChart";
import LineChartQuarterly from "components/charts/LineChartQuarterly";
import AllChart from "components/charts/AllChart";
import AllChartQuarterly from "components/charts/AllChartQuarterly";
import MultipleRadialbars from "components/charts/MultipleRadialbars";

const DashboardWidget = ({ picturePath }) => {
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

  return (
    <>
      {/* <WidgetWrapper > */}
        <div style={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }}>
          <div style={{ minWidth: 260, flexDirection: "row" }} >
            <Box sx={{ display: 'flex', flexDirection: "row"   }} >
            <Card sx={{ minWidth: 250, height:"100%" }}>
              <CardMedia 
              sx={{ height: 140 }}
               image={phh_logo}
               title="Subsidiary Logo"
              />
              <CardContent>
              {/* <Typography variant="h4" component="div" >
                  Financial Year: 2022-23
                </Typography>
                <Divider ></Divider> */}

                <Typography variant="h5" component="div">
                  Revenue (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                ₹ 301.73 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  PBT (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                ₹ 44.57 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  EBITDA Margin (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  { Math.round((52.52/301.73)*100) } %
                </Typography>
                <Divider></Divider>
                <p>&nbsp;</p>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  ARBOP (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                ₹ 19352
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  ALOS (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  5.85 days.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                Total patients served (Indoor)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  19759
                </Typography>
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
                            data: [57, 69.02, 70.77, 58.74]
                          },
                          {
                            name: "FY 23 Budget",
                            data: [67.39, 71, 66.67, 71.64]
                          },
                          {
                            name: "FY 23 Actuals",
                            data: [67.72, 78.25, 78.36, 77.40]
                          }
                        ]}
                        //colors={["#275be8", "#c4e8ef"]}
                      />
                    </div>
                    <div style={{width : "39%" }}  >
                      {/* <AllChartQuarterly
                        title="PBT (in Cr.)"
                        type="bar"
                        series= {[
                          {
                            name: "FY 22 Actuals",
                            data: [4.51, 11.23, 11.57, -3.92 ]
                          },
                          {
                            name: "FY 23 Budget",
                            data: [8.3, 8.5, 7.87, 10.52 ]
                          },
                          {
                            name: "FY 23 Actuals",
                            data: [ 8.96, 12.02, 14.01, 9.58]
                          }
                        ]}
                      />  */}
                      <MultipleRadialbars
                      title="PBT (in Cr.)" />
                    </div>
                  </Box>

                  <Box style={{ display: "flex", flexDirection: "row", justifyContent: "space-between",   }} >
                  <div style={{width : "32%" }} >
                    <AllChartQuarterly
                      title="ARPOB (₹ per day)"
                      type="area"
                      series= {[
                        {
                          name: "FY 22 Actuals",
                          data: [ 19404, 17945, 19632, 19047]
                        },
                        {
                          name: "FY 23 Budget",
                          data: [ 18468, 18468, 18468, 18467 ]
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [ 21362, 19418, 20107, 21038 ]
                        }
                      ]}
                    />
                  </div>

                    <div style={{width : "32%" }}>
                    <AllChartQuarterly
                      title="ALOS (in days)"
                      type="bar"
                      series= {[
                        {
                          name: "FY 22 Actuals",
                          data: [ 8.02,	6.54,	6.37,	6.30 ]
                        },
                        {
                          name: "FY 23 Budget",
                          data: [ 6.75,	6.75,	6.75,	6.75 ]
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [ 5.85,	5.80,	5.73, 5.98  ]
                        }
                      ]}
                    />
                    </div>
                    <div style={{width : "32%" }}>
                    <AllChartQuarterly
                      title="Total no of patients served (Indoor)"
                      type="bar"
                      series= {[
                        {
                          name: "FY 22 Actuals",
                          data: [ 3093, 4453, 4373, 3941  ]
                        },
                        {
                          name: "FY 23 Budget",
                          data: [ 4117,	4311,	4022,	4350  ]
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [ 4599,	5147,	5118,	4895  ]
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
            <div alignItems="center" alignContent="center">
              <h1 color="#FF0000"  > Month wise data </h1>
            </div>

                <AllChart
                  title="Revenue (in Cr.)"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [20.28, 17.75, 18.96, 20.86, 23.44, 24.71, 20.57, 26.01, 24.17, 18.66, 20.05, 20.01]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [21.14, 21.89, 24.34, 23.17, 24.31, 23.49, 20.86, 22.99, 22.81, 24.63, 23.74, 23.26]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [21.07, 22.44, 24.19, 25.26, 26.57, 26.41, 23.76, 26.60, 27.99, 26.44, 26.59, 24.36]
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
                      data: [1.60,	1.40,	1.49,	2.07, 4.11, 5.04, .94, 7.10, 3.52, -1.07, -0.76, -2.08]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [2.36, 2.33, 3.60, 2.61, 3.02, 2.85, 2.26, 2.73, 2.86, 3.91, 3.54, 3.06  ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 2.66, 2.02, 4.26, 3.10, 5.59, 3.31, 3.59, 3.43, 6.98, 5.12, 5.27, -0.81 ]
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
                      data: [2.33, 2.04, 2.18, 2.87, 4.80, 5.67, 1.61, 7.73, 4.15, -0.36, -0.12, -0.26]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 3.00, 2.98, 4.27, 3.30, 3.69, 3.50, 2.93, 3.41, 3.54, 4.97, 4.32, 3.85  ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 3.24, 2.60, 4.84, 3.68, 6.22, 3.93, 4.37, 5.63, 6.83, 5.39, 5.82, -0.08  ]
                    }
                  ]}
                 />

                 <Divider>
                  <p>&nbsp;</p>
                 </Divider>
                 
                 <AllChart
                  title="ARPOB (₹ per day)"
                  //type="bar"
                  type="area"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [16627, 16704, 20071, 17610, 17348, 17062, 18408, 19094, 19404, 17945, 19632, 19047]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [18432, 18489, 17855, 18466, 19093, 18468, 18464, 18468, 18468, 18468, 18468, 18467 ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [18770, 17611, 19075, 20577, 15347, 20089, 18822, 20009, 21362, 19418, 20107, 21038 ]
                    }
                  ]}
                 />


                 <Divider>
                  <p>&nbsp;</p>
                 </Divider>
                 
                 <AllChart
                  title="ALOS (in days)"
                  type="bar"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 7.01,	9.41,	7.65,	6.68,	5.95,	6.98,	6.45,	6.39,	6.29,	6.68,	6.27,	5.96 ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 6.75,	6.75,	6.75,	6.75,	6.75,	6.75,	6.75,	6.75,	6.75,	6.75,	6.75,	6.75 ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 5.89,	5.83,	5.84,	5.55,	5.67,	6.2, 5.58,	5.62,	6.00,	5.98,	6, 5.98  ]
                    }
                  ]}
                 />

                <Divider>
                  <p>&nbsp;</p>
                </Divider>
                 
                 <AllChart
                  title="Total no of patients served (Indoor)"
                  type="line"
                  series= {[
                    {
                      name: "FY 22 Actuals",
                      data: [ 1260,	890, 943, 1353, 1567, 1533, 1398, 1475, 1500, 1191, 1223, 1527  ]
                    },
                    {
                      name: "FY 23 Budget",
                      data: [ 1289,	1336,	1492,	1403,	1477,	1431,	1297,	1347,	1378,	1490,	1452,	1408  ]
                    },
                    {
                      name: "FY 23 Actuals",
                      data: [ 1429,	1567,	1603,	1623,	1794,	1730,	1703,	1770,	1645,	1663,	1611,	1621  ]
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

export default DashboardWidget;
