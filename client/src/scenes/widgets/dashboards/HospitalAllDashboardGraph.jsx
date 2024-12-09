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
import { useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import allProperties from "../../../data/properties";

import AllChart from "components/charts/AllChart";
import AllChartQuarterly from "components/charts/AllChartQuarterly";
import Radialbar from "components/charts/Radialbar";
import AllChartYTD from "components/charts/AllChartYTD";
import AllChartRange from "components/charts/AllChartRange";

const HospitalAllDashboardGraph = ({ propertyId, propertyCode, selectedYear }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  const [reportData, setReportData] = useState([]);
  const [barasatReportData, setBarasatReportData] = useState([]);
  //
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");
  const filturedProps = allProperties.filter(
    (property) => property._id === propertyId
  );
  //
  //Load Dynamic Data
  const getMISData = async () => {
    console.log("Loading Data from Server, please wait");
    let misYear = Number(selectedYear.split("-")[1]);
    const response = await fetch(
      `https://pragati-backend.com/mis/new?propertyCode=PHH&year=${misYear}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const barasatResponse = await fetch(
      `https://pragati-backend.com/mis/new?propertyCode=PHHB&year=${misYear}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    const barasatData = await barasatResponse.json();

    if (data && barasatData) {
      setReportData(data);
      setBarasatReportData(barasatData);
    } else {
      alert(
        "There is an error loading data from server. Please try after some time"
      );
      navigate("/home");
    }
  };
  //
  useEffect(() => {
    getMISData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let yearArray = [];
  reportData.forEach((mis) => {
    yearArray.push(mis.year);
  });
  yearArray.sort();
  //////////////////////////////////////////////////////////////////////////////
  const dt = new Date();
  let mon = dt.getMonth();
  let ytd_year = dt.getFullYear()+1;
  //alert("Month is: "+mon);
  if(mon <3 ){
    ytd_year -=1;
  }
  //alert("ytd_year: "+ytd_year);

  //////////////////////////////////////////////////////////////////////////////

  let endYear = selectedYear
    ? Number(selectedYear.split("-")[1])
    : yearArray[yearArray.length - 1];
  //

  /////////////////////Helper functions//////////////////////
  const getArraySum = (arr) => {
    let totalArrSum = 0;
    for (let i = 0; i < arr.length; i++) {
      if(!isNaN(Number(arr[i]))) {
        totalArrSum += arr[i];
      }
      
    }
    totalArrSum = Math.round((totalArrSum *= 100));
    return totalArrSum / 100;
  };
  //
  //////////////////////////Helper functions////////////////
  let myPageData = {};
  let myBarasatPageData = {};

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
      lastYearOccupancyQuatTarget: [],
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
      lastYearIntRevTargetArr: [],
      lastYearIntRevActualArr: [],
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
        myPageData.thisYearOccupancyQuatTarget = [
          ...mis.data.occupancy.target_q,
        ];
        myPageData.thisYearOccupancyQuatActual = [
          ...mis.data.occupancy.actual_q,
        ];
        myPageData.thisYearOccupancyActual = [...mis.data.occupancy.actual];
        myPageData.thisYearOccupancyActualYTD = [
          ...mis.data.occupancy.actual_ytd,
        ];
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
        myPageData.lastYearOccupancyQuatTarget = [
          ...mis.data.occupancy.target_q,
        ];
        myPageData.lastYearOccupancyActual = [...mis.data.occupancy.actual];
        myPageData.lastYearOccupancyActualYTD = [
          ...mis.data.occupancy.actual_ytd,
        ];
        myPageData.lastYearOccupancyQuatActual = [
          ...mis.data.occupancy.actual_q,
        ];
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
    console.log( JSON.stringify(myPageData));
    console.log("*** End myPageData ***");
  };
  const populateBarasatPageData = () => {
    myBarasatPageData = {
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
      lastYearOccupancyQuatTarget: [],
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
      lastYearIntRevTargetArr: [],
      lastYearIntRevActualArr: [],
      //indoor_patients
      lastYearIndoorPatientActualArr: [],
      thisYearIndoorPatientTargetArr: [],
      thisYearIndoorPatientActualArr: [],
    };
    //
    barasatReportData.forEach((mis) => {
      if (Number(mis.year) === Number(endYear)) {
        myBarasatPageData.thisYearRevenueActualArr = [...mis.data.revenue.actual];
        myBarasatPageData.thisYearRevenueTargetArr = [...mis.data.revenue.target];

        myBarasatPageData.thisYearPBTActualArr = [...mis.data.PBT.actual];
        myBarasatPageData.thisYearPBTTargetArr = [...mis.data.PBT.target];

        myBarasatPageData.thisYearEBIDTAActualArr = [...mis.data.EBIDTA.actual];
        myBarasatPageData.thisYearEBIDTATargetArr = [...mis.data.EBIDTA.target];

        myBarasatPageData.thisYearEBIDTAActualmgn = [...mis.data.EBIDTA_mgn.actual];
        myBarasatPageData.thisYearEBIDTATargetmgn = [...mis.data.EBIDTA_mgn.target];
        //
        myBarasatPageData.thisYearIntRevTargetArr = [...mis.data.int_rev.target];
        myBarasatPageData.thisYearIntRevActualArr = [...mis.data.int_rev.actual];
        //
        myBarasatPageData.thisYearIndoorPatientTargetArr = [
          ...mis.data.indoor_patients.target,
        ];
        myBarasatPageData.thisYearIndoorPatientActualArr = [
          ...mis.data.indoor_patients.actual,
        ];
        //
        myBarasatPageData.thisYearOccupancyTarget = [...mis.data.occupancy.target];
        myBarasatPageData.thisYearOccupancyQuatTarget = [
          ...mis.data.occupancy.target_q,
        ];
        myBarasatPageData.thisYearOccupancyQuatActual = [
          ...mis.data.occupancy.actual_q,
        ];
        myBarasatPageData.thisYearOccupancyActual = [...mis.data.occupancy.actual];
        myBarasatPageData.thisYearOccupancyActualYTD = [
          ...mis.data.occupancy.actual_ytd,
        ];
        //
        myBarasatPageData.thisYearALOSTarget = [...mis.data.ALOS.target];

        myBarasatPageData.thisYearALOSQuatTarget = [...mis.data.ALOS.target_q];
        myBarasatPageData.thisYearALOSQuatActual = [...mis.data.ALOS.actual_q];

        myBarasatPageData.thisYearALOSActual = [...mis.data.ALOS.actual];
        myBarasatPageData.thisYearALOSActualYTD = [...mis.data.ALOS.actual_ytd];
        //
        myBarasatPageData.thisYearARPOBTarget = [...mis.data.ARPOB.target];

        myBarasatPageData.thisYearARPOBQuatTarget = [...mis.data.ARPOB.target_q];
        myBarasatPageData.thisYearARPOBQuatActual = [...mis.data.ARPOB.actual_q];

        myBarasatPageData.thisYearARPOBActual = [...mis.data.ARPOB.actual];
        myBarasatPageData.thisYearARPOBActualYTD = [...mis.data.ARPOB.actual_ytd];
        //
      } else if (Number(mis.year) === Number(endYear - 1)) {
        myBarasatPageData.lastYearRevenueArr = mis.data.revenue.actual
          ? [...mis.data.revenue.actual]
          : [];
        myBarasatPageData.lastYearPBTArr = mis.data.PBT.actual
          ? [...mis.data.PBT.actual]
          : [];
        myBarasatPageData.lastYearEBDITAArr = [...mis.data.EBIDTA.actual];
        myBarasatPageData.lastYearEBDITAmgn = [...mis.data.EBIDTA_mgn.actual];
        //
        //

        myBarasatPageData.lastYearIntRevTargetArr = [...mis.data.int_rev.target];
        myBarasatPageData.lastYearIntRevActualArr = [...mis.data.int_rev.actual];
        //
        myBarasatPageData.lastYearIndoorPatientTargetArr = [
          ...mis.data.indoor_patients.target,
        ];
        myBarasatPageData.lastYearIndoorPatientActualArr = [
          ...mis.data.indoor_patients.actual,
        ];
        //
        myBarasatPageData.lastYearOccupancyTarget = [...mis.data.occupancy.target];
        myBarasatPageData.lastYearOccupancyQuatTarget = [
          ...mis.data.occupancy.target_q,
        ];
        myBarasatPageData.lastYearOccupancyActual = [...mis.data.occupancy.actual];
        myBarasatPageData.lastYearOccupancyActualYTD = [
          ...mis.data.occupancy.actual_ytd,
        ];
        myBarasatPageData.lastYearOccupancyQuatActual = [
          ...mis.data.occupancy.actual_q,
        ];
        //
        myBarasatPageData.lastYearALOSTarget = [...mis.data.ALOS.target];
        myBarasatPageData.lastYearALOSQuatTarget = [...mis.data.ALOS.target_q];
        myBarasatPageData.lastYearALOSActual = [...mis.data.ALOS.actual];
        myBarasatPageData.lastYearALOSQuatActual = [...mis.data.ALOS.actual_q];
        myBarasatPageData.lastYearALOSActualYTD = [...mis.data.ALOS.actual_ytd];
        //
        myBarasatPageData.lastYearARPOBTarget = [...mis.data.ARPOB.target];
        myBarasatPageData.lastYearARPOBQuatTarget = [...mis.data.ARPOB.target_q];
        myBarasatPageData.lastYearARPOBQuatActual = [...mis.data.ARPOB.actual_q];
        myBarasatPageData.lastYearARPOBActual = [...mis.data.ARPOB.actual];
        myBarasatPageData.lastYearARPOBActualYTD = [...mis.data.ARPOB.actual_ytd];
        //
        //
      }
    });
    console.log("*** myBarasatPageData ***");
    console.log( JSON.stringify(myBarasatPageData) );
    console.log("*** End myBarasatPageData ***");
  };
  //
  const combineArray = (arr1, arr2)=>{
    let res_arr=[];
    for (let a =0; a < arr1.length; a++ ){
      res_arr[a] = arr1[a] + (arr2[a]?arr2[a]:0)
    }
    return res_arr;
  }
  //
  ////////////////////////// End Helper functions ////////////////
  populatePageData();
  populateBarasatPageData();
  //combineData();

  const { palette } = useTheme();

  //EBIDTA Margin Budgeted vs YTD Actual
  const getColor = (item) => {
    let budget, actual;
    let returnArray = ["#0000FF", "#20C77D", "#FDFF00"];
    if (item === "EBIDTAmgn") {
      budget = Math.round(
        (getArraySum(
          [ ...myPageData.thisYearEBIDTATargetArr.slice(0,myPageData.thisYearEBIDTAActualArr.length), ...myBarasatPageData.thisYearEBIDTATargetArr.slice(0,myBarasatPageData.thisYearEBIDTAActualArr.length)]
        ) /
          getArraySum(
           [ ...myPageData.thisYearRevenueTargetArr.slice(0, myPageData.thisYearEBIDTAActualArr.length), ...myBarasatPageData.thisYearRevenueTargetArr.slice(0, myBarasatPageData.thisYearEBIDTAActualArr.length)]
          )) *
          100
      );

      actual = Math.round(
        (getArraySum([...myPageData.thisYearEBIDTAActualArr, ...myBarasatPageData.thisYearEBIDTAActualArr]) /
          getArraySum([...myPageData.thisYearRevenueActualArr, ...myBarasatPageData.thisYearRevenueActualArr])) *
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

    if (actual < budget) {
      returnArray[2] = "#FF0000";
    } else {
      returnArray[2] = "#00FF00";
    }

    return returnArray;
  };

  if (reportData.length === 0) {
    return (
      <>
        <div style={{ width: "100%" }}>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          >
            <h1>Loading Data, Please wait.</h1>
          </Box>
        </div>
      </>
    );
  }

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
                  ₹{getArraySum([...myPageData.thisYearRevenueActualArr, ...myBarasatPageData.thisYearRevenueActualArr])}Cr.
                  {endYear === ytd_year ? "(YTD)" : ""} of ₹
                  {getArraySum([...myPageData.thisYearRevenueTargetArr, ...myBarasatPageData.thisYearRevenueTargetArr] )}Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  PBT (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  ₹{getArraySum([...myPageData.thisYearPBTActualArr,...myBarasatPageData.thisYearPBTActualArr ])}Cr.
                  {endYear === ytd_year ? "(YTD)" : ""} of ₹
                  {getArraySum([...myPageData.thisYearPBTTargetArr, ...myBarasatPageData.thisYearPBTTargetArr])}Cr.
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  EBITDA Margin (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  {Math.round(
                    (getArraySum([...myPageData.thisYearEBIDTAActualArr, ...myBarasatPageData.thisYearEBIDTAActualArr]) /
                      getArraySum([...myPageData.thisYearRevenueActualArr, ...myBarasatPageData.thisYearRevenueActualArr])) *
                      100
                  )}
                  % {endYear === ytd_year ? "(YTD)" : ""}
                </Typography>
                <Divider></Divider>
                
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  ARBOP (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  PHHP: ₹
                  {
                    myPageData.thisYearARPOBActualYTD[
                      myPageData.thisYearARPOBActualYTD.length - 1
                    ]
                  }
                  {endYear === ytd_year ? "(YTD)" : ""}
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  PHHB: ₹
                  {
                    myBarasatPageData.thisYearARPOBActualYTD[
                      myBarasatPageData.thisYearARPOBActualYTD.length - 1
                    ]
                  }
                  {endYear === ytd_year ? "(YTD)" : ""}
                </Typography>
                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  ALOS (FY {endYear})
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  PHHP: {
                    myPageData.thisYearALOSActualYTD[
                      myPageData.thisYearALOSActualYTD.length - 1
                    ]
                  }
                  {" days."}
                  {endYear === ytd_year ? "(YTD)" : ""}
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  PHHB: {
                    myBarasatPageData.thisYearALOSActualYTD[
                      myBarasatPageData.thisYearALOSActualYTD.length - 1
                    ]
                  }
                  {" days."}
                  {endYear === ytd_year ? "(YTD)" : ""}
                </Typography>

                <Divider></Divider>
                <Typography variant="h5" component="div" marginTop={"1rem"}>
                  Total patients served (Indoor)
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  PHHP: {getArraySum(myPageData.thisYearIndoorPatientActualArr)}
                  {endYear === ytd_year ? "(YTD)" : ""}
                </Typography>
                <Typography sx={{ fontSize: 16 }} color="text.secondary">
                  PHHB: {getArraySum(myBarasatPageData.thisYearIndoorPatientActualArr)}
                  {endYear === ytd_year ? "(YTD)" : ""}
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
          <Card
            style={{
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
                              myBarasatPageData.lastYearRevenueArr[0],
                              myBarasatPageData.lastYearRevenueArr[1],
                              myBarasatPageData.lastYearRevenueArr[2],
                            ]).toFixed(2),
                            getArraySum([
                              myPageData.lastYearRevenueArr[3],
                              myPageData.lastYearRevenueArr[4],
                              myPageData.lastYearRevenueArr[5],
                              myBarasatPageData.lastYearRevenueArr[3],
                              myBarasatPageData.lastYearRevenueArr[4],
                              myBarasatPageData.lastYearRevenueArr[5],
                            ]).toFixed(2),
                            getArraySum([
                              myPageData.lastYearRevenueArr[6],
                              myPageData.lastYearRevenueArr[7],
                              myPageData.lastYearRevenueArr[8],
                              myBarasatPageData.lastYearRevenueArr[6],
                              myBarasatPageData.lastYearRevenueArr[7],
                              myBarasatPageData.lastYearRevenueArr[8],
                            ]).toFixed(2),
                            getArraySum([
                              myPageData.lastYearRevenueArr[9],
                              myPageData.lastYearRevenueArr[10],
                              myPageData.lastYearRevenueArr[11],
                              myBarasatPageData.lastYearRevenueArr[9],
                              myBarasatPageData.lastYearRevenueArr[10],
                              myBarasatPageData.lastYearRevenueArr[11],
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
                              myBarasatPageData.thisYearRevenueTargetArr[0],
                              myBarasatPageData.thisYearRevenueTargetArr[1],
                              myBarasatPageData.thisYearRevenueTargetArr[2],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueTargetArr[3],
                              myPageData.thisYearRevenueTargetArr[4],
                              myPageData.thisYearRevenueTargetArr[5],
                              myBarasatPageData.thisYearRevenueTargetArr[3],
                              myBarasatPageData.thisYearRevenueTargetArr[4],
                              myBarasatPageData.thisYearRevenueTargetArr[5],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueTargetArr[6],
                              myPageData.thisYearRevenueTargetArr[7],
                              myPageData.thisYearRevenueTargetArr[8],
                              myBarasatPageData.thisYearRevenueTargetArr[6],
                              myBarasatPageData.thisYearRevenueTargetArr[7],
                              myBarasatPageData.thisYearRevenueTargetArr[8],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueTargetArr[9],
                              myPageData.thisYearRevenueTargetArr[10],
                              myPageData.thisYearRevenueTargetArr[11],
                              myBarasatPageData.thisYearRevenueTargetArr[9],
                              myBarasatPageData.thisYearRevenueTargetArr[10],
                              myBarasatPageData.thisYearRevenueTargetArr[11],
                            ]),
                          ],
                        },
                        {
                          name1_: `FY ${endYear} Actuals${
                            endYear === ytd_year ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            getArraySum([
                              myPageData.thisYearRevenueActualArr[0],
                              myPageData.thisYearRevenueActualArr[1],
                              myPageData.thisYearRevenueActualArr[2],
                              myBarasatPageData.thisYearRevenueActualArr[0],
                              myBarasatPageData.thisYearRevenueActualArr[1],
                              myBarasatPageData.thisYearRevenueActualArr[2],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueActualArr[3],
                              myPageData.thisYearRevenueActualArr[4],
                              myPageData.thisYearRevenueActualArr[5],
                              myBarasatPageData.thisYearRevenueActualArr[3],
                              myBarasatPageData.thisYearRevenueActualArr[4],
                              myBarasatPageData.thisYearRevenueActualArr[5],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueActualArr[6],
                              myPageData.thisYearRevenueActualArr[7],
                              myPageData.thisYearRevenueActualArr[8],
                              myBarasatPageData.thisYearRevenueActualArr[6],
                              myBarasatPageData.thisYearRevenueActualArr[7],
                              myBarasatPageData.thisYearRevenueActualArr[8],
                            ]),
                            getArraySum([
                              myPageData.thisYearRevenueActualArr[9],
                              myPageData.thisYearRevenueActualArr[10],
                              myPageData.thisYearRevenueActualArr[11],
                              myBarasatPageData.thisYearRevenueActualArr[9],
                              myBarasatPageData.thisYearRevenueActualArr[10],
                              myBarasatPageData.thisYearRevenueActualArr[11],
                            ]),
                          ],
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
                              myBarasatPageData.lastYearPBTArr[0],
                              myBarasatPageData.lastYearPBTArr[1],
                              myBarasatPageData.lastYearPBTArr[2],
                            ]),
                            getArraySum([
                              myPageData.lastYearPBTArr[3],
                              myPageData.lastYearPBTArr[4],
                              myPageData.lastYearPBTArr[5],
                              myBarasatPageData.lastYearPBTArr[3],
                              myBarasatPageData.lastYearPBTArr[4],
                              myBarasatPageData.lastYearPBTArr[5],
                            ]),
                            getArraySum([
                              myPageData.lastYearPBTArr[6],
                              myPageData.lastYearPBTArr[7],
                              myPageData.lastYearPBTArr[8],
                              myBarasatPageData.lastYearPBTArr[6],
                              myBarasatPageData.lastYearPBTArr[7],
                              myBarasatPageData.lastYearPBTArr[8],
                            ]),
                            getArraySum([
                              myPageData.lastYearPBTArr[9],
                              myPageData.lastYearPBTArr[10],
                              myPageData.lastYearPBTArr[11],
                              myBarasatPageData.lastYearPBTArr[9],
                              myBarasatPageData.lastYearPBTArr[10],
                              myBarasatPageData.lastYearPBTArr[11],
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
                              myBarasatPageData.thisYearPBTTargetArr[0],
                              myBarasatPageData.thisYearPBTTargetArr[1],
                              myBarasatPageData.thisYearPBTTargetArr[2],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTTargetArr[3],
                              myPageData.thisYearPBTTargetArr[4],
                              myPageData.thisYearPBTTargetArr[5],
                              myBarasatPageData.thisYearPBTTargetArr[3],
                              myBarasatPageData.thisYearPBTTargetArr[4],
                              myBarasatPageData.thisYearPBTTargetArr[5],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTTargetArr[6],
                              myPageData.thisYearPBTTargetArr[7],
                              myPageData.thisYearPBTTargetArr[8],
                              myBarasatPageData.thisYearPBTTargetArr[6],
                              myBarasatPageData.thisYearPBTTargetArr[7],
                              myBarasatPageData.thisYearPBTTargetArr[8],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTTargetArr[9],
                              myPageData.thisYearPBTTargetArr[10],
                              myPageData.thisYearPBTTargetArr[11],
                              myBarasatPageData.thisYearPBTTargetArr[9],
                              myBarasatPageData.thisYearPBTTargetArr[10],
                              myBarasatPageData.thisYearPBTTargetArr[11],
                            ]),
                          ],
                        },
                        {
                          name_1: `FY ${endYear} Actuals${
                            endYear === ytd_year ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            getArraySum([
                              myPageData.thisYearPBTActualArr[0],
                              myPageData.thisYearPBTActualArr[1],
                              myPageData.thisYearPBTActualArr[2],
                              myBarasatPageData.thisYearPBTActualArr[0],
                              myBarasatPageData.thisYearPBTActualArr[1],
                              myBarasatPageData.thisYearPBTActualArr[2],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTActualArr[3],
                              myPageData.thisYearPBTActualArr[4],
                              myPageData.thisYearPBTActualArr[5],
                              myBarasatPageData.thisYearPBTActualArr[3],
                              myBarasatPageData.thisYearPBTActualArr[4],
                              myBarasatPageData.thisYearPBTActualArr[5],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTActualArr[6],
                              myPageData.thisYearPBTActualArr[7],
                              myPageData.thisYearPBTActualArr[8],
                              myBarasatPageData.thisYearPBTActualArr[6],
                              myBarasatPageData.thisYearPBTActualArr[7],
                              myBarasatPageData.thisYearPBTActualArr[8],
                            ]),
                            getArraySum([
                              myPageData.thisYearPBTActualArr[9],
                              myPageData.thisYearPBTActualArr[10],
                              myPageData.thisYearPBTActualArr[11],
                              myBarasatPageData.thisYearPBTActualArr[9],
                              myBarasatPageData.thisYearPBTActualArr[10],
                              myBarasatPageData.thisYearPBTActualArr[11],
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
                            endYear === ytd_year ? "(YTD)" : ""
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
                            endYear === ytd_year ? "(YTD)" : ""
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
                            myPageData.lastYearOccupancyQuatActual[11],
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
                            endYear === ytd_year ? "(YTD)" : ""
                          }`,
                          name: `FY ${endYear} Actuals`,
                          data: [
                            myPageData.thisYearOccupancyQuatActual[2],
                            myPageData.thisYearOccupancyQuatActual[5],
                            myPageData.thisYearOccupancyQuatActual[8],
                            myPageData.thisYearOccupancyQuatActual[11],
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
                      (getArraySum([...myPageData.thisYearRevenueActualArr, ...myBarasatPageData.thisYearRevenueActualArr]) /
                        getArraySum([...myPageData.thisYearRevenueTargetArr,...myBarasatPageData.thisYearRevenueTargetArr])) *
                      100
                    ).toFixed(2)}`,
                  ]}
                />
              </Box>

              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                {/*
                * work on combine array combineArray
                */}
                <AllChart
                  title="Revenue (in Cr.)"
                  type="line"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data_old: [...myPageData.lastYearRevenueArr],
                      data : [...combineArray(myPageData.lastYearRevenueArr, myBarasatPageData.lastYearRevenueArr)]
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data_old: [...myPageData.thisYearRevenueTargetArr],
                      data: [...combineArray(myPageData.thisYearRevenueTargetArr, myBarasatPageData.thisYearRevenueTargetArr)]
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data_old: [...myPageData.thisYearRevenueActualArr],
                      data: [...combineArray(myPageData.thisYearRevenueActualArr, myBarasatPageData.thisYearRevenueActualArr)]
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
                  series_old={[26.92]}
                  series={[
                    `${(
                      (getArraySum([...myPageData.thisYearEBIDTAActualArr, ...myBarasatPageData.thisYearEBIDTAActualArr]) /
                        getArraySum([...myPageData.thisYearEBIDTATargetArr, ...myBarasatPageData.thisYearEBIDTATargetArr])) *
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
                      data_old: [...myPageData.lastYearEBDITAArr],
                      data: [...combineArray(myPageData.lastYearEBDITAArr, myBarasatPageData.lastYearEBDITAArr)]
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data_old: [...myPageData.thisYearEBIDTATargetArr],
                      data: [...combineArray(myPageData.thisYearEBIDTATargetArr, myBarasatPageData.thisYearEBIDTATargetArr)]
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data_old: [...myPageData.thisYearEBIDTAActualArr],
                      data: [...combineArray(myPageData.thisYearEBIDTAActualArr, myBarasatPageData.thisYearEBIDTAActualArr)]
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
                      (getArraySum([...myPageData.thisYearPBTActualArr, ...myBarasatPageData.thisYearPBTActualArr]) /
                        getArraySum([...myPageData.thisYearPBTTargetArr, ...myBarasatPageData.thisYearPBTTargetArr])) *
                      100
                    ).toFixed(2)}`,
                  ]}
                />
              </Box>
              <Box style={{ width: isNonMobileScreens ? "70%" : "100%" }}>
                <AllChart
                  title="PBT (in Cr.) Bar"
                  //type="bar"
                  series={[
                    {
                      name: `FY ${endYear - 1} Actuals`,
                      data_old: [...myPageData.lastYearPBTArr],
                      data: [...combineArray(myPageData.lastYearPBTArr, myBarasatPageData.lastYearPBTArr)]
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data_old: [...myPageData.thisYearPBTTargetArr],
                      data: [...combineArray(myPageData.thisYearPBTTargetArr, myBarasatPageData.thisYearPBTTargetArr)]
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data_old: [...myPageData.thisYearPBTActualArr],
                      data: [...combineArray(myPageData.thisYearPBTActualArr, myBarasatPageData.thisYearPBTActualArr)]
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
                          (getArraySum([...myPageData.lastYearEBDITAArr, ...myBarasatPageData.lastYearEBDITAArr]) /
                            getArraySum([...myPageData.lastYearRevenueArr, ...myBarasatPageData.lastYearRevenueArr])) *
                            100
                        )}`,
                      ],
                    },
                    {
                      name: `FY ${endYear} Budget${
                        endYear >= ytd_year ? "(YTD)" : ""
                      }`,
                      data: [
                        `${Math.round(
                          (getArraySum(
                            [ ...myPageData.thisYearEBIDTATargetArr.slice(0, myPageData.thisYearEBIDTAActualArr.length), ...myBarasatPageData.thisYearEBIDTATargetArr.slice(0, myBarasatPageData.thisYearEBIDTAActualArr.length) ]
                          ) /
                            getArraySum( 
                             [ ...myPageData.thisYearRevenueTargetArr.slice(0, myPageData.thisYearEBIDTAActualArr.length), ...myBarasatPageData.thisYearRevenueTargetArr.slice(0, myBarasatPageData.thisYearEBIDTAActualArr.length) ]
                            )) *
                            100
                        )}`,
                      ],
                    },
                    {
                      name: `FY ${endYear}  Actuals${
                        endYear >= ytd_year ? "(YTD)" : ""
                      }`,
                      data: [
                        `${Math.round(
                          (getArraySum( [...myPageData.thisYearEBIDTAActualArr, ...myBarasatPageData.thisYearEBIDTAActualArr] ) /
                            getArraySum([...myPageData.thisYearRevenueActualArr, ...myBarasatPageData.thisYearRevenueActualArr] )) *
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
                      data_old: [...myPageData.lastYearEBDITAmgn],
                      data: [...combineArray(myPageData.lastYearEBDITAmgn, myBarasatPageData.lastYearEBDITAmgn)],
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data_old: [...myPageData.thisYearEBIDTATargetmgn],
                      data: [...combineArray(myPageData.thisYearEBIDTATargetmgn, myBarasatPageData.thisYearEBIDTATargetmgn) ],
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data_old: [...myPageData.thisYearEBIDTAActualmgn],
                      data: [...combineArray(myPageData.thisYearEBIDTAActualmgn, myBarasatPageData.thisYearEBIDTAActualmgn)],
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
                        ...myPageData.thisYearIndoorPatientActualArr,...myBarasatPageData.thisYearIndoorPatientActualArr
                      ]) /
                        getArraySum([
                          ...myPageData.thisYearIndoorPatientTargetArr, ...myBarasatPageData.thisYearIndoorPatientTargetArr,
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
                      name: `FY ${endYear - 1} Actuals`,
                      data_old: [...myPageData.lastYearIndoorPatientActualArr],
                      data: [...combineArray(myPageData.lastYearIndoorPatientActualArr, myBarasatPageData.lastYearIndoorPatientActualArr)]
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data_old: [...myPageData.thisYearIndoorPatientTargetArr],
                      data: [...combineArray(myPageData.thisYearIndoorPatientTargetArr, myBarasatPageData.thisYearIndoorPatientTargetArr)]
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data_old: [...myPageData.thisYearIndoorPatientActualArr],
                      data: [...combineArray(myPageData.thisYearIndoorPatientActualArr, myBarasatPageData.thisYearIndoorPatientActualArr)]
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
                      (getArraySum([...myPageData.thisYearIntRevActualArr, ...myBarasatPageData.thisYearIntRevActualArr]) /
                        getArraySum([...myPageData.thisYearIntRevTargetArr, ...myBarasatPageData.thisYearIntRevTargetArr])) *
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
                      name: `FY ${endYear - 1} Actuals`,
                      data_old: [...myPageData.lastYearIntRevActualArr],
                      data: [...combineArray(myPageData.lastYearIntRevActualArr, myBarasatPageData.lastYearIntRevActualArr)]
                    },
                    {
                      name: `FY ${endYear} Budget`,
                      data_old: [...myPageData.thisYearIntRevTargetArr],
                      data: [...combineArray(myPageData.thisYearIntRevTargetArr, myBarasatPageData.thisYearIntRevTargetArr)]
                    },
                    {
                      name: `FY ${endYear} Actuals`,
                      data_old: [...myPageData.thisYearIntRevActualArr],
                      data: [...combineArray(myPageData.thisYearIntRevActualArr, myBarasatPageData.thisYearIntRevActualArr)]
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

export default HospitalAllDashboardGraph;
