import { useEffect, useState } from "react";

import { Typography, Box, Stack, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
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
let daysLeft = 31 //- new Date().getDate();
//let today = monthDays - new Date().getDate()
let ratingQ
let ratingYear = new Date().getFullYear();
//
if(currentMonth <3){
  ratingQ =3;
}else if(currentMonth>2 && currentMonth<6 ) {
  ratingQ =4;
}else if(currentMonth>5 && currentMonth<9 ) {
  ratingQ =1;
  ratingYear++
}else if(currentMonth>8 && currentMonth<12 ) {
  ratingQ =2;
  ratingYear++
}

//
////////////////////////////////

const targetSchema = yup.object().shape({
  rating_google: yup.number().required("Required")
  .min(0,"Enter rating between 0 to 5").max(5,"Enter rating between 0 to 5"),
  rating_ta: yup.number().required("Required").min(0,"Enter rating between 0 to 5").max(5,"Enter rating between 0 to 5"),
  rating_mmt: yup.number().required("Required").min(0,"Enter rating between 0 to 5").max(5,"Enter rating between 0 to 5"),
  rating_gi: yup.number().required("Required").min(0,"Enter rating between 0 to 5").max(5,"Enter rating between 0 to 5"),
  
  num_google: yup.number().required("Required"),
  num_ta: yup.number().required("Required"),
  num_mmt: yup.number().required("Required"),
  num_gi: yup.number().required("Required"),

  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to validate the data before submitting"),
});

const HotelRatingFormWidget = ({ propertyName, propertyCode, propertyId }) => {
  const isCurrentUser = true;
  const theme = createTheme();
  const navigate = useNavigate();
  //
  //
  //
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //
  const [formData, setFormData] = useState({});
  const [formLocked, setFormLocked] = useState(false);
  //
  let initialValuesTarget = {
    rating_google:"",
    rating_ta:"",
    rating_mmt:"",
    rating_gi:"",
    //
    num_google:"",
    num_ta:"",
    num_mmt:"",
    num_gi:"",
    //
    termsAndConditions: false,
  };
  //
  //setSessionTarget({...initialValuesTarget});
  //
  const getRating = async () => {
    //"http://localhost:4000/",
    const response = await fetch(
      `http://localhost:4000/rating?propertyCode=${propertyCode}&ratingYear=${ratingYear}&ratingQ=${ratingQ}&ratingMonth=${monthsArray[currentMonth]} `,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    //alert(JSON.stringify(data[0]))
    if (data[0]) {
      setFormData( {...data[0].payload} );
      if (data[0].locked) {
        setFormLocked(true);
        updateForm({...data[0].payload});
      }
    }
  };

  useEffect(() => {
    getRating();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //

  //
  const updateForm = (obj_data)=>{
    initialValuesTarget.rating_google = obj_data.rating_google;

    //: formData.rating_google ? formData.rating_google: "",
    initialValuesTarget.rating_ta= obj_data.rating_ta
    initialValuesTarget.rating_mmt= obj_data.rating_mmt
    initialValuesTarget.rating_gi= obj_data.rating_gi
    //
    initialValuesTarget.num_google=obj_data.num_google
    initialValuesTarget.num_ta=obj_data.num_ta
    initialValuesTarget.num_mmt=obj_data.num_mmt
    initialValuesTarget.num_gi=obj_data.num_gi
    //
    initialValuesTarget.termsAndConditions= true
    //
    //alert("Form Updated");
    //alert(JSON.stringify(obj_data))
  }
  const handleFormSubmit = async (values, onSubmitProps) => {
    //alert("Form Submitted");
    //console.log(values);
    //
    const data = {
      propertyName,
      propertyCode,
      propertyId,
      ratingYear,
      ratingQ,
      payload: { ...values },
    };
    // setFormData(data);
    // setActiveStepIndex(activeStepIndex + 1);
    console.log("***data*** Will show complete form data");
    console.log(data);
    ///
    const savedRatingResponse = await fetch(
      "http://localhost:4000/rating/add",
      //"http://localhost:4000/rating/add",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const savedRating = await savedRatingResponse.json();
    //console.log("savedRating");
    //console.log(savedRating);
    console.log("/////////////////////");
    if (savedRating) {
      if (savedRating.message) {
        alert(savedRating.message);
      } else {
        alert("Data saved to the server");
        setFormLocked(true);
      }
    } else {
      alert("Error Saving data");
    }
    console.log(savedRating);
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
          Data is already submitted for the Property
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
  }

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
                            Ratings for Q {ratingQ} - FYE {ratingYear} <br />
                            {/* {monthsArray[currentMonth]}{" "}
                            {new Date().getFullYear()}
                            <br/>
                            Current Month: {currentMonth}
                            <br/>
                            Financial Year: {ratingYear} for the {ratingQ} quater */}
                          </Typography>
                          <br />
                          <Box>
                          <h3>USER INSTRUCTIONS:</h3>
                          <ul>
                            <li>
                              Please enter rating data for the last quarter.
                            </li>
                            <li>
                              Data cannot be altered/changed after submission of the form.
                            </li>
                            <li>
                              Please connect to Pragati@peerless.co.in for assistence
                            </li>
                          </ul>
                          </Box>
                          <Box alignItems={"center"} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography fontSize={20} fontWeight={400}>
                                  Rating data:
                                </Typography>
                                <Divider />
                              </Grid>

                              <Grid item xs={12} sm={6}>
                              Ratings from Google:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    label="Ratings from Google"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.rating_google}
                                    //value={sessionTarget.rating_google}
                                    disabled={formLocked}
                                    name="rating_google"
                                    type="number"
                                    error={
                                      Boolean(touched.rating_google) &&
                                      Boolean(errors.rating_google)
                                    }
                                    helperText={
                                      touched.rating_google &&
                                      errors.rating_google
                                    }
                                    width="100%"
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                              No of Reviews at Google:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    label="No of Reviews at Google"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_google}
                                    //value={sessionTarget.num_google}
                                    disabled={formLocked}
                                    name="num_google"
                                    type="number"
                                    error={
                                      Boolean(touched.num_google) &&
                                      Boolean(errors.num_google)
                                    }
                                    helperText={
                                      touched.num_google &&
                                      errors.num_google
                                    }
                                    width="100%"
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12}>
                                <Divider></Divider>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                Ratings from Trip Advisor:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    //label="EBIDTA in cr."
                                    placeholder="Ratings from Trip Advisor"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.rating_ta}
                                    disabled={formLocked}
                                    name="rating_ta"
                                    type="number"
                                    error={
                                      Boolean(touched.rating_ta) &&
                                      Boolean(errors.rating_ta)
                                    }
                                    helperText={
                                      touched.rating_ta &&
                                      errors.rating_ta
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                No of Reviews at Trip Advisor:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    //label="EBIDTA in cr."
                                    placeholder="No of Reviews at Trip Advisor"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_ta}
                                    disabled={formLocked}
                                    name="num_ta"
                                    type="number"
                                    error={
                                      Boolean(touched.num_ta) &&
                                      Boolean(errors.num_ta)
                                    }
                                    helperText={
                                      touched.num_ta &&
                                      errors.num_ta
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <Divider></Divider>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                Ratings from Make My Trip:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    //label="EBIDTA in cr."
                                    placeholder="Ratings from Make My Trip"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.rating_mmt}
                                    disabled={formLocked}
                                    name="rating_mmt"
                                    type="number"
                                    error={
                                      Boolean(touched.rating_mmt) &&
                                      Boolean(errors.rating_mmt)
                                    }
                                    helperText={
                                      touched.rating_mmt &&
                                      errors.rating_mmt
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                              No of Reviews at Make My Trip:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    //label="EBIDTA in cr."
                                    placeholder="No of Reviews at Make My Trip"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_mmt}
                                    disabled={formLocked}
                                    name="num_mmt"
                                    type="number"
                                    error={
                                      Boolean(touched.num_mmt) &&
                                      Boolean(errors.num_mmt)
                                    }
                                    helperText={
                                      touched.num_mmt &&
                                      errors.num_mmt
                                    }
                                  />
                                </FormControl>
                              </Grid>

                              <Grid item xs={12}>
                                <Divider></Divider>
                              </Grid>

                              <Grid item xs={12} sm={6}>
                                Ratings from Go Ibibo:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    //label="EBIDTA in cr."
                                    placeholder="Ratings from Go Ibibo"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.rating_gi}
                                    disabled={formLocked}
                                    name="rating_gi"
                                    type="number"
                                    error={
                                      Boolean(touched.rating_gi) &&
                                      Boolean(errors.rating_gi)
                                    }
                                    helperText={
                                      touched.rating_gi &&
                                      errors.rating_gi
                                    }
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                              No of Reviews at Go Ibibo:
                                <FormControl fullWidth sx={{ m: 1 }}>
                                  <TextField
                                    //label="EBIDTA in cr."
                                    placeholder="No of Reviews at Go Ibibo"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.num_gi}
                                    disabled={formLocked}
                                    name="num_gi"
                                    type="number"
                                    error={
                                      Boolean(touched.num_gi) &&
                                      Boolean(errors.num_gi)
                                    }
                                    helperText={
                                      touched.num_gi &&
                                      errors.num_gi
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
                                        disabled={formLocked}
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
                              disabled={formLocked}
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
                            {/* <i>
                              *Page freezes in: <b>{daysLeft}</b> days
                            </i> */}
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

  return returnValue;
};

export default HotelRatingFormWidget;
