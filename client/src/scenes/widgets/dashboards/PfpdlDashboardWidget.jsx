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

const PfpdlDashboardWidget = ({ propertyId }) => {
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
      <div
        style={{ display: "flex", flexDirection: "row", marginBottom: "1rem" }}
      >
        <div style={{ minWidth: 260, flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Card sx={{ minWidth: 250, height: "100%" }}>
              <CardMedia
                sx={{ height: 140, marginTop: "1.5rem" }}
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
                  ₹ 15.00 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  PBT (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹ 1.10 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  EBITDA Margin (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {Math.round((0.64 / 15.0) * 100)} %
                </Typography>
                <Divider></Divider>

                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Health insurance (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹ 1.06 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Life Insurance - new (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹ 9 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Life Insurance-renewal(FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹ 4.50 Cr.
                </Typography>
                <Divider></Divider>
                {/* <Typography variant="h5" component="div" marginTop={"1rem"}>
                  &nbsp;
                </Typography> */}

                {/* <Divider></Divider> */}
              </CardContent>
            </Card>
          </Box>
        </div>

        <div
          style={{
            width: "100%",
            marginLeft: "1rem",
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              backgroundColor: palette.neutral.light,
            }}
          >
            {/* 
                line, area, bar, radar, histogram, pie, donut, radialBar, scatter, bubble, heatmap, candlestick
              */}
            <CardContent>
              <Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <div style={{ width: "59%" }}>
                    <AllChartQuarterly
                      title="Revenue (in Cr.)"
                      series={[
                        {
                          name: "FY 22 Actuals",
                          data: [2.01, 3.0, 3.58, 5.41],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [2.45, 3.7, 4.36, 6.64],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [2.44, 3.39, 3.38, 5.8],
                        },
                      ]}
                      //colors={["#275be8", "#c4e8ef"]}
                    />
                  </div>
                  <div style={{ width: "39%" }}>
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
                      series={[
                        {
                          name: "FY 22 Actuals",
                          data: [-1.52, -0.39, 0.21, 1.86],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [-1.33, -0.05, 0.65, 2.92],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [-0.66, 0.06, -0.64, 2.35],
                        },
                      ]}
                    />
                  </div>
                </Box>

                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "32%" }}>
                    <AllChartQuarterly
                      title="Health insurance (in Cr.)"
                      type="bar"
                      series={[
                        {
                          name: "FY 22 Actuals",
                          data: [0.2, 0.24, 0.21, 0.3],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [0.2, 0.26, 0.27, 0.35],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [0.2, 0.23, 0.23, 0.39],
                        },
                      ]}
                    />
                  </div>

                  <div style={{ width: "32%" }}>
                    <AllChartQuarterly
                      title="Life insurance - new (in Cr.)"
                      type="area"
                      series={[
                        {
                          name: "FY 22 Actuals",
                          data: [0.86, 1.4, 2.08, 3.3],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [1.19, 2.06, 2.62, 4.04],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [1.28, 2.06, 2.03, 3.63],
                        },
                      ]}
                    />
                  </div>
                  <div style={{ width: "32%" }}>
                    <AllChartQuarterly
                      title="Life insurance - renewal (in Cr.)"
                      type="bar"
                      series={[
                        {
                          name: "FY 22 Actuals",
                          data: [0.85, 1.22, 1.16, 1.68],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [0.91, 1.18, 1.22, 1.9],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [0.86, 0.98, 1.01, 1.65],
                        },
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

      <Card sx={{ backgroundColor: palette.neutral.light }}>
        <CardContent alignItems="center" alignContent="center">
          <Box
            flexDirection={"column"}
            flexBasis={isNonMobileScreens ? "100%" : undefined}
            alignItems="center"
            alignContent="center"
          >
            <div>
              <Typography
                variant="h1"
                color={"#FF0000"}
                sx={{ m: 1 }}
                align="center"
              >
                Month wise data
              </Typography>
              <p>&nbsp;</p>
            </div>

            <AllChart
              title="Revenue (in Cr.)"
              series={[
                {
                  name: "FY 22 Actuals",
                  data: [
                    0.77, 0.41, 0.82, 0.75, 1.17, 1.09, 0.99, 1.03, 1.56, 1.11,
                    1.49, 2.82,
                  ],
                },
                {
                  name: "FY 23 Budget",
                  data: [
                    0.71, 0.72, 1.02, 1.02, 1.28, 1.41, 0.97, 1.49, 1.9, 1.73,
                    1.78, 3.13,
                  ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [
                    0.78, 0.66, 0.99, 0.89, 1.21, 1.29, 0.82, 1.14, 1.42, 1.24,
                    1.32, 3.24,
                  ],
                },
              ]}
              //colors={["#275be8", "#c4e8ef"]}
            />

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <AllChart
              title="PBT (in Cr.)"
              //type="line"
              series={[
                {
                  name: "FY 22 Actuals",
                  data: [
                    -0.15, -0.94, -0.43, -0.28, -0.17, 0.06, -0.06, -0.13, 0.4,
                    0.0, 0.35, 1.51,
                  ],
                },
                {
                  name: "FY 23 Budget",
                  data: [
                    -0.55, -0.54, -0.24, -0.24, 0.03, 0.16, -0.27, 0.25, 0.67,
                    0.5, 0.57, 1.85,
                  ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [
                    -0.1, -0.23, -0.33, -0.31, 0.25, 0.12, -0.54, 0.11, -0.21,
                    0.04, 0.24, 2.07,
                  ],
                },
              ]}
            />

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <AllChart
              title="EBIDTA (in Cr.)"
              type="bar"
              series={[
                {
                  name: "FY 22 Actuals",
                  data: [
                    -0.32, -0.82, -0.6, -0.03, 0.01, 0.37, 0.49, 0.76, 1.14,
                    -0.46, 0.46, 0.52,
                  ],
                },
                {
                  name: "FY 23 Budget",
                  data: [
                    0.81, 0.92, 0.83, 0.98, 1.07, 0.87, 0.84, 1.49, 2.19, 2.29,
                    1.65, 1.65,
                  ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [
                    0.6, 0.54, 0.62, 0.53, 0.28, 0.59, 0.14, 0.74, -0.56, 1.47,
                    1.0, 0.49,
                  ],
                },
              ]}
            />

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <AllChart
              title="Occupancy (in %)"
              //type="bar"
              type="area"
              series={[
                {
                  name: "FY 22 Actuals",
                  data: [33, 5, 14, 55, 64, 77, 77, 71, 79, 21, 60, 63],
                },
                {
                  name: "FY 23 Budget",
                  data: [95, 88, 88, 92, 95, 90, 90, 93, 95, 95, 93, 84],
                },
                {
                  name: "FY 23 Actuals",
                  data: [62, 64, 61, 76, 62, 73, 65, 89, 96, 91, 95, 77],
                },
              ]}
            />

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <AllChart
              title="Average Room Rate (₹ per day)"
              type="bar"
              series={[
                {
                  name: "FY 22 Actuals",
                  data: [
                    3195, 2537, 2799, 2713, 2762, 2910, 2910, 4025, 4431, 4161,
                    4094, 4150,
                  ],
                },
                {
                  name: "FY 23 Budget",
                  data: [
                    4376, 4378, 4377, 4365, 4356, 4380, 4495, 5479, 5325, 5445,
                    5221, 5399,
                  ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [
                    4435, 4523, 4543, 4412, 4300, 4303, 4589, 4813, 5008, 5185,
                    5186, 4675,
                  ],
                },
              ]}
            />
          </Box>
        </CardContent>
      </Card>

      {/* </WidgetWrapper> */}
    </>
  );
};

export default PfpdlDashboardWidget;
