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
import StackedChart from "components/charts/StackedChart";
import StackedChartQuarterly from "components/charts/StackedChartQuarterly";

const HotelDashboardGraph = ({ propertyId, propertyCode, selectedYear }) => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  //const subsidiary = useSelector((state) => state.user.subsidiary);
  //const [statePageData, setStatePageData] = useState({});
  const [reportData, setReportData] = useState([]);
  //
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");

  const filturedProps = allProperties.filter(
    //(property) => property.subsidiary === subsidiary
    (property) => property._id === propertyId
  );
  //Load Dynamic Data
  const getMISData = async () => {
    console.log("Loading Data from Server, please wait");
    //let propertyCode = "PIK"
    //"https://sheom.in/",
    //http://localhost:4000/mis?propertyCode=PHL&year=2024
    //alert("selectedYear: "+selectedYear)
    let misYear = Number(selectedYear.split("-")[1]);
    //alert("misYear: "+misYear)
    let responseURL ="http://localhost:4000/mis/new?propertyCode=PIK&year=2025"
    responseURL = `https://sheom.in/mis/new?propertyCode=${propertyCode}&year=${misYear}`
    const response = await fetch(responseURL,
      {
        //const response = await fetch(`http://localhost:4000/mis?propertyCode=${propertyCode}&year=${new Date().getFullYear() + 1}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data) {
      console.log("MIS Year: " + misYear);
      console.log("*** MIS Data from server ***");
      console.log(data);
      setReportData(data);
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
  console.log("***reportData*** from Dashboard Graph");
  console.log(reportData);
  console.log("***End reportData*** from Dashboard Graph");

  let yearArray = [];
  console.log("#######################################reportData############################################")
  console.log( JSON.stringify(reportData))
  console.log("#######################################reportData############################################")
  reportData.forEach((mis) => {
    yearArray.push(mis.year);
  });
  yearArray.sort();
  //console.log(yearArray);

  let endYear = selectedYear
    ? Number(selectedYear.split("-")[1])
    : yearArray[yearArray.length - 1];
    let YTD_year = 2025 ;
    //
  //alert("selectedYear: "+selectedYear+" endYear: "+endYear);

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
      lastYearRevenueArr: [],
      thisYearRevenueTargetArr: [],
      thisYearRevenueActualArr: [],
      //
      //
      lastYearRoomRevenueArr: [],
      thisYearRoomRevenueTargetArr: [],
      thisYearRoomRevenueActualArr: [],
      //
      lastYearFnBRevenueArr: [],
      thisYearFnBRevenueTargetArr: [],
      thisYearFnBRevenueActualArr: [],
      //
      lastYearBanquetRevenueArr: [],
      thisYearBanquetRevenueTargetArr: [],
      thisYearBanquetRevenueActualArr: [],
      //
      //
      lastYearPBTArr: [],
      thisYearPBTTargetArr: [],
      thisYearPBTActualArr: [],

      lastYearEBDITAArr: [],
      thisYearEBIDTATargetArr: [],
      thisYearEBIDTAActualArr: [],

      lastYearEBDITAmgn: [],
      thisYearEBIDTATargetmgn: [],
      thisYearEBIDTAActualmgn: [],
      //
      lastYearOccupancyActual: [],
      lastYearOccupancyActualYTD: [],
      lastYearOccupancyQuatActual: [],
      //
      thisYearOccupancyTarget: [],
      thisYearOccupancyQuatTarget: [],
      thisYearOccupancyActual: [],
      thisYearOccupancyQuatActual: [],
      thisYearOccupancyActualYTD: [],
      //
      lastYearArrActual: [],
      lastYearArrQuatActual: [],
      lastYearArrActualYTD: [],
      //
      thisYearArrTarget: [],
      thisYearArrQuatTarget: [],
      //
      thisYearArrActual: [],
      thisYearArrActualYTD: [],
      thisYearArrQuatActual: [],

      lastYearRevPar: [],
      thisYearRevParTarget: [],
      thisYearRevParActual: [],
    };

    //
    reportData.forEach((mis) => {
      // console.log("******************************************************")
      // console.log("mis year"+mis.year);
      // console.log(mis.data.revenue.target);
      // console.log("******************************************************")

      if (Number(mis.year) === Number(endYear)) {
        //alert("Year Matched this year");
        myPageData.thisYearRevenueActualArr = mis.data.revenue.actual? [...mis.data.revenue.actual]: [] ; 
        myPageData.thisYearRevenueTargetArr = mis.data.revenue.target? [...mis.data.revenue.target] : [];
        //
        console.log("******************************************************")
        console.log("mis year"+mis.year);
        console.log(mis.data.revenue.target);
        console.log("******************************************************")
        //

        myPageData.thisYearRoomRevenueActualArr = mis.data.roomRevenue.actual? [ ...mis.data.roomRevenue.actual,]:[];
        myPageData.thisYearRoomRevenueTargetArr = [
          ...mis.data.roomRevenue.target,
        ];

        myPageData.thisYearFnBRevenueActualArr = [
          ...mis.data.fnbRevenue.actual,
        ];
        myPageData.thisYearFnBRevenueTargetArr = [
          ...mis.data.fnbRevenue.target,
        ];

        myPageData.thisYearBanquetRevenueActualArr = [
          ...mis.data.banquetRevenue.actual,
        ];
        myPageData.thisYearBanquetRevenueTargetArr = [
          ...mis.data.banquetRevenue.target,
        ];
        //
        myPageData.thisYearPBTActualArr = [...mis.data.PBT.actual];
        myPageData.thisYearPBTTargetArr = [...mis.data.PBT.target];

        myPageData.thisYearEBIDTAActualArr = [...mis.data.EBIDTA.actual];
        myPageData.thisYearEBIDTATargetArr = [...mis.data.EBIDTA.target];
        myPageData.thisYearEBIDTAActualmgn = [...mis.data.EBIDTA_mgn.actual];
        myPageData.thisYearEBIDTATargetmgn = [...mis.data.EBIDTA_mgn.target];

        //
        myPageData.thisYearOccupancyActualYTD = mis.data.occupancy.actual_ytd
          ? [...mis.data.occupancy.actual_ytd]
          : [];
        myPageData.thisYearOccupancyActual = mis.data.occupancy.actual
          ? [...mis.data.occupancy.actual]
          : [];
        myPageData.thisYearOccupancyQuatActual = mis.data.occupancy.actual_q
          ? [...mis.data.occupancy.actual_q]
          : [];
        myPageData.thisYearOccupancyTarget = mis.data.occupancy.target
          ? [...mis.data.occupancy.target]
          : [];
        myPageData.thisYearOccupancyQuatTarget = mis.data.occupancy.target_q
          ? [...mis.data.occupancy.target_q]
          : [];
        //
        //
        myPageData.thisYearArrActual = mis.data.arr.actual
          ? [...mis.data.arr.actual]
          : [];
        myPageData.thisYearArrQuatActual = mis.data.arr.actual_q
          ? [...mis.data.arr.actual_q]
          : [];
        myPageData.thisYearArrActualYTD = mis.data.arr.actual_ytd
          ? [...mis.data.arr.actual_ytd]
          : [];

        myPageData.thisYearArrTarget = mis.data.arr.target
          ? [...mis.data.arr.target]
          : [];
        myPageData.thisYearArrQuatTarget = mis.data.arr.target_q
          ? [...mis.data.arr.target_q]
          : [];
        //
        myPageData.thisYearRevParActual = getRevPar(
          [...myPageData.thisYearOccupancyActual],
          [...myPageData.thisYearArrActual]
        ); //[]
        myPageData.thisYearRevParTarget = getRevPar(
          [...myPageData.thisYearOccupancyTarget],
          [...myPageData.thisYearArrTarget]
        ); //[]
        //
      } else if (Number(mis.year) === Number(endYear - 1)) {
        //alert("Year Matched LAST YEAR");
        myPageData.lastYearRevenueArr = mis.data.revenue.actual
          ? [...mis.data.revenue.actual]
          : [];
        //
        myPageData.lastYearRoomRevenueArr = mis.data.roomRevenue
          ? [...mis.data.roomRevenue.actual]
          : [];
        myPageData.lastYearFnBRevenueArr = mis.data.fnbRevenue
          ? [...mis.data.fnbRevenue.actual]
          : [];
        myPageData.lastYearBanquetRevenueArr = mis.data.banquetRevenue
          ? [...mis.data.banquetRevenue.actual]
          : [];
        //
        myPageData.lastYearPBTArr = mis.data.PBT.actual
          ? [...mis.data.PBT.actual]
          : [];
        myPageData.lastYearEBDITAArr = [...mis.data.EBIDTA.actual];
        myPageData.lastYearEBDITAmgn = [...mis.data.EBIDTA_mgn.actual];
        //
        //
        myPageData.lastYearOccupancyActual = mis.data.occupancy.actual
          ? [...mis.data.occupancy.actual]
          : [];
        myPageData.lastYearOccupancyActualYTD = [
          ...mis.data.occupancy.actual_ytd,
        ];
        myPageData.lastYearOccupancyQuatActual = [
          ...mis.data.occupancy.actual_q,
        ];
        //
        myPageData.lastYearArrActual = [...mis.data.arr.actual];
        myPageData.lastYearArrActualYTD = [...mis.data.arr.actual_ytd];
        myPageData.lastYearArrQuatActual = [...mis.data.arr.actual_q];
        //
        //
        myPageData.lastYearRevPar = getRevPar(
          [...mis.data.occupancy.actual],
          [...mis.data.arr.actual]
        ); //[]
      }
      // console.log("###################################PageData#######################################")
      // console.log(myPageData)
      // console.log("#################################EndPageData######################################")

    });
    for (let a = 0; a < 12; a++) {
      //
      //updating EBIDTA mgn dynamically
      //
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
      //
      myPageData.lastYearRoomRevenueArr[a] = Number(
        myPageData.lastYearRoomRevenueArr[a]
      ).toFixed(2);
      myPageData.thisYearRoomRevenueTargetArr[a] = Number(
        myPageData.thisYearRoomRevenueTargetArr[a]
      ).toFixed(2);
      myPageData.thisYearRoomRevenueActualArr[a] = Number(
        myPageData.thisYearRoomRevenueActualArr[a]
      ).toFixed(2);
      //
      myPageData.lastYearFnBRevenueArr[a] = Number(
        myPageData.lastYearFnBRevenueArr[a]
      ).toFixed(2);
      myPageData.thisYearFnBRevenueTargetArr[a] = Number(
        myPageData.thisYearFnBRevenueTargetArr[a]
      ).toFixed(2);
      myPageData.thisYearFnBRevenueActualArr[a] = Number(
        myPageData.thisYearFnBRevenueActualArr[a]
      ).toFixed(2);
      //
      myPageData.lastYearBanquetRevenueArr[a] = Number(
        myPageData.lastYearBanquetRevenueArr[a]
      ).toFixed(2);
      myPageData.thisYearBanquetRevenueTargetArr[a] = Number(
        myPageData.thisYearBanquetRevenueTargetArr[a]
      ).toFixed(2);
      myPageData.thisYearBanquetRevenueActualArr[a] = Number(
        myPageData.thisYearBanquetRevenueActualArr[a]
      ).toFixed(2);

      if (!myPageData.thisYearRoomRevenueActualArr[a]) {
        myPageData.thisYearRoomRevenueActualArr[a] = 0;
      }
      if (!myPageData.thisYearFnBRevenueActualArr[a]) {
        myPageData.thisYearFnBRevenueActualArr[a] = 0;
      }
      if (!myPageData.thisYearBanquetRevenueActualArr[a]) {
        myPageData.thisYearBanquetRevenueActualArr[a] = 0;
      }
      //
      //End For Loop
    }
    // console.log("*** EBIDTA Margin ***");
    // console.log(
    //   "myPageData.lastYearEBDITAmgn: " + myPageData.lastYearEBDITAmgn.toString()
    // );
    // console.log(
    //   "myPageData.thisYearEBIDTAActualArr: " +
    //     myPageData.thisYearEBIDTAActualArr.toString()
    // );
    // console.log(
    //   "myPageData.thisYearRevenueTargetArr: " +
    //     myPageData.thisYearRevenueTargetArr.toString()
    // );
    // console.log("*** End EBIDTA Margin ***");
  };
  populatePageData();

  const { palette } = useTheme();

  //EBIDTA Margin Budgeted vs YTD Actual
  const getColor = (item) => {
    let budget, actual;
    let returnArray = ["#0000FF", "#20C77D", "#FDFF00"];
    if (item === "EBIDTAmgn") {
      //budget = getArraySum([...myPageData.thisYearEBIDTATargetmgn])/12
      //actual = getArraySum([...myPageData.thisYearEBIDTAActualmgn])/(myPageData.thisYearEBIDTAActualmgn.length)
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
    }
    if (item === "Occupancy") {
      budget = getArraySum([...myPageData.thisYearOccupancyTarget]) / 12;
      actual = getOccupancy_ytd(); //getArraySum([...myPageData.thisYearOccupancyActual])/(myPageData.thisYearOccupancyActual.length)
    }
    if (item === "ARR") {
      budget = getArraySum([...myPageData.thisYearArrTarget]) / 12;
      actual = getARR_ytd(); //getArraySum([...myPageData.thisYearArrActual])/(myPageData.thisYearArrActual.length)
    }
    if (item === "RevPar") {
      budget = getArraySum([...myPageData.thisYearRevParTarget]) / 12;
      actual =
        getArraySum([...myPageData.thisYearRevParActual]) /
        myPageData.thisYearRevParActual.length;
    }

    //RevPar

    if (actual < budget) {
      returnArray[2] = "#FF0000";
    } else {
      returnArray[2] = "#00FF00";
    }

    return returnArray;
  };

  const getRating = () => {
    //alert( JSON.stringify(filturedProps[0].propertyCode) )
    //{["PIK","PID","PIH","PRPB", "PRM"]}
    //["GA", "TA", "MNT", "GI"]
    let propCode = filturedProps[0].propertyCode;
    let returnArray = [];
    if (endYear === 2025) {
      if (propCode === "PIK") {
        returnArray = [4.9,	4.8,4.8,5]
        //returnArray = [4.5, 4.6, 4.0, 3.8]
      }
      if (propCode === "PID") {
        returnArray = [4.7,	4.8,	4.7,	4.5 ]
        //returnArray = [4.5, 4.8, 4.4, 4.0]
      }
      if (propCode === "PIH") {
        returnArray = [4.8,	4.9,	4.7,	4.7];
        //returnArray = [4.5, 4.8, 4.5, 4.5];
      }
      if (propCode === "PRPB") {
        returnArray = [4.5,	4.7,	5,	0]
        //returnArray = [4, 4.8, 4.3, 0]
      }
      if (propCode === "PRM") {
        returnArray = [4.5,	4.8,	4.5,	0]
        //returnArray = [4, 4.6, 4.5, 3.8]
      }
    }else if(endYear === 2024) {
      if (propCode === "PIK") {
        returnArray = [4.5, 4.6, 4.0, 3.8]
        //returnArray = [4.3, 4.5, 4.0, 4.1];
        //returnArray = [4.3, 4.0, 4.0, 4.1];
        //returnArray = [ 4.3, 4.0, 3.9, 4.1 ]
      }
      if (propCode === "PID") {
        returnArray = [4.5, 4.8, 4.4, 4.0]
        //returnArray = [4.1, 4.5, 3.8, 3.9];
        //returnArray = [4.0, 4.5, 3.0, 3.9];
        //[ 4.0, 4.5, 3.8, 3.9 ]
      }
      if (propCode === "PIH") {
        returnArray = [4.5, 4.8, 4.5, 4.5];
        //returnArray = [3.9, 4.5, 3.5, 3.7];
        //[3.8, 4.5, 3.0, 3.6];
        //[ 3.8, 4.5, 3.5, 3.6 ]
      }
      if (propCode === "PRPB") {
        returnArray = [4, 4.8, 4.3, 0]
        //returnArray = [3.8, 4.5, 3.5, 3.4];
        //[3.8, 4.0, 4.0, 3.5];
        //[ 3.8, 4.0, 3.5, 3.5 ]
      }
      if (propCode === "PRM") {
        returnArray = [4, 4.6, 4.5, 3.8]
        //returnArray = [3.8, 4.0, 3.9, 3.7];
        //[3.8, 4.0, 3.0, 3.7];
        //[ 3.8, 4.0, 3.9, 3.8 ]
      }
    }
    return returnArray;
  };

  const getOccupancy_ytd = () => {
    let returnValue = "";
    if (endYear === 2024) {
      returnValue =
        myPageData.thisYearOccupancyActualYTD[
          myPageData.thisYearOccupancyActualYTD.length - 1
        ];
    } else {
      returnValue = Math.round(
        getArraySum(myPageData.thisYearOccupancyActual) /
          myPageData.thisYearOccupancyActual.length
      );
    }
    return returnValue;
  };
  const getARR_ytd = () => {
    let returnValue = "";
    //
    if (endYear === 2024) {
      returnValue =
        myPageData.thisYearArrActualYTD[
          myPageData.thisYearArrActualYTD.length - 1
        ];
    } else {
      returnValue = Math.round(
        getArraySum(myPageData.thisYearArrActual) /
          myPageData.thisYearArrActual.length
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
                sx={{ height: 140, marginTop: "1.5rem" }}
                image={filturedProps[0].photo_small}
                title="Subsidiary Logo"
              />
              <CardContent>
                {/* <Typography variant="h4" component="div" >
                  Financial Year: 2022-23
                </Typography>
                <Divider ></Divider> */}

                <Typography variant="h5" component="div" marginTop="1rem">
                  {/* Revenue (FY {yearArray[yearArray.length - 1]}) */}
                  Revenue (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{getArraySum(myPageData.thisYearRevenueActualArr)}Cr.
                  {endYear === YTD_year ? "(YTD)" : ""} of ₹
                  {getArraySum(myPageData.thisYearRevenueTargetArr)}Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  {/* PBT (FY {yearArray[yearArray.length - 1]}) */}
                  PBT (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{getArraySum(myPageData.thisYearPBTActualArr)}Cr.
                  {endYear === YTD_year ? "(YTD)" : ""} of ₹
                  {getArraySum(myPageData.thisYearPBTTargetArr)}Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  {/* EBITDA Margin (FY {yearArray[yearArray.length - 1]}) */}
                  EBITDA Margin (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {Math.round(
                    (getArraySum(myPageData.thisYearEBIDTAActualArr) /
                      getArraySum(myPageData.thisYearRevenueActualArr)) *
                      100
                  )}
                  % {endYear === YTD_year ? "(YTD)" : ""}
                  <br />
                </Typography>
                <Divider></Divider>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Occupancy (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {getOccupancy_ytd()}
                  {endYear === YTD_year ? "% (YTD)" : "% "}
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Average Room Rate (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{" " + getARR_ytd()} {endYear === YTD_year ? "(YTD)" : ""}
                </Typography>
                <Divider></Divider>
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
            style={{ 
              height: "100%",
              backgroundColor: palette.neutral.light,
            }} 
          >
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
                  <div style={{ width: isNonMobileScreens ? "59%" : "100%"  }}>
                    {/* <StackedChartQuarterly
                    title="Revenue breakup (in Cr.)"
                    type={"bar"}
                    series= {[
                      {
                        name: `FY ${endYear - 1} Actuals-RR`,
                        group: "LR",
                        data: [5, 5, 5, 5]
                      },
                      {
                        name: `FY ${endYear - 1} Actuals-FR`,
                        group: "LR",
                        data: [3, 3, 3, 3 ]
                      },
                      {
                        name: `FY ${endYear - 1} Actuals-BR`,
                        group: "LR",
                        data: [2, 2, 2, 2]
                      },
                      {
                        name: `FY ${endYear} Budget-RR`,
                        group: "TB",
                        data: [5, 5, 5, 5 ]
                      },
                      {
                        name: `FY ${endYear} Budget-FR`,
                        group: "TB",
                        data: [3, 3, 3 , 3 ]
                      },
                      {
                        name: `FY ${endYear} Budget-BR`,
                        group: "TB",
                        data: [2, 2, 2, 2]
                      },
                      {
                        name: `FY ${endYear} Actuals${ (endYear===2024)?"(YTD)":"" }-RR`,
                        group: "TA",
                        data: [4, 4, 0, 0 ]
                      },
                      {
                        name: `FY ${endYear} Actuals${ (endYear===2024)?"(YTD)":"" }-FR`,
                        group: "TA",
                        data: [2, 2, 0, 0 ]
                      },
                      {
                        name: `FY ${endYear} Actuals${ (endYear===2024)?"(YTD)":"" }-BR`,
                        group: "TA",
                        data: [1, 1, 0, 0 ]
                      },
                    ]}
                    /> */}

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
                          name1_: `FY ${endYear} Actuals${
                            endYear === 2024 ? "(YTD)" : ""
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
                    />
                  </div>
                  <div style={{ width: isNonMobileScreens ? "39%" : "100%"  }}>
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
                          //PIK[ -2.71,	-0.62,	1.43,	0.13 ]
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
                          name1_old: `FY ${endYear} Actuals${
                            endYear === 2024 ? "(YTD)" : ""
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
                  <div style={{ width: isNonMobileScreens ? "32%" : "100%"  }}>
                    <AllChartQuarterly
                      title="Occupancy (in %)"
                      type="bar"
                      //
                      series={[
                        {
                          name: `FY ${endYear - 1} Actuals`,
                          data: [
                            myPageData.lastYearOccupancyQuatActual[2],
                            myPageData.lastYearOccupancyQuatActual[5],
                            myPageData.lastYearOccupancyQuatActual[8],
                            myPageData.lastYearOccupancyQuatActual[11],
                          ],
                          data_1: [
                            Math.round(
                              getArraySum([
                                myPageData.lastYearOccupancyActual[0],
                                myPageData.lastYearOccupancyActual[1],
                                myPageData.lastYearOccupancyActual[2],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.lastYearOccupancyActual[3],
                                myPageData.lastYearOccupancyActual[4],
                                myPageData.lastYearOccupancyActual[5],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.lastYearOccupancyActual[6],
                                myPageData.lastYearOccupancyActual[7],
                                myPageData.lastYearOccupancyActual[8],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.lastYearOccupancyActual[9],
                                myPageData.lastYearOccupancyActual[10],
                                myPageData.lastYearOccupancyActual[11],
                              ]) / 3
                            ),
                          ],
                          //data: [ -1.74, 0.35, 2.40, 0.52]
                        },
                        {
                          name: `FY ${endYear} Budget`,
                          data: [
                            myPageData.thisYearOccupancyQuatTarget[0],
                            myPageData.thisYearOccupancyQuatTarget[1],
                            myPageData.thisYearOccupancyQuatTarget[2],
                            myPageData.thisYearOccupancyQuatTarget[3],
                          ],
                          //data: [ 2.57, 2.92, 4.52, 5.58 ]
                        },
                        {
                          name_old: `FY ${endYear} Actuals${
                            endYear === 2024 ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            myPageData.thisYearOccupancyQuatActual[2],
                            myPageData.thisYearOccupancyQuatActual[5],
                            myPageData.thisYearOccupancyQuatActual[8],
                            myPageData.thisYearOccupancyQuatActual[11],
                          ],
                          data_1: [
                            Math.round(
                              getArraySum([
                                myPageData.thisYearOccupancyActual[0],
                                myPageData.thisYearOccupancyActual[1],
                                myPageData.thisYearOccupancyActual[2],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearOccupancyActual[3],
                                myPageData.thisYearOccupancyActual[4],
                                myPageData.thisYearOccupancyActual[5],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearOccupancyActual[6],
                                myPageData.thisYearOccupancyActual[7],
                                myPageData.thisYearOccupancyActual[8],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearOccupancyActual[9],
                                myPageData.thisYearOccupancyActual[10],
                                myPageData.thisYearOccupancyActual[11],
                              ]) / 3
                            ),
                          ],
                          //data: [ 1.76, 1.40, 0.32, 2.96 ]
                        },
                      ]}
                    />
                  </div>
                  <div style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                    <AllChartQuarterly
                      title="Average Room Rate(in ₹)"
                      type="bar"
                      series={[
                        {
                          name: `FY ${endYear - 1} Actuals`,
                          data: [
                            myPageData.lastYearArrQuatActual[2],
                            myPageData.lastYearArrQuatActual[5],
                            myPageData.lastYearArrQuatActual[8],
                            myPageData.lastYearArrQuatActual[11],
                          ],
                          data_1: [
                            Math.round(
                              getArraySum([
                                myPageData.lastYearArrActual[0],
                                myPageData.lastYearArrActual[1],
                                myPageData.lastYearArrActual[2],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.lastYearArrActual[3],
                                myPageData.lastYearArrActual[4],
                                myPageData.lastYearArrActual[5],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.lastYearArrActual[6],
                                myPageData.lastYearArrActual[7],
                                myPageData.lastYearArrActual[8],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.lastYearArrActual[9],
                                myPageData.lastYearArrActual[10],
                                myPageData.lastYearArrActual[11],
                              ]) / 3
                            ),
                          ],
                          //data: [ 2843, 2795, 3788, 4135  ]
                        },
                        {
                          name: `FY ${endYear} Budget`,
                          data: [
                            myPageData.thisYearArrQuatTarget[0],
                            myPageData.thisYearArrQuatTarget[1],
                            myPageData.thisYearArrQuatTarget[2],
                            myPageData.thisYearArrQuatTarget[3],
                          ],
                          data_1: [
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrTarget[0],
                                myPageData.thisYearArrTarget[1],
                                myPageData.thisYearArrTarget[2],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrTarget[3],
                                myPageData.thisYearArrTarget[4],
                                myPageData.thisYearArrTarget[5],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrTarget[6],
                                myPageData.thisYearArrTarget[7],
                                myPageData.thisYearArrTarget[8],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrTarget[9],
                                myPageData.thisYearArrTarget[10],
                                myPageData.thisYearArrTarget[11],
                              ]) / 3
                            ),
                          ],
                          //data: [ 4377,	4367,	5100,	5355  ]
                        },
                        {
                          name_old: `FY ${endYear} Actuals${
                            endYear === 2024 ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            myPageData.thisYearArrQuatActual[2],
                            myPageData.thisYearArrQuatActual[5],
                            myPageData.thisYearArrQuatActual[8],
                            myPageData.thisYearArrQuatActual[11],
                          ],
                          data_1: [
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrActual[0],
                                myPageData.thisYearArrActual[1],
                                myPageData.thisYearArrActual[2],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrActual[3],
                                myPageData.thisYearArrActual[4],
                                myPageData.thisYearArrActual[5],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrActual[6],
                                myPageData.thisYearArrActual[7],
                                myPageData.thisYearArrActual[8],
                              ]) / 3
                            ),
                            Math.round(
                              getArraySum([
                                myPageData.thisYearArrActual[9],
                                myPageData.thisYearArrActual[10],
                                myPageData.thisYearArrActual[11],
                              ]) / 3
                            ),
                          ],
                          //data: [4500, 4338, 4804, 5015],
                        },
                      ]}
                    />
                  </div>

                  <div style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                    {/* <AllChartQuarterly */}
                    <AllChartQuarterlyRange
                      title={`Customer Ratings${
                        endYear === 2024 ? " - Q4" : ""
                      }`}
                      subTitle={`scale of 1 to 5`}
                      //categories={["PIK","PID","PIH","PRPB", "PRM"]}
                      categories={["Google", "Trip Advisor", "MMT", "Go ibibo"]}
                      type="bar"
                      series={[
                        {
                          //name: `FY ${endYear} Q4`,
                          name: endYear === 2024 ?`FY 2024 Q4`
                          : `FY 2025 Q1`,
                          data: getRating(),
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
                  title="Revenue Budgeted vs YTD Actual"
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
            <Divider>&nbsp;</Divider>
            <br />
            <Box
              sx={{
                display: "flex",
                flexDirection: isNonMobileScreens ? "row" : "column",
                justifyContent: "space-between",
              }}
            >
              <Box style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                <AllChart
                  title="Room Revenue (in Cr.)"
                  type={"bar"}
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearRoomRevenueArr],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearRoomRevenueTargetArr],
                    },
                    {
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearRoomRevenueActualArr],
                    },
                  ]}
                />
              </Box>

              <Box style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                <AllChart
                  title="FnB Revenue (in Cr.)"
                  type={"bar"}
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearFnBRevenueArr],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearFnBRevenueTargetArr],
                    },
                    {
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearFnBRevenueActualArr],
                    },
                  ]}
                />
              </Box>

              <Box style={{ width: isNonMobileScreens ? "32%" : "100%" }}>
                <AllChart
                  title="Banquet Revenue (in Cr.)"
                  type={"bar"}
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearBanquetRevenueArr],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearBanquetRevenueTargetArr],
                    },
                    {
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearBanquetRevenueActualArr],
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
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
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
              <Box style={{ width: isNonMobileScreens ? "29%" : "100%"  }}>
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
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%"  }}>
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
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
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
              {
                console.log(
                  "Last Year EBIDTA Total: " +
                    getArraySum([...myPageData.lastYearEBDITAArr])
                )
                // console.log((getArraySum([...myPageData.lastYearEBDITAArr])/
                //           getArraySum([...myPageData.lastYearRevenueArr]) ) );
              }
              {console.log(
                "Last Year Revenue total: " +
                  getArraySum([...myPageData.lastYearRevenueArr])
              )}
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
                  //       getArraySum(
                  //         [...myPageData.thisYearEBIDTAActualmgn]
                  //         )
                  //         /
                  //         (myPageData.thisYearEBIDTAActualmgn.length)
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
                        endYear >= 2024 ? "(YTD)" : ""
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
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
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
                      name: `FY ${endYear - 1} Actuals`,
                      data: [
                        `${Math.round(
                          getArraySum([...myPageData.lastYearOccupancyActual]) /
                            12
                        )}`,
                      ],
                      //data: [ 75.92],
                    },
                    {
                      name: `FY ${endYear} Budget${
                        endYear >= 2024 ? "(Yearly)" : ""
                      }`,
                      data: [
                        `${Math.round(
                          getArraySum([...myPageData.thisYearOccupancyTarget]) /
                            12
                        )}`,
                      ],
                      //data: [91.50],
                    },
                    {
                      name: `FY ${endYear}  Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      data: [`${getOccupancy_ytd()}`],
                      //data: [78.00],
                    },
                  ]}
                  colors={getColor("Occupancy")}
                  //colors={["#0000FF", "#22FF22", "#FF0000"]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="Occupancy (in %)"
                  //type="bar"
                  type="area"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearOccupancyActual],
                      //data: [33, 5, 14, 55, 64, 77, 77, 71, 79, 21, 60, 63],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearOccupancyTarget],
                      //data: [95, 88, 88, 92, 95, 90, 90, 93, 95, 95, 93, 84],
                    },
                    {
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearOccupancyActual],
                      //data: [62, 64, 61, 76, 62, 73, 65, 89, 96, 91, 95, 77],
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
                  title="ARR Budgeted vs YTD Actual"
                  categories={["ARR"]}
                  type="bar"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      //data: [4664],
                      //data: [ Number(`${getArraySum(...myPageData.lastYearArrActual)}`) ],
                      data: [
                        `${Math.round(
                          getArraySum([...myPageData.lastYearArrActual]) / 12
                        )}`,
                      ],
                    },
                    {
                      name: `FY ${endYear} Budget${
                        endYear >= 2024 ? "(Yearly)" : ""
                      }`,
                      //data: [`${5125+5}`],
                      data: [
                        `${Math.round(
                          getArraySum([...myPageData.thisYearArrTarget]) / 12
                        )}`,
                      ],
                    },
                    {
                      name: `FY ${endYear}  Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      //data: [4650],
                      data: [`${getARR_ytd()}`],
                    },
                  ]}
                  //colors={["","",""]}
                  //colors={[ "#0000FF", "#FF0000" ]}
                  //colors={["#0000FF", "#22FF22", "#FF0000"]}
                  colors={getColor("ARR")}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="Average Room Rate (₹ per day)"
                  type="bar"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearArrActual],
                      // data: [
                      //   3195, 2537, 2799, 2713, 2762, 2910, 2910, 4025, 4431, 4161,
                      //   4094, 4150,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearArrTarget],
                      // data: [
                      //   4376, 4378, 4377, 4365, 4356, 4380, 4495, 5479, 5325, 5445,
                      //   5221, 5399,
                      // ],
                    },
                    {
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearArrActual],
                      // data: [
                      //   4435, 4523, 4543, 4412, 4300, 4303, 4589, 4813, 5008, 5185,
                      //   5186, 4675,
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
                  title="RevPAR Budgeted vs YTD Actual"
                  categories={["RevPAR"]}
                  type="bar"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      //data: [4664],
                      //data: [ Number(`${getArraySum(...myPageData.lastYearArrActual)}`) ],
                      data: [
                        `${Math.round(
                          getArraySum([...myPageData.lastYearRevPar]) / 12
                        )}`,
                      ],
                    },
                    {
                      name: `FY ${endYear} Budget${
                        endYear >= 2024 ? "(Yearly)" : ""
                      }`,
                      //data: [`${5125+5}`],
                      data: [
                        `${Math.round(
                          getArraySum([...myPageData.thisYearRevParTarget]) / 12
                        )}`,
                      ],
                    },
                    {
                      name: `FY ${endYear}  Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      //data: [4650],
                      data: [
                        `${Math.round(
                          getArraySum([...myPageData.thisYearRevParActual]) /
                            myPageData.thisYearRevParActual.length
                        )}`,
                      ],
                    },
                  ]}
                  //colors={["","",""]}
                  //colors={[ "#0000FF", "#FF0000" ]}
                  //colors={["#0000FF", "#22FF22", "#FF0000"]}
                  colors={getColor("RevPar")}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="RevPAR (₹)"
                  type="bar"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data: [...myPageData.lastYearRevPar],
                      // data: [
                      //   3195, 2537, 2799, 2713, 2762, 2910, 2910, 4025, 4431, 4161,
                      //   4094, 4150,
                      // ],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data: [...myPageData.thisYearRevParTarget],
                      // data: [
                      //   4376, 4378, 4377, 4365, 4356, 4380, 4495, 5479, 5325, 5445,
                      //   5221, 5399,
                      // ],
                    },
                    {
                      name_old: `FY ${endYear} Actuals${
                        endYear === 2024 ? "(YTD)" : ""
                      }`,
                      name: `FY ${endYear} Actuals`,
                      data: [...myPageData.thisYearRevParActual],
                      // data: [
                      //   4435, 4523, 4543, 4412, 4300, 4303, 4589, 4813, 5008, 5185,
                      //   5186, 4675,
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

export default HotelDashboardGraph;
