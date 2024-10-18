import {
  Box,
  Divider,
  Typography,
  useTheme,
  Button,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
//
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import allProperties from "../../../data/properties";
import allData from "data/mis";

import AllChart from "components/charts/AllChart";
import AllChartQuarterly from "components/charts/AllChartQuarterly";
import Radialbar from "components/charts/Radialbar";
import AllChartYTD from "components/charts/AllChartYTD";
import AllChartQuarterlyRange from "components/charts/AllChartQuarterlyRange";

const HotelAllDashboardGraph = ({ propertyId, selectedYear }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  const [statePageData, setStatePageData] = useState({});
  //
  const [reportData, setReportData] = useState([]);
  //
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  const filturedProps = allProperties.filter(
    (property) => property._id === propertyId
  );
  // const reportData = allData.filter(
  //   (rawData) => rawData.propertyID === propertyId
  // );
  // console.log("***reportData***");
  // console.log(reportData);
  ///////////////////////////////////////////////////////////////////////////////////////////
  //
  //Load Dynamic Data
  const getMISData = async () => {
    console.log("Loading Data from Server, please wait");
    let propertyCode = "PHL-All"
    //"https://sheom.in/",
    //http://localhost:4000/mis?propertyCode=PHL&year=2024
    //alert("selectedYear: "+selectedYear)
    let misYear = Number(selectedYear.split("-")[1]);
    //alert("misYear: "+misYear)
    let responseURL ="http://localhost:4000/mis/cons?propertyCode=PHL&year=2025"
    //responseURL = `https://sheom.in/mis/cons?propertyCode=${propertyCode}&year=${misYear}`
    
    const response = await fetch(responseURL,
      {
        //const response = await fetch(`http://localhost:4000/mis?propertyCode=${propertyCode}&year=${new Date().getFullYear() + 1}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data) {
      // console.log("MIS Year: " + misYear);
      // console.log("*** MIS Data from server ***");
      // console.log(data);
      setReportData(data);
    } else {
      alert(
        "There is an error loading data from server. Please try after some time"
      );
      navigate("/home");
    }
  };
  //
  useEffect(() => {
    //getBudget();
    getMISData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  ///////////////////////////////////////////////////////////////////////////////////////////


  let yearArray = [];
  reportData.forEach((mis) => {
    yearArray.push(mis.year);
  });
  yearArray.sort();

  let endYear = selectedYear
    ? Number(selectedYear.split("-")[1])
    : yearArray[yearArray.length - 1];
  let YTD_year = 2025 ;
    /////////////////////Helper functions//////////////////////
  const getArraySum = (arr) => {
    let totalArrSum = 0;
    for (let i = 0; i < arr.length; i++) {
      totalArrSum += arr[i];
    }

    totalArrSum = Math.round((totalArrSum *= 100));
    return totalArrSum / 100;
  };

  //////////////////////////Helper functions////////////////
  let myPageData = {};
  const populatePageData = () => {
    myPageData = {
      endYear,
      lastYearRevenueArr: [],
      thisYearRevenueTargetArr: [],
      thisYearRevenueActualArr: [],

      lastYearPBTArr: [],
      thisYearPBTTargetArr: [],
      thisYearPBTActualArr: [],

      lastYearEBDITAArr: [],
      thisYearEBIDTATargetArr: [],
      thisYearEBIDTAActualArr: [],

      lastYearEBDITAmgn: [],
      thisYearEBIDTATargetmgn: [],
      thisYearEBIDTAActualmgn: [],

      lastYearOccupancyArr: [],
      thisYearOccupancyTargetArr: [],
      thisYearOccupancyActualArr: [],

      lastYearArrArr: [],
      thisYearArrTargetArr: [],
      thisYearArrActualArr: [],
    };
    //
    reportData.forEach((mis) => {
      if (Number(mis.year) === Number(endYear)) {
        myPageData.thisYearRevenueActualArr = [...mis.data.revenue.actual];
        myPageData.thisYearRevenueTargetArr = [...mis.data.revenue.target];

        myPageData.thisYearPBTActualArr = [...mis.data.PBT.actual];
        myPageData.thisYearPBTTargetArr = [...mis.data.PBT.target];

        myPageData.thisYearEBIDTAActualArr = [...mis.data.EBIDTA.actual];
        myPageData.thisYearEBIDTATargetArr = [...mis.data.EBIDTA.target];

        myPageData.thisYearEBIDTAActualmgn = [...mis.data.EBIDTA_mgn.actual];
        myPageData.thisYearEBIDTATargetmgn = [...mis.data.EBIDTA_mgn.target];

        myPageData.thisYearOccupancyActualArr = [...mis.data.occupancy.actual];
        myPageData.thisYearOccupancyTargetArr = [...mis.data.occupancy.target];

        myPageData.thisYearArrActualArr = [...mis.data.arr.actual];
        myPageData.thisYearArrTargetArr = [...mis.data.arr.target];
      } else if (Number(mis.year) === Number(endYear) - 1) {
        myPageData.lastYearRevenueArr = [...mis.data.revenue.actual];
        myPageData.lastYearPBTArr = [...mis.data.PBT.actual];
        myPageData.lastYearEBDITAArr = [...mis.data.EBIDTA.actual];
        myPageData.lastYearEBDITAmgn = [...mis.data.EBIDTA_mgn.actual];

        myPageData.lastYearOccupancyArr = [...mis.data.occupancy.actual];
        myPageData.lastYearArrArr = [...mis.data.arr.actual];
      }
    });
    for (let a = 0; a < 12; a++) {
      myPageData.lastYearEBDITAmgn[a] = Number(
        myPageData.lastYearEBDITAArr[a] / myPageData.lastYearRevenueArr[a]
      ).toFixed(2);
      myPageData.thisYearEBIDTAActualmgn[a] = Number(
        myPageData.thisYearEBIDTAActualArr[a] /
          myPageData.thisYearRevenueActualArr[a]
      ).toFixed(2);
      myPageData.thisYearEBIDTATargetmgn[a] = Number(
        myPageData.thisYearEBIDTATargetArr[a] /
          myPageData.thisYearRevenueTargetArr[a]
      ).toFixed(2);
      //End For Loop
    }
  };
  populatePageData();

  const { palette } = useTheme();

  const handleYearChange = (event) => {
    alert(event.target.value);
    endYear = event.target.value;
    populatePageData();
    setStatePageData(...myPageData);
  };

  const getOccupancy = (type) => {
    let resArr;
    //["PHK","PHD","PHH","PRPB", "PRM"]
    if (endYear === 2025){
      if (type === "actual") {
        resArr = [77,65, 87, 42, 18];
      } else {
        resArr = [88, 71, 90, 50, 27];
        //resArr = [87, 75, 90, 63, 31];
      }
      //resArr = [];
    }
    else if (endYear === 2024) {
      if (type === "actual") {
        resArr = [83, 67, 95, 51, 25];
        //resArr = [83, 68, 96, 49, 21];
      } else {
        resArr = [85, 74, 80, 71, 49];
      }
    } else {
      if (type === "actual") {
        resArr = [76, 65, 56, 38, 29];
      } else {
        resArr = [92, 72, 67, 74, 35];
      }
    }
    //alert("getOccupancy: tyep:"+type+" endYear: "+endYear+"Data:" +resArr)
    return resArr;
  };

  const getARR = (type) => {
    let resArr;
    //["PHK","PHD","PHH","PRPB", "PRM"]
    if (endYear === 2025) {
      if (type === "actual") {
        resArr = [4738, 2473, 3563, 3517, 3414 ];
      } else {
        resArr = [4913, 2622, 3720, 3772, 3937];
        //resArr = [5464, 2663, 3751, 4358, 4347];
      }
    }else if(endYear === 2024) {
      if (type === "actual") {
        resArr = [4978, 2463, 3309, 4198, 3969];
        //resArr = [4948, 2462, 3280, 4191, 4509];
      } else {
        resArr = [5156, 2580, 3490, 4700, 5000];
      }
    } else {
      if (type === "actual") {
        resArr = [4672, 2275, 2891, 4368, 3988];
      } else {
        resArr = [4803, 2350, 2352, 4536, 4073];
      }
    }
    return resArr;
  };

  const displayProperties = () => {
    if (filturedProps.length === 0) {
      return <h1>No Property is available for this user</h1>;
    } else {
      return <h1>Dashboard Page: {subsidiary}</h1>;
    }
  };
  //EBIDTA Margin Budgeted vs YTD Actual
  const getColor = (item) => {
    let returnArray = ["#0000FF", "#20C77D", "#FDFF00"];
    if (item === "EBIDTAmgn") {
      let budget; //= getArraySum([...myPageData.thisYearEBIDTATargetmgn])/12
      let actual; //= getArraySum([...myPageData.thisYearEBIDTAActualmgn])/(myPageData.thisYearEBIDTAActualmgn.length)
      budget =
        (getArraySum(
          myPageData.thisYearEBIDTATargetArr.slice(
            0,
            myPageData.thisYearEBIDTAActualArr.length
          )
        ) /
          getArraySum(
            myPageData.thisYearRevenueTargetArr.slice(
              0,
              myPageData.thisYearEBIDTAActualArr.length
            )
          )) *
        100;
      actual =
        (getArraySum(myPageData.thisYearEBIDTAActualArr) /
          getArraySum(myPageData.thisYearRevenueActualArr)) *
        100;
      if (actual < budget) {
        returnArray[2] = "#FF0000";
      } else {
        returnArray[2] = "#00FF00";
      }
    }
    return returnArray;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: isNonMobileScreens ? "row" : "column",
          marginBottom: "1rem",
        }}
      >
        <div style={{ minWidth: 260, flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Card sx={{ minWidth: 250, height: "100%" }}>
              <CardMedia
                sx={{ height: 140, marginTop: "1.5rem" }}
                image={filturedProps[0].photo}
                title="Subsidiary Logo"
              />
              <CardContent>
                <Typography variant="h5" component="div" marginTop="1rem">
                  Revenue (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{getArraySum(myPageData.thisYearRevenueActualArr)}Cr.
                  {endYear === YTD_year ? "(YTD)" : ""} of ₹
                  {getArraySum(myPageData.thisYearRevenueTargetArr)}Cr.
                </Typography>
                <Divider></Divider>
                <br />
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  PBT (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{getArraySum(myPageData.thisYearPBTActualArr)}Cr.
                  {endYear === YTD_year ? "(YTD)" : ""} of ₹
                  {getArraySum(myPageData.thisYearPBTTargetArr)}Cr.
                </Typography>
                <Divider></Divider>
                <br />
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  {/* EBITDA Margin (FY {yearArray[yearArray.length - 1]}) */}
                  EBITDA Margin (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {Math.round(
                    (getArraySum(myPageData.thisYearEBIDTAActualArr) /
                      getArraySum(myPageData.thisYearRevenueActualArr)) *
                      100
                  )}{" "}
                  % {endYear === YTD_year ? " - YTD" : ""}
                </Typography>
                <Divider></Divider>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
              </CardContent>
            </Card>
          </Box>
        </div>

        <div
          style={{
            width: "100%",
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
                    flexDirection: isNonMobileScreens ? "row" : "column",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <div style={{ width: isNonMobileScreens ? "59%" : "100%" }}>
                    <AllChartQuarterly
                      title="Revenue (in Cr.)"
                      type="bar"
                      series={[
                        {
                          name: `FY ${endYear - 1} Actuals`,
                          data: [
                            getArraySum([
                              myPageData.lastYearRevenueArr[0],
                              myPageData.lastYearRevenueArr[1],
                              myPageData.lastYearRevenueArr[2],
                            ]).toFixed(2),
                            getArraySum([
                              myPageData.lastYearRevenueArr[3],
                              myPageData.lastYearRevenueArr[4],
                              myPageData.lastYearRevenueArr[5],
                            ]).toFixed(2),
                            getArraySum([
                              myPageData.lastYearRevenueArr[6],
                              myPageData.lastYearRevenueArr[7],
                              myPageData.lastYearRevenueArr[8],
                            ]).toFixed(2),
                            getArraySum([
                              myPageData.lastYearRevenueArr[9],
                              myPageData.lastYearRevenueArr[10],
                              myPageData.lastYearRevenueArr[11],
                            ]).toFixed(2),
                          ],
                        },
                        {
                          name: `FY ${endYear} Budget`,
                          data: [
                            getArraySum([
                              myPageData.thisYearRevenueTargetArr[0],
                              myPageData.thisYearRevenueTargetArr[1],
                              myPageData.thisYearRevenueTargetArr[2],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueTargetArr[3],
                              myPageData.thisYearRevenueTargetArr[4],
                              myPageData.thisYearRevenueTargetArr[5],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueTargetArr[6],
                              myPageData.thisYearRevenueTargetArr[7],
                              myPageData.thisYearRevenueTargetArr[8],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueTargetArr[9],
                              myPageData.thisYearRevenueTargetArr[10],
                              myPageData.thisYearRevenueTargetArr[11],
                            ]),
                          ],
                          //[10.48, 10.97, 13.86, 13.82]
                        },
                        {
                          name_old: `FY ${endYear} Actuals${
                            endYear === YTD_year ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            getArraySum([
                              myPageData.thisYearRevenueActualArr[0],
                              myPageData.thisYearRevenueActualArr[1],
                              myPageData.thisYearRevenueActualArr[2],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueActualArr[3],
                              myPageData.thisYearRevenueActualArr[4],
                              myPageData.thisYearRevenueActualArr[5],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueActualArr[6],
                              myPageData.thisYearRevenueActualArr[7],
                              myPageData.thisYearRevenueActualArr[8],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueActualArr[9],
                              myPageData.thisYearRevenueActualArr[10],
                              myPageData.thisYearRevenueActualArr[11],
                            ]),
                          ],
                          //[9.40, 9.08, 11.27, 11.02]
                        },
                      ]}
                      //colors={["#275be8", "#c4e8ef"]}
                    />
                  </div>
                  <div style={{ width: isNonMobileScreens ? "39%" : "100%" }}>
                    <AllChartQuarterly
                      title="PBT (in Cr.)"
                      type="bar"
                      series={[
                        {
                          name: `FY ${endYear - 1} Actuals`,
                          data: [
                            getArraySum([
                              myPageData.lastYearPBTArr[0],
                              myPageData.lastYearPBTArr[1],
                              myPageData.lastYearPBTArr[2],
                            ]),
                            getArraySum([
                              myPageData.lastYearPBTArr[3],
                              myPageData.lastYearPBTArr[4],
                              myPageData.lastYearPBTArr[5],
                            ]),
                            getArraySum([
                              myPageData.lastYearPBTArr[6],
                              myPageData.lastYearPBTArr[7],
                              myPageData.lastYearPBTArr[8],
                            ]),
                            getArraySum([
                              myPageData.lastYearPBTArr[9],
                              myPageData.lastYearPBTArr[10],
                              myPageData.lastYearPBTArr[11],
                            ]),
                          ],
                          //PHK[ -2.71,	-0.62,	1.43,	0.13 ]
                        },
                        {
                          name: `FY ${endYear} Budget`,
                          data: [
                            getArraySum([
                              myPageData.thisYearPBTTargetArr[0],
                              myPageData.thisYearPBTTargetArr[1],
                              myPageData.thisYearPBTTargetArr[2],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTTargetArr[3],
                              myPageData.thisYearPBTTargetArr[4],
                              myPageData.thisYearPBTTargetArr[5],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTTargetArr[6],
                              myPageData.thisYearPBTTargetArr[7],
                              myPageData.thisYearPBTTargetArr[8],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTTargetArr[9],
                              myPageData.thisYearPBTTargetArr[10],
                              myPageData.thisYearPBTTargetArr[11],
                            ]),
                          ],

                          //data: [ 1.57,	1.93,	3.52,	4.10 ]
                        },
                        {
                          name_old: `FY ${endYear} Actuals${
                            endYear === YTD_year ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            getArraySum([
                              myPageData.thisYearPBTActualArr[0],
                              myPageData.thisYearPBTActualArr[1],
                              myPageData.thisYearPBTActualArr[2],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTActualArr[3],
                              myPageData.thisYearPBTActualArr[4],
                              myPageData.thisYearPBTActualArr[5],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTActualArr[6],
                              myPageData.thisYearPBTActualArr[7],
                              myPageData.thisYearPBTActualArr[8],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTActualArr[9],
                              myPageData.thisYearPBTActualArr[10],
                              myPageData.thisYearPBTActualArr[11],
                            ]),
                          ],
                          //data: [ 0.75,	0.37,	-0.81, 1.94  ]
                        },
                      ]}
                    />
                  </div>
                </Box>

                <Box
                  style={{
                    display: "flex",
                    flexDirection: isNonMobileScreens ? "row" : "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                    <AllChartQuarterly
                      title="Occupancy (in %)"
                      categories={["PHK", "PHD", "PHH", "PRPB", "PRM"]}
                      type="bar"
                      series={[
                        {
                          name: `FY ${endYear} Budget`,
                          data: getOccupancy(), //[ 90, 66, 60, 66, 20 ]
                          //data: `${ (endYear===2024)? [92, 73, 80, 70, 44] : [ 92, 72, 67, 74, 35] }`
                        },
                        {
                          name: `FY ${endYear} Actuals${
                            endYear === YTD_year ? "" : ""
                          }`,
                          data: getOccupancy("actual"),
                          //data: [ 62, 65, 45, 31, 16 ],
                        },
                      ]}
                    />
                  </div>
                  <div style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                    <AllChartQuarterly
                      title="Average Room Rate(in ₹)"
                      categories={["PHK", "PHD", "PHH", "PRPB", "PRM"]}
                      type="bar"
                      series={[
                        // {
                        //   name: `FY ${endYear - 1} Actuals`,
                        //   data: [ 2843, 2795, 3788, 4135, 3788  ],
                        //   data1: [
                        //     Math.round(
                        //       getArraySum([
                        //         myPageData.lastYearArrArr[0],
                        //         myPageData.lastYearArrArr[1],
                        //         myPageData.lastYearArrArr[2],
                        //       ]) / 3
                        //     ),
                        //     Math.round(
                        //       getArraySum([
                        //         myPageData.lastYearArrArr[3],
                        //         myPageData.lastYearArrArr[4],
                        //         myPageData.lastYearArrArr[5],
                        //       ]) / 3
                        //     ),
                        //     Math.round(
                        //       getArraySum([
                        //         myPageData.lastYearArrArr[6],
                        //         myPageData.lastYearArrArr[7],
                        //         myPageData.lastYearArrArr[8],
                        //       ]) / 3
                        //     ),
                        //     Math.round(
                        //       getArraySum([
                        //         myPageData.lastYearArrArr[9],
                        //         myPageData.lastYearArrArr[10],
                        //         myPageData.lastYearArrArr[11],
                        //       ]) / 3
                        //     ),
                        //   ],

                        // },
                        {
                          name: `FY ${endYear} Budget`,
                          data: getARR(),
                          //data: [ 4377,	4367,	5100,	5355, 4367  ],
                          data1: [
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrTargetArr[0],
                                myPageData.thisYearArrTargetArr[1],
                                myPageData.thisYearArrTargetArr[2],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrTargetArr[3],
                                myPageData.thisYearArrTargetArr[4],
                                myPageData.thisYearArrTargetArr[5],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrTargetArr[6],
                                myPageData.thisYearArrTargetArr[7],
                                myPageData.thisYearArrTargetArr[8],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrTargetArr[9],
                                myPageData.thisYearArrTargetArr[10],
                                myPageData.thisYearArrTargetArr[11],
                              ]) / 3
                            ),
                          ],
                        },
                        {
                          name: `FY ${endYear} Actuals${
                            endYear === YTD_year ? "" : ""
                          }`,
                          data: getARR("actual"),
                          //data: [4500, 4338, 4804, 5015, 4385],
                          data1: [
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrActualArr[0],
                                myPageData.thisYearArrActualArr[1],
                                myPageData.thisYearArrActualArr[2],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrActualArr[3],
                                myPageData.thisYearArrActualArr[4],
                                myPageData.thisYearArrActualArr[5],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrActualArr[6],
                                myPageData.thisYearArrActualArr[7],
                                myPageData.thisYearArrActualArr[8],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrActualArr[9],
                                myPageData.thisYearArrActualArr[10],
                                myPageData.thisYearArrActualArr[11],
                              ]) / 3
                            ),
                          ],
                        },
                      ]}
                    />
                  </div>
                  <div style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                    <AllChartQuarterlyRange
                      title={`Average Customer Rating${
                        endYear === 2025 ? " - Q2" : "- Q4"
                      }`}
                      subTitle={`scale of 1 to 5`}
                      categories={["PHK", "PHD", "PHH", "PRPB", "PRM"]}
                      type="bar"
                      series={[
                        {
                          name: endYear === 2023 ?`FY 2023 Q4`:
                                endYear === 2024 ?`FY 2024 Q4`
                                : `FY 2025 Q2`,
                          data:
                            endYear === 2023 ? []:
                            endYear === 2024 ? [4.2, 4.4, 4.5, 3.2, 4.2] 
                            : [ 4.65, 4.48, 4.48, 3.50, 4.68 ],
                        },
                      ]}
                      series_q3={[
                        {
                          name: `FY 2024 Q3`,
                          data:
                            endYear === 2024 ? [4.2, 4.1, 3.9, 3.8, 3.9] : [],
                        },
                      ]}
                      series_q2={[
                        {
                          name: `FY 2024 Q2`,
                          data:
                            endYear === 2024 ? [4.1, 3.9, 3.7, 3.8, 3.6] : [],
                        },
                      ]}
                      series_q1={[
                        {
                          name: `FY 2024 Q1`,
                          data:
                            endYear === 2024 ? [4.1, 4.1, 3.1, 3.7, 3.1] : [],
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
                <b>Month wise data</b>
              </Typography>
            </div>
            <Divider>&nbsp;</Divider>
            <br />
            <Box
              sx={{
                display: "flex",
                flexDirection: isNonMobileScreens ? "row" : "column",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ width: isNonMobileScreens ? "29%" : "100%" }}>
                <Radialbar
                  title="Revenue Budgetedvs YTD Actual"
                  series={[
                    `${(
                      (getArraySum([...myPageData.thisYearRevenueActualArr]) /
                        getArraySum([...myPageData.thisYearRevenueTargetArr])) *
                      100
                    ).toFixed(2)}`,
                  ]}
                />
              </Box>

              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="Revenue (in Cr.)"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearRevenueArr],
                      // //data: [
                      //   1.16, 0.24, 0.46, 1.43, 1.8, 2.1, 2.37, 3.5, 3.25, 0.96,
                      //   2.17, 2.46,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearRevenueTargetArr],
                      // data: [
                      //   3.45, 3.58, 3.45, 3.65, 3.8, 3.52, 4.15, 4.73, 4.97, 5.03,
                      //   4.14, 4.65,
                      // ],
                    },
                    {
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearRevenueActualArr],
                      // data: [
                      //   3.09, 3.25, 3.06, 3.28, 2.79, 3.02, 3.17, 3.74, 4.35, 4.25,
                      //   3.54, 3.24,
                      // ],
                    },
                  ]}
                  //colors={["#275be8", "#c4e8ef"]}
                />
              </Box>
            </Box>

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <Box
              sx={{
                display: "flex",
                flexDirection: isNonMobileScreens ? "row" : "column",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ width: isNonMobileScreens ? "29%" : "100%" }}>
                <Radialbar
                  title="EBIDTA Budgeted vs YTD Actual"
                  //series={[13.9]}
                  series={[
                    `${(
                      (getArraySum([...myPageData.thisYearEBIDTAActualArr]) /
                        getArraySum([...myPageData.thisYearEBIDTATargetArr])) *
                      100
                    ).toFixed(2)}`,
                  ]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="EBIDTA (in Cr.)"
                  type="bar"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearEBDITAArr],
                      // data: [
                      //   -0.32, -0.82, -0.6, -0.03, 0.01, 0.37, 0.49, 0.76, 1.14,
                      //   -0.46, 0.46, 0.52,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearEBIDTATargetArr],
                      // data: [
                      //   0.81, 0.92, 0.83, 0.98, 1.07, 0.87, 0.84, 1.49, 2.19, 2.29,
                      //   1.65, 1.65,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearEBIDTAActualArr],
                      // data: [
                      //   0.6, 0.54, 0.62, 0.53, 0.28, 0.59, 0.14, 0.74, -0.56, 1.47,
                      //   1.0, 0.49,
                      // ],
                    },
                  ]}
                />
              </Box>
            </Box>

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <Box
              sx={{
                display: "flex",
                flexDirection: isNonMobileScreens ? "row" : "column",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ width: isNonMobileScreens ? "29%" : "100%" }}>
                <Radialbar
                  title="PBT Budgeted vs YTD Actual"
                  //series={[13.9]}
                  series={[
                    `${(
                      (getArraySum([...myPageData.thisYearPBTActualArr]) /
                        getArraySum([...myPageData.thisYearPBTTargetArr])) *
                      100
                    ).toFixed(2)}`,
                  ]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="PBT (in Cr.)"
                  //type="line"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearPBTArr],
                      // data: [
                      //   -0.65, -1.14, -0.92, -0.35, -0.31, 0.05, 0.17, 0.44, 0.82,
                      //   -0.78, 0.43, 0.48,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearPBTTargetArr],
                      // data: [
                      //   0.48, 0.59, 0.5, 0.65, 0.74, 0.54, 0.51, 1.16, 1.86, 1.96,
                      //   1.07, 1.07,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearPBTActualArr],
                      // data: [
                      //   0.27, 0.2, 0.28, 0.19, -0.05, 0.23, -0.22, 0.37, -0.95,
                      //   1.07, 0.49, 0.38,
                      // ],
                    },
                  ]}
                />
              </Box>
            </Box>

            <Divider>
              <p>&nbsp;</p>
            </Divider>

            <Box
              sx={{
                display: "flex",
                flexDirection: isNonMobileScreens ? "row" : "column",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ width: isNonMobileScreens ? "29%" : "100%" }}>
                <AllChartYTD
                  title="EBIDTA Mgn Budgeted vs YTD Actual"
                  categories={["EBIDTA Margin"]}
                  type="bar"
                  // series={[
                  //   {
                  //     name: `FY ${endYear - 1} Actuals`,
                  //     data: [`${ Math.round(
                  //       getArraySum([...myPageData.lastYearEBDITAmgn])/12
                  //       )
                  //      }`],
                  //   },
                  //   {
                  //     name: `FY ${endYear} Budget`,
                  //     data: [`${ Math.round(
                  //       getArraySum([...myPageData.thisYearEBIDTATargetmgn])/12
                  //       )
                  //      }`],
                  //   },
                  //   {
                  //     name: `FY ${endYear}  Actuals${ (endYear===2024)?"(YTD)":"" }`,
                  //     data: [`${ Math.round(
                  //       getArraySum([...myPageData.thisYearEBIDTAActualmgn])/(myPageData.thisYearEBIDTAActualmgn.length)
                  //       )
                  //      }`],
                  //   },
                  // ]}
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [
                        `${Math.round(
                          (getArraySum([...myPageData.lastYearEBDITAArr]) /
                            getArraySum([...myPageData.lastYearRevenueArr])) *
                            100
                        )}`,
                      ],
                    },
                    {
                      name: `FY ${endYear} Budget${
                        endYear >= 2024 ? "(YTD)" : ""
                      }`,
                      data: [
                        `${Math.round(
                          (getArraySum(
                            myPageData.thisYearEBIDTATargetArr.slice(
                              0,
                              myPageData.thisYearEBIDTAActualArr.length
                            )
                          ) /
                            getArraySum(
                              myPageData.thisYearRevenueTargetArr.slice(
                                0,
                                myPageData.thisYearEBIDTAActualArr.length
                              )
                            )) *
                            100
                        )}`,
                      ],
                    },
                    {
                      name: `FY ${endYear}  Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      data: [
                        `${Math.round(
                          (getArraySum(myPageData.thisYearEBIDTAActualArr) /
                            getArraySum(myPageData.thisYearRevenueActualArr)) *
                            100
                        )}`,
                      ],
                    },
                  ]}
                  colors={getColor("EBIDTAmgn")}
                  //colors={["#0000FF", "#22FF22", "#FF0000"]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="EBIDTA Margin (in %)"
                  type="bar"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearEBDITAmgn],
                      // data: [
                      //   -0.32, -0.82, -0.6, -0.03, 0.01, 0.37, 0.49, 0.76, 1.14,
                      //   -0.46, 0.46, 0.52,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearEBIDTATargetmgn],
                      // data: [
                      //   0.81, 0.92, 0.83, 0.98, 1.07, 0.87, 0.84, 1.49, 2.19, 2.29,
                      //   1.65, 1.65,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearEBIDTAActualmgn],
                      // data: [
                      //   0.6, 0.54, 0.62, 0.53, 0.28, 0.59, 0.14, 0.74, -0.56, 1.47,
                      //   1.0, 0.49,
                      // ],
                    },
                  ]}
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* </WidgetWrapper> */}
    </>
  );
};

export default HotelAllDashboardGraph;
