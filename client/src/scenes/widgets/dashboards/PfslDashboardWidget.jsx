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

const PfslDashboardWidget = ({ propertyId }) => {
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
                  ₹ 10.97 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  PBT (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹ 3.24 Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  EBITDA Margin (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {Math.round((5.35 / 10.97) * 100)} %
                </Typography>
                <Divider></Divider>

                <p>&nbsp;</p>
                <p>&nbsp;</p>

                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Overall yield(%) (FY 23)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  14 %
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Overall CoF(%)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  10 %
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
                          data: [0.43, 0.48, 0.57, 0.64],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [0.72, 0.86, 1.03, 1.17],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [0.71, 0.88, 0.97, 1.1],
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
                          data: [0.14, 0.14, 0.19, 0.19],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [0.2, 0.18, 0.28, 0.29],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [0.21, 0.22, 0.3, 0.35],
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
                      title="EBIDTA (in Cr.)"
                      type="bar"
                      series={[
                        {
                          name: "FY 22 Actuals",
                          data: [0.16, 0.16, 0.21, 0.21],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [0.33, 0.39, 0.54, 0.62],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [0.31, 0.42, 0.5, 0.56],
                        },
                      ]}
                    />
                  </div>

                  <div style={{ width: "32%" }}>
                    <AllChartQuarterly
                      title="Overall yield(%)"
                      type="area"
                      series={[
                        {
                          name: "FY 22 Actuals",
                          data: [12.25, 12.25, 12.5, 12.73],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [14.01, 14.01, 14.01, 14.01],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [13.1, 13.84, 14.41, 14.82],
                        },
                      ]}
                    />
                  </div>
                  <div style={{ width: "32%" }}>
                    <AllChartQuarterly
                      title="Overall CoF(%)"
                      type="bar"
                      series={[
                        {
                          name: "FY 22 Actuals",
                          data: [10.7, 10.7, 10.7, 10.7],
                        },
                        {
                          name: "FY 23 Budget",
                          data: [10.45, 10.45, 10.45, 10.45],
                        },
                        {
                          name: "FY 23 Actuals",
                          data: [10.45, 10.45, 10.45, 10.45],
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
              <Typography variant="h1" color={"#FF0000"} sx={{ m: 1 }} align="center">
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
                    0.39, 0.42, 0.49, 0.45, 0.47, 0.52, 0.57, 0.53, 0.61, 0.6,
                    0.61, 0.72,
                  ],
                },
                {
                  name: "FY 23 Budget",
                  data: [
                    0.69, 0.72, 0.76, 0.81, 0.86, 0.91, 0.97, 1.03, 1.10, 1.16, 1.16, 1.17
                  ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [
                    0.65, 0.73, 0.76, 0.80, 0.88, 0.95, 0.92, 0.99, 1.00, 0.97, 1.05, 1.29
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
                    0.10, 0.14, 0.18, 0.15, 0.11, 0.16, 0.18, 0.15, 0.25, 0.24, 0.26, 0.08
                  ],
                },
                {
                  name: "FY 23 Budget",
                  data: [
                    0.20, 0.20, 0.19, 0.15, 0.17, 0.22, 0.27, 0.28, 0.30, 0.28, 0.29, 0.29
                  ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [
                    0.21, 0.24, 0.19, 0.20, 0.23, 0.24, 0.28, 0.30, 0.30, 0.30, 0.40, 0.35
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
                    0.12, 0.16, 0.20, 0.17, 0.13, 0.18, 0.20, 0.17, 0.27, 0.26, 0.28, 0.10
                  ],
                },
                {
                  name: "FY 23 Budget",
                  data: [
                    0.29, 0.32, 0.37, 0.34, 0.39, 0.45, 0.49, 0.55, 0.59, 0.61, 0.62, 0.62
                  ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [
                    0.28, 0.33, 0.32, 0.37, 0.43, 0.45, 0.48, 0.51, 0.51, 0.51, 0.60, 0.56
                  ],
                },
              ]}
            />

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <AllChart
              title="Overall yield(%)"
              //type="bar"
              type="area"
              series={[
                {
                  name: "FY 22 Actuals",
                  data: [ 12.25, 12.25, 12.25, 12.25, 12.25, 12.25, 12.50, 12.50, 12.50, 12.50, 12.75, 12.96 ],
                },
                {
                  name: "FY 23 Budget",
                  data: [ 14.01, 14.01, 14.01, 14.01, 14.01, 14.01, 14.01, 14.01, 14.01, 14.01, 14.01, 14.01 ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [ 12.96, 13.02, 13.34, 13.26, 13.99, 14.27, 14.33, 14.52, 14.4, 14.46, 14.98, 15.02 ],
                },
              ]}
            />

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <AllChart
              title="Overall CoF(%)"
              type="bar"
              series={[
                {
                  name: "FY 22 Actuals",
                  data: [
                    10.7, 10.7, 10.7, 10.7, 10.7, 10.7, 10.7, 10.7, 10.7, 10.7, 10.7, 10.7
                  ],
                },
                {
                  name: "FY 23 Budget",
                  data: [
                    10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45
                  ],
                },
                {
                  name: "FY 23 Actuals",
                  data: [
                    10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45, 10.45
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

export default PfslDashboardWidget;
