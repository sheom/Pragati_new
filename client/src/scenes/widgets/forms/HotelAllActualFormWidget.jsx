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
//let daysLeft = monthDays[currentMonth] - new Date().getDate() - 1;
let daysLeft = 20 - new Date().getDate();
//let today = monthDays - new Date().getDate()

////////////////////////////////

const targetSchema = yup.object().shape({
  inputRevenue: yup.number().required("Required"),
  inputPBT: yup.number().required("required"),
  inputEBIDTA: yup.number().required("required"),
  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to validate the data before submitting"),
});

//propertyName={filturedProperty[0].title} propertyCode={filturedProperty[0].propertyCode} propertyId={propertyId} />
const HotelAllActualFormWidget = ({ propertyName, propertyCode, propertyId }) => {
  const isCurrentUser = true;
  const theme = createTheme();
  const navigate = useNavigate();
  //
  let initialValuesTarget = {
    inputRevenue: "",
    //
    inputPBT: "",
    inputEBIDTA: "",
    termsAndConditions: false,
  };
  //
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  const [sessionTarget, setSessionTarget] = useState({});
  const [formLocked, setFormLocked] = useState(false);
  //
  //setSessionTarget({...initialValuesTarget});
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
                                  Revenue including investment in Cr.
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                      label="Revenue including investment in Cr."
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      value={values.inputRevenue}
                                      //value={sessionTarget.inputRevenue}
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
                                  EBIDTA including investment in Cr..
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                      //label="EBIDTA in cr."
                                      placeholder="EBIDTA including investment in Cr."
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
                                  PBT including investment in Cr..
                                  <FormControl fullWidth sx={{ m: 1 }}>
                                    <TextField
                                      //label="PBT in Cr."
                                      placeholder="PBT including investment in Cr."
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

export default HotelAllActualFormWidget;
