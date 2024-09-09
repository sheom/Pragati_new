import { useState, createContext } from "react";
import { useEffect } from "react";
import { Typography, Box, Stack, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";

//
const monthsArray = [
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const currentMonth = new Date().getMonth();
//let daysLeft = monthDays[currentMonth] - new Date().getDate() - 1;
let daysLeft = 21 - new Date().getDate();
let qEnd = false;
//
const targetSchema = yup.object().shape({
  inputRevenue: yup.number().required("required"),
  inputPBT: yup.number().required("required"),
  inputEBIDTA: yup.number().required("required"),

  inputALOS: yup.number().min(0).max(100).required("required"),
  inputALOSYTD: yup.number().min(0).max(100).required("required"),
  inputALOS_q: yup.number().min(0).max(100).required("Please provide ALOS of this quater."),
  
  inputARPOB: yup.number().required("required"),
  inputARPOBYTD: yup.number().required("required"),
  inputARPOB_q: yup.number().required("Please provide ARPOB of this quater"),
  //
  inputOccupancy: yup.number().required("required"),
  inputOccupancyYTD: yup.number().required("required"),
  inputOccupancy_q: yup.number().required("Please provide Occupancy of this quater."),
  //
  inputOpCash: yup.number().required("required"),
  inputCashGen: yup.number().required("required"),
  inputCashInflow: yup.number().required("required"),
  inputCashOutflow: yup.number().required("required"),
  inputIntRevenue: yup.number().required("required"),
  inputPatientServed: yup.number().required("required"),
  termsAndConditions: yup
    .bool()
    .oneOf([true], 'You need to validate the data before submitting'),
});
const initialValuesTarget = {
  inputRevenue: "",
  inputPBT: "",
  inputEBIDTA: "",
  inputALOS: "",
  inputALOSYTD: "",
  inputALOS_q: "",
  inputARPOB: "",
  inputARPOBYTD: "",
  inputARPOB_q: "",
  inputOccupancy: "",
  inputOccupancyYTD: "",
  inputOccupancy_q: "",
  inputOpCash: "",
  inputCashGen: "",
  inputCashInflow: "",
  inputCashOutflow: "",
  inputIntRevenue:"",
  inputPatientServed:"",
  termsAndConditions: false,
};
//alert("qEnd: "+qEnd);
if(!qEnd){
  initialValuesTarget.inputALOS_q= 0;
  initialValuesTarget.inputARPOB_q= 0;
  initialValuesTarget.inputOccupancy_q = 0;
}

const HospitalActualFormWidget = ({ propertyName, propertyCode, propertyId }) => {
  const isCurrentUser = true;
  const theme = createTheme();
  const navigate = useNavigate();
  const [formLocked, setFormLocked] = useState(false);
  const token = useSelector((state) => state.token);

  //
  const getBudget = async () => {
    //"https://sheom.in/",
    const response = await fetch(
      `https://sheom.in/actual?propertyCode=${propertyCode}&actualYear=${new Date().getFullYear()}&actualMonth=${
        monthsArray[currentMonth]
      } `,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data[0]) {
      //alert("Data is available");
      //initialValuesTarget = { ...data[0].payload };
      //setSessionTarget({ ...data[0].payload });
      //alert("data[0].locked: " + data[0].locked);
      if (data[0].locked) {
        setFormLocked(true);
      }
      //alert("initialValuesTarget: " + JSON.stringify(initialValuesTarget));
    } else {
      //alert("Data is not available");
    }
  };

  useEffect(() => {
    getBudget();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //

  const handleFormSubmit = async (values, onSubmitProps) => {
    //alert("Form Submitted from Handle Form Submit");
    console.log(values);
    const data = {
      propertyName,
      propertyCode,
      propertyId,
      payload: { ...values },
    };
    // setFormData(data);
    // setActiveStepIndex(activeStepIndex + 1);
    console.log("***data*** Will show complete form data");
    console.log(data);
    ///
    const savedActualResponse = await fetch(
      "https://sheom.in/actual/add",
      //"http://localhost:4000/actual/add",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const savedActual = await savedActualResponse.json();
    //console.log("savedActual");
    //console.log(savedActual);
    console.log("/////////////////////");
    if (savedActual) {
      if (savedActual.message) {
        alert(savedActual.message);
      } else {
        alert("Data saved to the server");
        setFormLocked(true);
      }
    } else {
      alert("Error Saving data");
    }
    console.log(savedActual);
    //
  };
  let returnValue = "";

  if (formLocked) {
    returnValue = (
      <>
        <Typography
          fontSize={25}
          fontWeight={700}
          //color="#11142D"
          align="center"
          color="#FF0000"
        >
          {propertyName}
          <Divider />
          Data is already submitted for this month of the Property
        </Typography>
        <h1> </h1>
      </>
    );
  } else if(daysLeft <=0){
    returnValue = (
      <>
        <Typography
          fontSize={25}
          fontWeight={700}
          //color="#11142D"
          align="center"
          color="#FF0000"
        >
          {propertyName}
          <Divider />
          Date is over for this month of the Property. <br/> 
          
        </Typography>
        <Typography
          fontSize={16}
          //fontWeight={700}
          color="#11142D"
          align="center"
          //color="#FF0000"
        >
          Please contact pragati@peerless.co.in if you have not submitted your data yet.
        </Typography>
        
        <h1> </h1>
      </>
    );
  }
  else {
    returnValue = (
      <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesTarget}
        validationSchema={targetSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          //setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <>
              <Box
                borderRadius="15px"
                padding="20px"
                bgcolor="#FCFCFC"
                width="100%"
              >
                <Box
                  mt="2px"
                  display="flex"
                  flexDirection={{ xs: "column", lg: "row" }}
                  gap={4}
                >
                  <Box flex={1} maxWidth={"100 %"}>
                    <Box
                      mt="10px"
                      mb="15px"
                      borderRadius="15px"
                      padding="2px"
                      bgcolor="#FFFFFF"
                      alignItems={"center"}
                      border="1px solid #E4E4E4"
                    >
                      {/* <ThemeProvider theme={theme}> */}
                      <Container component="main">
                        <CssBaseline />
                        <Box
                          sx={{
                            marginTop: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",

                            borderRadius: "15px",
                            padding: "2px",
                            bgcolor: "#FFFFFF",
                          }}
                        >
                          <Typography
                            fontSize={25}
                            fontWeight={700}
                            //color="#11142D"
                            color="#FF0000"
                            align="center"
                          >
                            {propertyName}
                              <Divider />
                            Achievements for the month of <br/>
                            {monthsArray[currentMonth]}{" "}
                            {new Date().getFullYear()}
                          </Typography>
                          <br />
                          <Box>
                            <h3>USER INSTRUCTIONS:</h3>
                            <ul>
                              <li>
                                User can fill actual data for each month from 1st to 15th of upcoming month. For eg: the form for the month of June will be accessible to the user from 1st July to 15th July for actual data entry.  
                              </li>
                              <li>
                                Once the data is submitted or after 2400 Hrs on the 15th of the upcoming month the form will automatically freeze and if data is not submitted by then, at the management level visualization an error message will pop-up as “data by subsidiary not submitted”.
                              </li>
                              <li>
                                Data cannot be altered/changed after submission of Actual form.
                              </li>
                            </ul>
                            </Box>

                          <Box alignItems={"center"} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography fontSize={20} fontWeight={400}>
                                  Financial Metrics:
                                </Typography>
                                <Divider />
                              </Grid>

                              <Grid item xs={12}>
                                Revenue in Cr.
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    label="Revenue in Cr."
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputRevenue}
                                    name="inputRevenue"
                                    type="number"
                                    error={
                                      Boolean(touched.inputRevenue) &&
                                      Boolean(errors.inputRevenue)
                                    }
                                    helperText={
                                      touched.inputRevenue &&
                                      errors.inputRevenue
                                    }
                                    width="100%"
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} sm={12}>
                                EBIDTA in Cr.
                                <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    //label="EBIDTA in Cr."
                                    placeholder="EBIDTA in Cr."
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputEBIDTA}
                                    name="inputEBIDTA"
                                    type="number"
                                    error={
                                      Boolean(touched.inputEBIDTA) &&
                                      Boolean(errors.inputEBIDTA)
                                    }
                                    helperText={
                                      touched.inputEBIDTA &&
                                      errors.inputEBIDTA
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12}>
                                PBT in Cr.
                                <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    //label="PBT in Cr."
                                    placeholder="PBT in Cr."
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputPBT}
                                    name="inputPBT"
                                    type="number"
                                    error={
                                      Boolean(touched.inputPBT) &&
                                      Boolean(errors.inputPBT)
                                    }
                                    helperText={
                                      touched.inputPBT &&
                                      errors.inputPBT
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Typography fontSize={20} fontWeight={700}>
                                &nbsp;
                              </Typography>

                              <Grid item xs={12}>
                                <Typography fontSize={20} fontWeight={400}>
                                  Estimated Cash Flow:
                                </Typography>
                                <Divider />
                              </Grid>

                              <Grid item xs={12} sm={12}>
                                Op Cash/ Bank Balance in Cr.
                                <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    //label="Op Cash/ Bank Balance in Cr"
                                    placeholder="Op Cash/ Bank Balance in Cr"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputOpCash}
                                    name="inputOpCash"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputOpCash) &&
                                      Boolean(errors.inputOpCash)
                                    }
                                    helperText={
                                      touched.inputOpCash &&
                                      errors.inputOpCash
                                    }
                                  />
                                  </FormControl>
                              </Grid>

                              <Grid item xs={12} sm={12}>
                                Internal Cash generation in Cr.
                                <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    //label="Op Cash/ Bank Balance in Cr"
                                    placeholder="Op Cash/ Bank Balance in Cr"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputCashGen}
                                    name="inputCashGen"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputCashGen) &&
                                      Boolean(errors.inputCashGen)
                                    }
                                    helperText={
                                      touched.inputCashGen &&
                                      errors.inputCashGen
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} sm={12}>
                                Major Cash Inflow in Cr.
                                <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    //label="Major Cash Inflow in Cr."
                                    placeholder="Major Cash Inflow in Cr."
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputCashInflow}
                                    name="inputCashInflow"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputCashInflow) &&
                                      Boolean(errors.inputCashInflow)
                                    }
                                    helperText={
                                      touched.inputCashInflow &&
                                      errors.inputCashInflow
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} sm={12}>
                                Major Cash Outflow in Cr:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    //label="Major Cash Outflow in Cr."
                                    placeholder="Major Cash Outflow in Cr."
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputCashOutflow}
                                    name="inputCashOutflow"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputCashOutflow) &&
                                      Boolean(errors.inputCashOutflow)
                                    }
                                    helperText={
                                      touched.inputCashOutflow &&
                                      errors.inputCashOutflow
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12}>
                                <Divider></Divider>
                                Closing Cash & Bank balance
                                <TextField
                                  id="closing-cash"
                                  //label="Number"
                                  placeholder=""
                                  type="number"
                                  fullWidth
                                  disabled
                                  value={ values.inputOpCash + values.inputCashGen + values.inputCashInflow - values.inputCashOutflow  }
                                  InputLabelProps={{
                                    shrink: false,
                                  }}
                                  //value="Autocalculated"
                                />
                              </Grid>

                              <Typography fontSize={20} fontWeight={700}>
                                &nbsp;
                              </Typography>

                              <Grid item xs={12}>
                                <Typography fontSize={20} fontWeight={400}>
                                  Operating Metrics:
                                </Typography>
                                <Divider />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                ALOS: (in days) - Month
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                  endAdornment={
                                    <InputAdornment position="end">
                                      days
                                    </InputAdornment>
                                  }
                                    placeholder="ALOS - Month"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputALOS}
                                    name="inputALOS"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputALOS) &&
                                      Boolean(errors.inputALOS)
                                    }
                                    helperText={
                                      touched.inputALOS &&
                                      errors.inputALOS
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                ALOS: (in days) - YTD
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                  endAdornment={
                                    <InputAdornment position="end">
                                      days
                                    </InputAdornment>
                                  }
                                    placeholder="ALOS - YTD"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputALOSYTD}
                                    name="inputALOSYTD"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputALOSYTD) &&
                                      Boolean(errors.inputALOSYTD)
                                    }
                                    helperText={
                                      touched.inputALOSYTD &&
                                      errors.inputALOSYTD
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              {/* <hr />
                              <Grid item xs={12} sm={6}>
                                ALOS: (in days) - for this quarter
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                  endAdornment={
                                    <InputAdornment position="end">
                                      daysq
                                    </InputAdornment>
                                  }
                                    placeholder="ALOS - Quarterly"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputALOS_q}
                                    name="inputALOS_q"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputALOS_q) &&
                                      Boolean(errors.inputALOS_q)
                                    }
                                    helperText={
                                      touched.inputALOS_q &&
                                      errors.inputALOS_q
                                    }
                                  />
                                </FormControl>
                              </Grid> */}

                              
                              <Grid item xs={12} sm={6}>
                                ARPOB: (in INR) - Month
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={
                                      <InputAdornment position="start">
                                        INR.
                                      </InputAdornment>
                                    }
                                    placeholder="ARPOB - Month"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputARPOB}
                                    name="inputARPOB"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputARPOB) &&
                                      Boolean(errors.inputARPOB)
                                    }
                                    helperText={
                                      touched.inputARPOB &&
                                      errors.inputARPOB
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                ARPOB: (in INR) - YTD
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={
                                      <InputAdornment position="start">
                                        INR.
                                      </InputAdornment>
                                    }
                                    placeholder="ARPOB - YTD"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputARPOBYTD}
                                    name="inputARPOBYTD"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputARPOBYTD) &&
                                      Boolean(errors.inputARPOBYTD)
                                    }
                                    helperText={
                                      touched.inputARPOBYTD &&
                                      errors.inputARPOBYTD
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              {/* <hr/>
                              <Grid item xs={12} sm={6}>
                                ARPOB: (in INR) - for this quarter
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={
                                      <InputAdornment position="start">
                                        INR.
                                      </InputAdornment>
                                    }
                                    placeholder="ARPOB - Quarterly"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputARPOB_q}
                                    name="inputARPOB_q"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputARPOB_q) &&
                                      Boolean(errors.inputARPOB_q)
                                    }
                                    helperText={
                                      touched.inputARPOB_q &&
                                      errors.inputARPOB_q
                                    }
                                  />
                                </FormControl>
                              </Grid> */}

                              <Grid item xs={12} sm={6}>
                                Occupancy: (in percent) - Month
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-percent-month">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-percent"
                                    endAdornment={
                                      <InputAdornment position="start">
                                        percent
                                      </InputAdornment>
                                    }
                                    placeholder="Occupancy - Month"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputOccupancy}
                                    name="inputOccupancy"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputOccupancy) &&
                                      Boolean(errors.inputOccupancy)
                                    }
                                    helperText={
                                      touched.inputOccupancy &&
                                      errors.inputOccupancy
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                Occupancy: (in percent) - YTD
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    endAdornment={
                                      <InputAdornment position="end">
                                        Percent
                                      </InputAdornment>
                                    }
                                    placeholder="Occupancy - YTD"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputOccupancyYTD}
                                    name="inputOccupancyYTD"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputOccupancyYTD) &&
                                      Boolean(errors.inputOccupancyYTD)
                                    }
                                    helperText={
                                      touched.inputOccupancyYTD &&
                                      errors.inputOccupancyYTD
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              {/* <hr/>
                              <Grid item xs={12} sm={6}>
                                Occupancy: (in percent) - quarter
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <InputLabel htmlFor="outlined-adornment-percent-month">
                                    {" "}
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-percent"
                                    endAdornment={
                                      <InputAdornment position="start">
                                        percent
                                      </InputAdornment>
                                    }
                                    placeholder="Occupancy - Month"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputOccupancy_q}
                                    name="inputOccupancy_q"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputOccupancy_q) &&
                                      Boolean(errors.inputOccupancy_q)
                                    }
                                    helperText={
                                      touched.inputOccupancy_q &&
                                      errors.inputOccupancy_q
                                    }
                                  />
                                </FormControl>
                              </Grid> */}

                              <Grid item xs={12} sm={12}>
                              International Revenue in Cr.:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    placeholder="International Revenue in Cr."
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputIntRevenue}
                                    name="inputIntRevenue"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputIntRevenue) &&
                                      Boolean(errors.inputIntRevenue)
                                    }
                                    helperText={
                                      touched.inputIntRevenue &&
                                      errors.inputIntRevenue
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12} sm={12}>
                              Total No. of Patients Served:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    //label="Total No. of Patients Served:"
                                    placeholder="Total No. of Patients Served"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.inputPatientServed}
                                    name="inputPatientServed"
                                    type="number"
                                    fullWidth
                                    error={
                                      Boolean(touched.inputPatientServed) &&
                                      Boolean(errors.inputPatientServed)
                                    }
                                    helperText={
                                      touched.inputPatientServed &&
                                      errors.inputPatientServed
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12}>
                                <Divider></Divider>
                              </Grid>

                              <Grid item xs={12}>
                              <FormControl fullWidth sx={{ m: 1 }}>
                                <FormControlLabel
                                fullWidth
                                  control={
                                    <Field type="checkbox" name="termsAndConditions" />
                                  }
                                  label="  The provided data is correct as per my knowledge."
                                />
                                {errors.termsAndConditions && <p><b bgcolor="#FF0000">{errors.termsAndConditions}</b></p>}
                                </FormControl>
                              </Grid>
                            </Grid>

                            <Button
                              type="submit"
                              fullWidth
                              variant="outlined"
                              sx={{ mt: 3, mb: 2 }}
                            >
                              Submit
                            </Button>

                            <Button
                              type="cancel"
                              fullWidth
                              variant="link"
                              sx={{ mt: 3, mb: 2 }}
                              onClick={() =>
                                navigate(`/property/show/${propertyId}`)
                              }
                            >
                              cancel
                            </Button>
                          </Box>
                          <Typography
                            fontSize={14}
                            //fontWeight={700}
                            //color="#11142D"
                            color="#FF0000"
                          >
                            <i>
                                *Page freezes in: <b>{daysLeft}</b> days
                              </i>
                            <br/>
                          </Typography>
                        </Box>
                      </Container>
                      {/* </ThemeProvider> */}
                    </Box>
                  </Box>
                  {/* // Right area */}
                </Box>
              </Box>
            </>
          </form>
        )}
      </Formik>
      </>
    )
  }

  return (
    returnValue
  );
};

export default HospitalActualFormWidget;
