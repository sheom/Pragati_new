import {
  Box,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
//
import { useState, useEffect } from "react";
//import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import allProperties from "../../../data/properties";
//import allData from "data/mis";

import AllChart from "components/charts/AllChart";
import AllChartQuarterly from "components/charts/AllChartQuarterly";
import Radialbar from "components/charts/Radialbar";
import AllChartYTD from "components/charts/AllChartYTD";
import AllChartQuarterlyRange from "components/charts/AllChartQuarterlyRange";
import AllChartRange from "components/charts/AllChartRange";

const HospitalDashboardGraph = ({ propertyId, propertyCode, selectedYear }) => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  //const subsidiary = useSelector((state) => state.user.subsidiary);
  //const [statePageData, setStatePageData] = useState({});
  const [reportData, setReportData] = useState([]);
  //
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  //alert("isNonMobileScreens: "+isNonMobileScreens);

  const filturedProps = allProperties.filter(
    //(property) => property.subsidiary === subsidiary
    (property) => property._id === propertyId
  );
  //let reportData = []
  //
  //Load Dynamic Data
  const getMISData = async () => {
    console.log("Loading Data from Server, please wait");
    //let propertyCode = "PIK"
    //"https://sheom.in/",
    //http://localhost:4000/mis?propertyCode=PHL&year=2024
    let misYear = Number(selectedYear.split("-")[1]);
    const response = await fetch(
      `https://sheom.in/mis/new?propertyCode=${propertyCode}&year=${ misYear }`,
      {
    //  const response = await fetch(`http://localhost:4000/mis?propertyCode=${propertyCode}&year=${ misYear }`, {
    // const response = await fetch(
    //   `http://localhost:4000/mis?propertyCode=PHH&year=2024`,
    //   {
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
      //reportData = data;
      //setFormData(data.payload);
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

  // let localData = allData.filter(
  //   (rawData) => rawData.propertyID === propertyId
  // );
  //reportData  = [...localData]
  // console.log("***reportData*** from Dashboard Graph");
  // console.log(reportData);

  let yearArray = [];
  reportData.forEach((mis) => {
    yearArray.push(mis.year);
  });
  yearArray.sort();
  //console.log(yearArray);

  let endYear = selectedYear
    ? Number(selectedYear.split("-")[1])
    : yearArray[yearArray.length - 1];
  //

  /////////////////////Helper functions//////////////////////
  const getArraySum = (arr) => {
    let totalArrSum = 0;
    for (let i = 0; i < arr.length; i++) {
      totalArrSum += arr[i];
    }

    totalArrSum = Math.round((totalArrSum *= 100));
    return totalArrSum / 100;
  };
  //
  const getRevPar = (Occupancy, arr) => {
    let revArr = [];
    for (let i = 0; i < Occupancy.length; i++) {
      revArr[i] = Math.round((Occupancy[i] * arr[i]) / 100);
    }
    return revArr;
  };

  //////////////////////////Helper functions////////////////
  let myPageData = {};
  const populatePageData = () => {
    myPageData = {
      endYear,
      //revenue
      lastYearRevenueArr: [],
      thisYearRevenueTargetArr: [],
      thisYearRevenueActualArr: [],

      //PBT
      lastYearPBTArr: [],
      thisYearPBTTargetArr: [],
      thisYearPBTActualArr: [],

      //EBIDTA
      lastYearEBDITAArr: [],
      thisYearEBIDTATargetArr: [],
      thisYearEBIDTAActualArr: [],

      //EBIDTA_mgn
      lastYearEBDITAmgn: [],
      thisYearEBIDTATargetmgn: [],
      thisYearEBIDTAActualmgn: [],

      //Occupancy
      lastYearOccupancyTarget: [],
      lastYearOccupancyQuatTarget : [],
      lastYearOccupancyActual: [],
      lastYearOccupancyActualYTD: [],
      lastYearOccupancyQuatActual: [],
      //
      thisYearOccupancyTarget: [],
      thisYearOccupancyQuatTarget: [],
      thisYearOccupancyActual: [],
      thisYearOccupancyQuatActual: [],
      thisYearOccupancyActualYTD: [],

      //ALOS
      lastYearALOSActual: [],
      lastYearALOSActualYTD: [],
      lastYearALOSQuatActual: [],
      //
      thisYearALOSTarget: [],
      thisYearALOSQuatTarget: [],
      thisYearALOSQuatActual: [],
      thisYearALOSActual: [],
      thisYearALOSActualYTD: [],

      //ARPOB
      lastYearARPOBActual: [],
      lastYearARPOBActualYTD: [],
      lastYearARPOBQuatActual: [],
      //
      thisYearARPOBTarget: [],
      thisYearARPOBQuatTarget: [],
      thisYearARPOBQuatActual: [],
      thisYearARPOBActual: [],
      thisYearARPOBActualYTD: [],

      //int_rev
      //lastYearIntRevArr: [],
      thisYearIntRevTargetArr: [],
      thisYearIntRevActualArr: [],
      lastYearIntRevTargetArr:[],
      lastYearIntRevActualArr:[],

      //indoor_patients
      lastYearIndoorPatientActualArr: [],
      thisYearIndoorPatientTargetArr: [],
      thisYearIndoorPatientActualArr: [],
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
        //
        //alert()
        //myPageData.lastYearIntRevArr = [...mis.data.lastYearIntRevArr];
        //
        myPageData.thisYearIntRevTargetArr = [...mis.data.int_rev.target];
        myPageData.thisYearIntRevActualArr = [...mis.data.int_rev.actual];
        //
        myPageData.thisYearIndoorPatientTargetArr = [
          ...mis.data.indoor_patients.target,
        ];
        myPageData.thisYearIndoorPatientActualArr = [
          ...mis.data.indoor_patients.actual,
        ];
        //
        myPageData.thisYearOccupancyTarget = [...mis.data.occupancy.target];
        myPageData.thisYearOccupancyQuatTarget = [...mis.data.occupancy.target_q];
        myPageData.thisYearOccupancyQuatActual = [...mis.data.occupancy.actual_q];
        myPageData.thisYearOccupancyActual = [...mis.data.occupancy.actual];
        myPageData.thisYearOccupancyActualYTD = [...mis.data.occupancy.actual_ytd];
        //
        myPageData.thisYearALOSTarget = [...mis.data.ALOS.target];

        myPageData.thisYearALOSQuatTarget = [...mis.data.ALOS.target_q];
        myPageData.thisYearALOSQuatActual = [...mis.data.ALOS.actual_q];
        
        myPageData.thisYearALOSActual = [...mis.data.ALOS.actual];
        myPageData.thisYearALOSActualYTD = [...mis.data.ALOS.actual_ytd];
        //
        myPageData.thisYearARPOBTarget = [...mis.data.ARPOB.target];

        myPageData.thisYearARPOBQuatTarget = [...mis.data.ARPOB.target_q];
        myPageData.thisYearARPOBQuatActual = [...mis.data.ARPOB.actual_q];

        myPageData.thisYearARPOBActual = [...mis.data.ARPOB.actual];
        myPageData.thisYearARPOBActualYTD = [...mis.data.ARPOB.actual_ytd];
        //
      } else if (Number(mis.year) === Number(endYear - 1)) {
        myPageData.lastYearRevenueArr = mis.data.revenue.actual
          ? [...mis.data.revenue.actual]
          : [];
        myPageData.lastYearPBTArr = mis.data.PBT.actual
          ? [...mis.data.PBT.actual]
          : [];
        myPageData.lastYearEBDITAArr = [...mis.data.EBIDTA.actual];
        myPageData.lastYearEBDITAmgn = [...mis.data.EBIDTA_mgn.actual];
        //
        //

        myPageData.lastYearIntRevTargetArr = [...mis.data.int_rev.target];
        myPageData.lastYearIntRevActualArr = [...mis.data.int_rev.actual];
        //
        myPageData.lastYearIndoorPatientTargetArr = [
          ...mis.data.indoor_patients.target,
        ];
        myPageData.lastYearIndoorPatientActualArr = [
          ...mis.data.indoor_patients.actual,
        ];
        //
        myPageData.lastYearOccupancyTarget = [...mis.data.occupancy.target];
        myPageData.lastYearOccupancyQuatTarget = [...mis.data.occupancy.target_q];
        myPageData.lastYearOccupancyActual = [...mis.data.occupancy.actual];
        myPageData.lastYearOccupancyActualYTD = [...mis.data.occupancy.actual_ytd];
        myPageData.lastYearOccupancyQuatActual = [...mis.data.occupancy.actual_q];
        //
        myPageData.lastYearALOSTarget = [...mis.data.ALOS.target];
        myPageData.lastYearALOSQuatTarget = [...mis.data.ALOS.target_q];
        myPageData.lastYearALOSActual = [...mis.data.ALOS.actual];
        myPageData.lastYearALOSQuatActual = [...mis.data.ALOS.actual_q];
        myPageData.lastYearALOSActualYTD = [...mis.data.ALOS.actual_ytd];
        //
        myPageData.lastYearARPOBTarget = [...mis.data.ARPOB.target];
        myPageData.lastYearARPOBQuatTarget = [...mis.data.ARPOB.target_q];
        myPageData.lastYearARPOBQuatActual = [...mis.data.ARPOB.actual_q];
        myPageData.lastYearARPOBActual = [...mis.data.ARPOB.actual];
        myPageData.lastYearARPOBActualYTD = [...mis.data.ARPOB.actual_ytd];
        //
        //
      }
    });
    console.log("*** myPageData ***");
    console.log(myPageData);
    console.log("*** End myPageData ***");
  };

  populatePageData();

  const { palette } = useTheme();

  //EBIDTA Margin Budgeted vs YTD Actual
  const getColor = (item) => {
    let budget, actual;
    let returnArray = ["#0000FF", "#20C77D", "#FDFF00"];
    if (item === "EBIDTAmgn") {
      budget = Math.round(
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
      );

      actual = Math.round(
        (getArraySum(myPageData.thisYearEBIDTAActualArr) /
          getArraySum(myPageData.thisYearRevenueActualArr)) *
          100
      );
      //alert("EBIDTA Mgn: Budget: "+ budget +" Actual: "+actual);
    }
    if (item === "Occupancy") {
      budget =
        myPageData.thisYearOccupancyQuatTarget[
          myPageData.thisYearOccupancyQuatTarget.length - 1
        ];
      actual =
        myPageData.thisYearOccupancyActualYTD[
          myPageData.thisYearOccupancyActualYTD.length - 1
        ];
    }
    if (item === "ALOS") {
      actual =
        myPageData.thisYearALOSQuatTarget[
          myPageData.thisYearALOSQuatTarget.length - 1
        ];
      budget =
        myPageData.thisYearALOSActualYTD[
          myPageData.thisYearALOSActualYTD.length - 1
        ];
    }
    if (item === "ARPOB") {
      budget =
        myPageData.thisYearARPOBQuatTarget[
          myPageData.thisYearARPOBQuatTarget.length - 1
        ];
      actual =
        myPageData.thisYearARPOBActualYTD[
          myPageData.thisYearARPOBActualYTD.length - 1
        ];
    }

    if (actual < budget ) {
      returnArray[2] = "#FF0000";
    } else {
      returnArray[2] = "#00FF00";
    }

    return returnArray;
  };

  const getRating = () => {
    //alert( JSON.stringify(filturedProps[0].propertyCode) )
    //{["PIK","PID","PIH","PRPB", "PRM"]}
    let propCode = filturedProps[0].propertyCode;
    let returnArray = [];
    if (endYear === 2024) {
      if (propCode === "PIK") {
        returnArray = [4.3, 4.0, 3.9, 4.1];
      }
      if (propCode === "PID") {
        returnArray = [4.0, 4.5, 3.8, 3.9];
      }
      if (propCode === "PIH") {
        returnArray = [3.8, 4.5, 3.5, 3.6];
      }
      if (propCode === "PRPB") {
        returnArray = [3.8, 4.0, 3.5, 3.5];
      }
      if (propCode === "PRM") {
        returnArray = [3.8, 4.0, 3.9, 3.8];
      }
    }
    return returnArray;
  };

  const getOccupancy_ytd = () => {
    let returnValue = "";
    // if (endYear === 2024) {
    //   returnValue =
    //     myPageData.thisYearOccupancyActualYTDArr[
    //       myPageData.thisYearOccupancyActualYTDArr.length - 1
    //     ];
    // } else {
    //   returnValue = Math.round(
    //     getArraySum(myPageData.thisYearOccupancyActualArr) /
    //       myPageData.thisYearOccupancyActualArr.length
    //   );
    // }
    returnValue =
      myPageData.thisYearOccupancyActualYTDArr[
        myPageData.thisYearOccupancyActualYTDArr.length - 1
      ];
    return returnValue;
  };
  const getARR_ytd = () => {
    let returnValue = "";
    //
    if (endYear === 2024) {
      returnValue =
        myPageData.thisYearArrActualYTDArr[
          myPageData.thisYearArrActualYTDArr.length - 1
        ];
    } else {
      returnValue = Math.round(
        getArraySum(myPageData.thisYearArrActualArr) /
          myPageData.thisYearArrActualArr.length
      );
    }
    return returnValue;
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
                sx={{ height: 140 }}
                //image={phh_logo}
                image={filturedProps[0].photo_small}
                title="Subsidiary Logo"
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  Revenue (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{getArraySum(myPageData.thisYearRevenueActualArr)}Cr.
                  {endYear === 2025 ? "(YTD)" : ""} of ₹{getArraySum(myPageData.thisYearRevenueTargetArr)}Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  PBT (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{getArraySum(myPageData.thisYearPBTActualArr)}Cr.
                  {endYear === 2025 ? "(YTD)" : ""} of ₹{getArraySum(myPageData.thisYearPBTTargetArr)}Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  EBITDA Margin (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {Math.round(
                    (getArraySum(myPageData.thisYearEBIDTAActualArr) /
                      getArraySum(myPageData.thisYearRevenueActualArr)) *
                      100
                  )}
                  % {endYear === 2025 ? "(YTD)" : ""}
                </Typography>
                <Divider></Divider>
                <p>&nbsp;</p>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  ARBOP (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{
                    myPageData.thisYearARPOBActualYTD[
                      myPageData.thisYearARPOBActualYTD.length - 1
                    ]
                  }
                  {endYear === 2025 ? "(YTD)" : ""}
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  ALOS (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {
                    myPageData.thisYearALOSActualYTD[
                      myPageData.thisYearALOSActualYTD.length - 1
                    ]
                  }
                  {" days."}
                  {endYear === 2025 ? "(YTD)" : ""}
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Total patients served (Indoor)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {getArraySum(myPageData.thisYearIndoorPatientActualArr)}
                  {endYear === 2025 ? "(YTD)" : ""}
                </Typography>
                {/* <Divider></Divider> */}
              </CardContent>
            </Card>
          </Box>
        </div>

        <div
          style={{
            width: "100%",
            
          }}
        >
          <Card style={{ 
            height: "100%",
            backgroundColor: palette.neutral.light,
             }} >
            {/* 
                line, area, bar, radar, histogram, pie, donut, radialBar, scatter, bubble, heatmap, candlestick
              */}
            <CardContent>
              <Box >
                <Box
                  style={{
                    display: "flex",
                    flexDirection: isNonMobileScreens ? "row" : "column",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    marginTop: "1rem",
                    
                  }}
                >
                  <div style={{ width: isNonMobileScreens ? "59%" : "100%" }} >
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
                        },
                        {
                          name1_: `FY ${endYear} Actuals${
                            endYear === 2025 ? "(YTD)" : ""
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
                        },
                      ]}
                      series_old={[
                        {
                          name: "FY 23 Actuals",
                          data: [67.7, 78.25, 78.35, 77.4],
                        },
                        {
                          name: "FY 24 Budget",
                          data: [82.1, 89.04, 86.28, 89.84],
                        },
                        {
                          name: "FY 24 Actuals",
                          data: [76.43],
                        },
                      ]}
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
                        },
                        {
                          name_1: `FY ${endYear} Actuals${
                            endYear === 2025 ? "(YTD)" : ""
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
                        },
                      ]}
                    />
                    {/* <MultipleRadialbars
                      title="PBT (in Cr.)" /> */}
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
                      title="ARPOB (₹ per day)"
                      type="bar"
                      //type="area"
                      series={[
                        {
                          name: `FY ${endYear - 1} Actuals`,
                          data: [
                            myPageData.lastYearARPOBQuatActual[2],
                            myPageData.lastYearARPOBQuatActual[5],
                            myPageData.lastYearARPOBQuatActual[8],
                            myPageData.lastYearARPOBQuatActual[11],
                            // myPageData.lastYearARPOBActualYTD[2],
                            // myPageData.lastYearARPOBActualYTD[5],
                            // myPageData.lastYearARPOBActualYTD[8],
                            // myPageData.lastYearARPOBActualYTD[11],
                          ],
                          data_old: [19404, 17945, 19632, 19047],
                        },
                        {
                          name: `FY ${endYear} Budget`,
                          data: [
                            myPageData.thisYearARPOBQuatTarget[0],
                            myPageData.thisYearARPOBQuatTarget[1],
                            myPageData.thisYearARPOBQuatTarget[2],
                            myPageData.thisYearARPOBQuatTarget[3],
                          ],
                          data_new: [18468, 18468, 18468, 18467],
                        },
                        {
                          name_1: `FY ${endYear} Actuals${
                            endYear === 2025 ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            myPageData.thisYearARPOBQuatActual[2],
                            myPageData.thisYearARPOBQuatActual[5],
                            myPageData.thisYearARPOBQuatActual[8],
                            myPageData.thisYearARPOBQuatActual[11],
                            // myPageData.thisYearARPOBActualYTD[2],
                            // myPageData.thisYearARPOBActualYTD[5],
                            // myPageData.thisYearARPOBActualYTD[8],
                            // myPageData.thisYearARPOBActualYTD[11],
                          ],
                          data_new: [18403, 18761, 19416, 20188],
                        },
                      ]}
                    />
                  </div>

                  <div style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                    <AllChartQuarterly
                      title="ALOS (in days)"
                      type="bar"
                      series={[
                        {
                          name: `FY ${endYear - 1} Actuals`,
                          data: [
                            myPageData.lastYearALOSQuatActual[2],
                            myPageData.lastYearALOSQuatActual[5],
                            myPageData.lastYearALOSQuatActual[8],
                            myPageData.lastYearALOSQuatActual[11],

                            // myPageData.lastYearALOSActualYTD[2],
                            // myPageData.lastYearALOSActualYTD[5],
                            // myPageData.lastYearALOSActualYTD[8],
                            // myPageData.lastYearALOSActualYTD[11],
                          ],
                        },
                        {
                          name: `FY ${endYear} Budget`,
                          data: [
                            myPageData.thisYearALOSQuatTarget[0],
                            myPageData.thisYearALOSQuatTarget[1],
                            myPageData.thisYearALOSQuatTarget[2],
                            myPageData.thisYearALOSQuatTarget[3],
                          ],
                        },
                        {
                          name_1: `FY ${endYear} Actuals${
                            endYear === 2025 ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            myPageData.thisYearALOSQuatActual[2],
                            myPageData.thisYearALOSQuatActual[5],
                            myPageData.thisYearALOSQuatActual[8],
                            myPageData.thisYearALOSQuatActual[11],

                            // myPageData.thisYearALOSActualYTD[2],
                            // myPageData.thisYearALOSActualYTD[5],
                            // myPageData.thisYearALOSActualYTD[8],
                            // myPageData.thisYearALOSActualYTD[11],
                          ],
                        },
                      ]}
                      series_old={[
                        {
                          name: "FY 23 Actuals",
                          data: [5.85, 5.81, 5.6, 5.99],
                        },
                        {
                          name: "FY 24 Budget",
                          //data: [5.17, 5.12, 5.26, 5.12],
                          data: [5.2, 5.25, 5.36, 5.14],
                        },
                        {
                          name: "FY 24 Actuals",
                          data: [5.71],
                        },
                      ]}
                    />
                  </div>
                  <div style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                    <AllChartQuarterly
                      title="Occupancy (in percent)"
                      type="bar"
                      series={[
                        {
                          name: `FY ${endYear - 1} Actuals`,
                          data: [
                            myPageData.lastYearOccupancyQuatActual[2],
                            myPageData.lastYearOccupancyQuatActual[5],
                            myPageData.lastYearOccupancyQuatActual[8],
                            myPageData.lastYearOccupancyQuatActual[11]
                            // myPageData.lastYearOccupancyActualYTD[2],
                            // myPageData.lastYearOccupancyActualYTD[5],
                            // myPageData.lastYearOccupancyActualYTD[8],
                            // myPageData.lastYearOccupancyActualYTD[11],
                          ],
                        },
                        {
                          name: `FY ${endYear} Budget`,
                          data: [
                            myPageData.thisYearOccupancyQuatTarget[0],
                            myPageData.thisYearOccupancyQuatTarget[1],
                            myPageData.thisYearOccupancyQuatTarget[2],
                            myPageData.thisYearOccupancyQuatTarget[3],
                          ],
                        },
                        {
                          name_1: `FY ${endYear} Actuals${
                            endYear === 2025 ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            myPageData.thisYearOccupancyQuatActual[2],
                            myPageData.thisYearOccupancyQuatActual[5],
                            myPageData.thisYearOccupancyQuatActual[8],
                            myPageData.thisYearOccupancyQuatActual[11]
                            // myPageData.thisYearOccupancyActualYTD[2],
                            // myPageData.thisYearOccupancyActualYTD[5],
                            // myPageData.thisYearOccupancyActualYTD[8],
                            // myPageData.thisYearOccupancyActualYTD[11],
                          ],
                        },
                      ]}
                      series_old={[
                        {
                          name: "FY 23 Actuals",
                          //data: [77, 61, 57, 59],
                          data: [85, 92, 92, 93],
                        },
                        {
                          name: "FY 24 Budget",
                          data: [82, 89, 88, 89],
                        },
                        {
                          name: "FY 24 Actuals",
                          data: [77],
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
              <Divider>&nbsp;</Divider>
              <p></p>
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: isNonMobileScreens ? "row" : "column",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ width: isNonMobileScreens ? "29%" : "100%" }}>
                <Radialbar
                  title="Revenue Budgeted vs YTD Actual"
                  series={[
                    `${(
                      (getArraySum([...myPageData.thisYearRevenueActualArr]) /
                        getArraySum([...myPageData.thisYearRevenueTargetArr])) *
                      100
                    ).toFixed(2)}`,
                  ]}
                  series_old={[29.55]}
                />
              </Box>

              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="Revenue (in Cr.)"
                  type="line"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearRevenueArr],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearRevenueTargetArr],
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearRevenueActualArr],
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
              <Box style={{ width: isNonMobileScreens ? "29%" : "100%"  }}>
                <Radialbar
                  title="EBIDTA Budgeted vs YTD Actual"
                  series_old={[26.92]}
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
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearEBIDTATargetArr],
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearEBIDTAActualArr],
                    },
                  ]}
                  series_old={[
                    {
                      name: "FY 23 Actuals",
                      data_new: [
                        3.24, 2.61, 4.84, 3.68, 6.22, 3.94, 4.37, 5.64, 6.84,
                        5.4, 5.83, -0.08,
                      ],
                      data: [
                        3.2, 2.6, 4.8, 3.7, 6.2, 3.9, 4.4, 5.6, 6.8, 5.4, 5.8,
                        -0.1,
                      ],
                    },
                    {
                      name: "FY 24 Budget",
                      data: [
                        3.5, 4, 5.8, 5.4, 6.3, 5.7, 4.4, 5.1, 5.5, 6.3, 5.9,
                        5.4,
                      ],
                    },
                    {
                      name: "FY 24 Actuals",
                      data: [3.8, 4.9, 5.1, 3.15],
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
                  series_old={[26.85]}
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
                  //type="bar"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearPBTArr],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearPBTTargetArr],
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearPBTActualArr],
                    },
                  ]}
                  series_old={[
                    {
                      name: "FY 23 Actuals",
                      data: [
                        2.7, 2.0, 4.3, 3.1, 5.6, 3.3, 3.6, 3.4, 7, 5.1, 5.3,
                        -0.8,
                      ],
                    },
                    {
                      name: "FY 24 Budget",
                      data: [
                        2.7, 3.3, 5.1, 4.6, 5.5, 4.9, 3.5, 4.3, 4.7, 5.5, 5.1,
                        4.6,
                      ],
                    },
                    {
                      name: "FY 24 Actuals",
                      data: [3.2, 4.3, 4.44, 2.5],
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
                  title="EBIDTA Mgn. Budgeted vs YTD Actual"
                  categories={["EBIDTA Mgn."]}
                  type="bar"
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
                        endYear >= 2025 ? "(YTD)" : ""
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
                        endYear >= 2025 ? "(YTD)" : ""
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
                  //
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
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearEBIDTATargetmgn],
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearEBIDTAActualmgn],
                    },
                  ]}
                  series_old={[
                    {
                      name: "FY 23 Actuals",
                      data: [
                        15.4, 11.6, 20, 14.6, 23.4, 14.9, 18.4, 21.2, 24.4,
                        20.4, 21.9, -0.3,
                      ],
                    },
                    {
                      name: "FY 24 Budget",
                      data: [
                        13.6, 15.2, 19.5, 18.6, 20.5, 19.1, 15.6, 17.7, 18.7,
                        20.5, 19.7, 18.6,
                      ],
                    },
                    {
                      name: "FY 24 Actuals",
                      data: [15.9, 18.7, 19.64, 12.03],
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
                  title="ARPOB Budgeted vs YTD Actual"
                  categories={["ARPOB"]}
                  type="bar"
                  series={[
                    {
                      //name: "FY 2023 Actuals",
                      //data: [19286],
                      name: `FY ${endYear - 1} Actuals`,
                      data: [
                        myPageData.lastYearARPOBActualYTD[
                          myPageData.lastYearARPOBActualYTD.length - 1
                        ],
                      ],
                    },
                    {
                      //name: "FY 2024 Budget",
                      //data: [22238],
                      name: `FY ${endYear} Budget`,
                      data: [
                        myPageData.thisYearARPOBQuatTarget[
                          myPageData.thisYearARPOBQuatTarget.length - 1
                        ],
                      ],
                    },
                    {
                      //name: "FY 2024 Actuals(YTD)",
                      //data: [21417],
                      name: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      data: [
                        myPageData.thisYearARPOBActualYTD[
                          myPageData.thisYearARPOBActualYTD.length - 1
                        ],
                      ],
                    },
                  ]}
                  colors={getColor("ARPOB")}
                  colors_old={["#0000FF", "#20C77D", "#FF0000"]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChartRange
                  title="ARPOB (₹ per day)"
                  startWith="0"
                  //type="bar"
                  type="area"
                  series={[
                    {
                      // name: "FY 23 Actuals",
                      // data: [
                      //   18770, 17611, 19075, 20577, 15347, 20089, 18822,
                      //   20009, 21362, 19418, 20107, 21038,
                      // ],
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearARPOBActual],
                    },
                    {
                      // name: "FY 24 Budget",
                      // data: [
                      //   22280, 21802, 23923, 24080, 22412, 21527, 21939,
                      //   21785, 22485, 23211, 22459, 22943,
                      // ],
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearARPOBTarget],
                    },
                    {
                      // name: "FY 24 Actuals",
                      // data: [19889, 20981, 24177, 21239],
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearARPOBActual],
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
                  title="ALOS Budgeted vs YTD Actual"
                  type="bar"
                  series={[
                    {
                      // name: "FY 2023 Actuals",
                      // data: [5.85],
                      name: `FY ${endYear - 1} Actuals`,
                      data: [
                        myPageData.lastYearALOSActualYTD[
                          myPageData.lastYearALOSActualYTD.length - 1
                        ],
                      ],
                    },
                    {
                      // name: "FY 2024 Budget",
                      // data: [5.3],
                      name: `FY ${endYear} Budget`,
                      data: [
                        myPageData.thisYearALOSQuatTarget[
                          myPageData.thisYearALOSQuatTarget.length - 1
                        ],
                      ],
                    },
                    {
                      // name: "FY 2024 Actuals(YTD)",
                      // data: [5.57],
                      name: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      data: [
                        myPageData.thisYearALOSActualYTD[
                          myPageData.thisYearALOSActualYTD.length - 1
                        ],
                      ],
                    },
                  ]}
                  colors={getColor("ALOS")}
                  colors_old={["#0000FF", "#20C77D", "#FF0000"]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="ALOS (in days)"
                  type="bar"
                  series={[
                    {
                      // name: "FY 23 Actuals",
                      // data: [
                      //   5.89, 5.83, 5.84, 5.55, 5.67, 6.2, 5.58, 5.62, 6.0,
                      //   5.98, 6, 5.98,
                      // ],
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearALOSActual],
                    },
                    {
                      // name: "FY 24 Budget",
                      // data: [
                      //   5.3, 5.41, 4.94, 4.9, 5.27, 5.49, 5.39, 5.42, 5.25,
                      //   5.09, 5.26, 5.15,
                      // ],
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearALOSTarget],
                    },
                    {
                      // name: "FY 24 Actuals(YTD)",
                      // data: [6.06, 5.68, 5.38, 5.15],
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearALOSActual],
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
                  title="Occupancy Budgeted vs YTD Actual"
                  categories={["Occupancy"]}
                  type="bar"
                  series={[
                    {
                      // name: "FY 2023 Actuals",
                      // data: [91],
                      name: `FY ${endYear - 1} Actuals`,
                      data: [
                        myPageData.lastYearOccupancyActualYTD[
                          myPageData.lastYearOccupancyActualYTD.length - 1
                        ],
                      ],
                    },
                    {
                      // name: "FY 2024 Budget",
                      // data: [88],
                      name: `FY ${endYear} Budget`,
                      data: [
                        myPageData.thisYearOccupancyQuatTarget[
                          myPageData.thisYearOccupancyQuatTarget.length - 1
                        ],
                      ],
                    },
                    {
                      // name: "FY 2024 Actuals(YTD)",
                      // data: [77],
                      name: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      data: [
                        myPageData.thisYearOccupancyActualYTD[
                          myPageData.thisYearOccupancyActualYTD.length - 1
                        ],
                      ],
                    },
                  ]}
                  colors={getColor("Occupancy")}
                  colors_old={["#0000FF", "#20C77D", "#FF0000"]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="Occupancy (in %)"
                  type="bar"
                  series={[
                    {
                      // name: "FY 23 Actuals",
                      // data: [82, 84, 89, 83, 94, 98, 88, 95, 91, 92, 99, 88],
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearOccupancyActual],
                    },
                    {
                      // name: "FY 24 Budget",
                      // data: [79, 81, 86, 80, 91, 95, 85, 91, 88, 89, 95, 85],
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearOccupancyTarget],
                    },
                    {
                      // name: "FY 24 Actuals",
                      // data: [80, 78, 72, 77],
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearOccupancyActual],
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
                  title="Total patients Budgeted vs YTD Actual"
                  series_old={[27.96]}
                  series={[
                    `${Math.round(
                      (getArraySum([
                        ...myPageData.thisYearIndoorPatientActualArr,
                      ]) /
                        getArraySum([
                          ...myPageData.thisYearIndoorPatientTargetArr,
                        ])) *
                        100
                    )}`,
                  ]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="Total no of patients served (Indoor)"
                  type="bar"
                  series={[
                    {
                      // name: "FY 23 Actuals",
                      // data: [
                      //   1429, 1567, 1603, 1623, 1794, 1730, 1703, 1770, 1645,
                      //   1663, 1611, 1621,
                      // ],
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearIndoorPatientActualArr],
                    },
                    {
                      // name: "FY 24 Budget",
                      // data: [
                      //   1659, 1722, 1931, 1879, 1978, 1917, 1803, 1872, 1912,
                      //   1996, 1944, 1887,
                      // ],
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearIndoorPatientTargetArr],
                    },
                    {
                      // name: "FY 24 Actuals",
                      // data: [1469, 1602, 1489, 1730],
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearIndoorPatientActualArr],
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
                  title="Int. Revenue Budgeted vs YTD Actual"
                  series_old={[27.96]}
                  series={[
                    `${Math.round(
                      (getArraySum([
                        ...myPageData.thisYearIntRevActualArr,
                      ]) /
                        getArraySum([
                          ...myPageData.thisYearIntRevTargetArr,
                        ])) *
                        100
                    )}`,
                  ]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="International Revenue (in Cr.)"
                  type="bar"
                  series={[
                    {
                      // name: "FY 23 Actuals",
                      // data: [
                      //   1429, 1567, 1603, 1623, 1794, 1730, 1703, 1770, 1645,
                      //   1663, 1611, 1621,
                      // ],
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearIntRevActualArr ],
                    },
                    {
                      // name: "FY 24 Budget",
                      // data: [
                      //   1659, 1722, 1931, 1879, 1978, 1917, 1803, 1872, 1912,
                      //   1996, 1944, 1887,
                      // ],
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearIntRevTargetArr],
                    },
                    {
                      // name: "FY 24 Actuals",
                      // data: [1469, 1602, 1489, 1730],
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearIntRevActualArr],
                    },
                  ]}
                />
              </Box>
            </Box>

          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default HospitalDashboardGraph;
