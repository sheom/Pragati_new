import { useEffect } from "react";
import { useState, createContext } from "react";

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

////////////////////////////////
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
//alert(currentMonth);
// Jan = 0;

//let daysLeft = monthDays[currentMonth] - new Date().getDate() - 1;
let daysLeft = 17 - new Date().getDate();
let qEnd = false;
//let today = monthDays - new Date().getDate()

////////////////////////////////

const targetSchema = yup.object().shape({
  //
  inputRoomRevenue: yup.number().required("Required"),
  inputFnBRevenue: yup.number().required("Required"),
  inputBanquetRevenue: yup.number().required("Required"),
  //
  inputRevenue: yup.number().required("required"),
  //
  inputPBT: yup.number().required("required"),
  inputEBIDTA: yup.number().required("required"),
  
  inputOccupancy: yup.number().required("required"),
  inputOccupancyYTD: yup.number().required("required"),
  inputOccupancy_q: yup.number().required("required"),
  
  inputARR: yup.number().required("required"),
  inputARRYTD: yup.number().required("required"),
  inputARR_q: yup.number().required("required"),

  inputOpCash: yup.number().required("required"),
  inputCashGen: yup.number().required("required"),
  inputCashInflow: yup.number().required("required"),
  inputCashOutflow: yup.number().required("required"),
  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to validate the data before submitting"),
});

//propertyName={filturedProperty[0].title} propertyCode={filturedProperty[0].propertyCode} propertyId={propertyId} />
const HotelActualFormWidget = ({ propertyName, propertyCode, propertyId }) => {
  const isCurrentUser = true;
  const theme = createTheme();
  const navigate = useNavigate();
  //
  let initialValuesTarget = {
    inputRevenue: "",
    inputRoomRevenue: "",
    inputFnBRevenue: "",
    inputBanquetRevenue: "",
    //
    inputPBT: "",
    inputEBIDTA: "",
    inputOccupancy: "",
    inputOccupancyYTD: "",
    inputOccupancy_q: "",
    
    inputARR: "",
    inputARRYTD: "",
    inputARR_q: "",

    inputOpCash: "",
    inputCashGen: "",
    inputCashInflow: "",
    inputCashOutflow: "",
    termsAndConditions: false,
  };
  //
  if(!qEnd){
    initialValuesTarget.inputOccupancy_q= 0;
    initialValuesTarget.inputARR_q = 0;
  }
  

  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  const [sessionTarget, setSessionTarget] = useState({});
  const [formLocked, setFormLocked] = useState(false);
  //
  //setSessionTarget({...initialValuesTarget});
  //
  const getBudget = async () => {
    //"https://pragati-backend.com/",
    const response = await fetch(
      `https://pragati-backend.com/actual?propertyCode=${propertyCode}&actualYear=${new Date().getFullYear()}&actualMonth=${
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
      setSessionTarget({ ...data[0].payload });
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

  //
  const handleFormSubmit = async (values, onSubmitProps) => {
    //alert("Form Submitted");
    console.log(values);
    //
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
      "https://pragati-backend.com/actual/add",
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
  //daysLeft = 10;
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
                        <Container component="main" >
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
                              align="center"
                              color="#FF0000"
                            >
                              {propertyName}
                              <Divider />
                              {/* {propertyCode}
                              <Divider />
                              {propertyId}
                              <Divider /> */}
                            </Typography>

                            <Typography
                              fontSize={25}
                              fontWeight={700}
                              //color="#11142D"
                              align="center"
                              color="#FF0000"
                            >
                              Achievements for the month of <br />
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
                                  Room Revenue in Cr.
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                      label="Room Revenue in Cr."
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.inputRoomRevenue}
                                      //value={sessionTarget.inputRoomRevenue}
                                      disabled={formLocked}
                                      name="inputRoomRevenue"
                                      type="number"
                                      error={
                                        Boolean(touched.inputRoomRevenue) &&
                                        Boolean(errors.inputRoomRevenue)
                                      }
                                      helperText={
                                        touched.inputRoomRevenue &&
                                        errors.inputRoomRevenue
                                      }
                                      width="100%"
                                    />
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                  F & B Revenue in Cr.
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                      label="F & B Revenue in Cr."
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.inputFnBRevenue}
                                      //value={sessionTarget.inputFnBRevenue}
                                      disabled={formLocked}
                                      name="inputFnBRevenue"
                                      type="number"
                                      error={
                                        Boolean(touched.inputFnBRevenue) &&
                                        Boolean(errors.inputFnBRevenue)
                                      }
                                      helperText={
                                        touched.inputFnBRevenue &&
                                        errors.inputFnBRevenue
                                      }
                                      width="100%"
                                    />
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                  Banquet Revenue in Cr.
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                      label="Banquet Revenue in Cr."
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.inputBanquetRevenue}
                                      //value={sessionTarget.inputBanquetRevenue}
                                      disabled={formLocked}
                                      name="inputBanquetRevenue"
                                      type="number"
                                      error={
                                        Boolean(touched.inputBanquetRevenue) &&
                                        Boolean(errors.inputBanquetRevenue)
                                      }
                                      helperText={
                                        touched.inputBanquetRevenue &&
                                        errors.inputBanquetRevenue
                                      }
                                      width="100%"
                                    />
                                  </FormControl>
                                </Grid>
                                
                                {/* revenue auto calculate
                                <Grid item xs={12}>
                                  Total Revenue in Cr.
                                  <TextField
                                    id="closing-cash"
                                    placeholder=""
                                    type="number"
                                    fullWidth
                                    disabled
                                    value={
                                      values.inputRoomRevenue +
                                      values.inputFnBRevenue +
                                      values.inputBanquetRevenue
                                    }
                                    InputLabelProps={{
                                      shrink: false,
                                    }}
                                  />
                                </Grid> */}

                                <Grid item xs={12}>
                                  Total Revenue in Cr.
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                      label="Revenue in Cr."
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.inputRevenue}
                                      disabled={formLocked}
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
                                  <Divider />
                                </Grid>
                                

                                <Grid item xs={12} sm={12}>
                                  EBIDTA in Cr.
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                      //label="EBIDTA in cr."
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
                                        touched.inputPBT && errors.inputPBT
                                      }
                                    />
                                  </FormControl>
                                </Grid>

                                

                                <Typography fontSize={20} fontWeight={700}>
                                  &nbsp;
                                </Typography>

                                <Grid item xs={12}>
                                  <Typography fontSize={20} fontWeight={400}>
                                    Cash Flow:
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
                                    value={
                                      values.inputOpCash +
                                      values.inputCashGen +
                                      values.inputCashInflow -
                                      values.inputCashOutflow
                                    }
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
                                  Occupancy: (in %) - Month
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">
                                      {" "}
                                    </InputLabel>
                                    <OutlinedInput
                                      endAdornment={
                                        <InputAdornment position="end">
                                          %
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
                                  Occupancy: (in %) - YTD
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">
                                      {" "}
                                    </InputLabel>
                                    <OutlinedInput
                                      endAdornment={
                                        <InputAdornment position="end">
                                          %
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

                                <hr/>
                                <Grid item xs={12} sm={6}>
                                  Occupancy: (in %) - Quarter
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">
                                      {" "}
                                    </InputLabel>
                                    <OutlinedInput
                                      endAdornment={
                                        <InputAdornment position="end">
                                          %
                                        </InputAdornment>
                                      }
                                      placeholder="Occupancy - Quarter"
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
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  ARR: (in INR) - Month
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
                                      placeholder="ARR - Month"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.inputARR}
                                      name="inputARR"
                                      type="number"
                                      fullWidth
                                      error={
                                        Boolean(touched.inputARR) &&
                                        Boolean(errors.inputARR)
                                      }
                                      helperText={
                                        touched.inputARR && errors.inputARR
                                      }
                                    />
                                  </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                  ARR: (in INR) - YTD
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
                                      placeholder="ARR - YTD"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.inputARRYTD}
                                      name="inputARRYTD"
                                      type="number"
                                      fullWidth
                                      error={
                                        Boolean(touched.inputARRYTD) &&
                                        Boolean(errors.inputARRYTD)
                                      }
                                      helperText={
                                        touched.inputARRYTD && errors.inputARRYTD
                                      }
                                    />
                                  </FormControl>
                                </Grid>

                                <hr />
                                <Grid item xs={12} sm={6}>
                                  ARR: (in INR) - Quarter
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
                                      placeholder="ARR - Quarter"
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.inputARR_q}
                                      name="inputARR_q"
                                      type="number"
                                      fullWidth
                                      error={
                                        Boolean(touched.inputARR_q) &&
                                        Boolean(errors.inputARR_q)
                                      }
                                      helperText={
                                        touched.inputARR_q && errors.inputARR_q
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
                                        // <Checkbox
                                        //   value="inputChecked"
                                        //   color="primary"
                                        //   name="termsAndConditions"

                                        // />
                                        <Field
                                          type="checkbox"
                                          name="termsAndConditions"
                                        />
                                      }
                                      label="  The provided data is correct as per my knowledge."
                                    />
                                    {errors.termsAndConditions && (
                                      <p>
                                        <b backgroundColor="#FF0000">
                                          {errors.termsAndConditions}
                                        </b>
                                      </p>
                                    )}
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
                              <br />
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
    );
  }

  return returnValue;
};

export default HotelActualFormWidget;
