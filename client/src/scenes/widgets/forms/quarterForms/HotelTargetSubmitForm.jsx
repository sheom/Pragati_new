import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//
import { FormContext } from "../HotelTargetFormWidget";
import * as yup from "yup";
//
import { Typography, Box, Stack, Divider, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
//
const targetSchema = yup.object().shape({
  avgOccupancyAnnual: yup.number().min(0).max(100).required("required", "Please enter a value between 0 to 100"),
  avgARRAnnual: yup.number().required("required"),
  //
  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to validate the data before submitting"),
});
//
const monthsArray = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];
//

function HotelTargetSubmitForm({ propertyName, propertyCode, propertyId }) {
  const { activeStepIndex, setActiveStepIndex, formData, setFormData, formLocked, setFormLocked  } =
    useContext(FormContext);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //const { propertyId } = useParams();
  //

  const initialValuesTarget = {
    avgOccupancyAnnual: formData[activeStepIndex]
      ? formData[activeStepIndex].avgOccupancyAnnual
      : "",
      //
    avgARRAnnual: formData[activeStepIndex] ? formData[activeStepIndex].avgARRAnnual : "",
    //
    termsAndConditions: false,
  };

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );
  const handleFormSubmit = async (values, onSubmitProps) => {
    const page_data = {
      ...formData,
      [activeStepIndex]: { ...values },
    };

    const data = {
      propertyName,
      propertyCode,
      propertyId,
      locked: true,
      payload: { ...page_data },
    };
    // setFormData(data);
    // setActiveStepIndex(activeStepIndex + 1);
    console.log("***data*** Will show complete form data");
    console.log(data);
    ///
    const savedBudgetResponse = await fetch(
      "http://localhost:4000/budget/add",
      //"http://localhost:4000/budget/add",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const savedBudget = await savedBudgetResponse.json();
    if (savedBudget) {
      if(savedBudget.message){
        alert(savedBudget.message);
      }else{
        alert("Data Saved Successfully")
      }
    } else {
      alert("Error Saving data");
    }
  };

  const handleChange = (event, newValue) => {
    console.log("Handle Change Called");
  };
  const qStatus = [];
  let isFormDone = false;
  let showControls = false;
  const checkFormData = () => {
    let returnStr = [];
    for (let i = 0; i < 4; i++) {
      if (formData[i]) {
        returnStr[i] = "Done";
        qStatus[i] = "Done";
      } else {
        returnStr[i] = "Pending";
        qStatus[i] = "Pending";
      }
    }
    console.log(Object.keys(formData).length);
    //return returnStr;
  };

  const showFormData = () => {
    checkFormData();
    if (Object.keys(formData).length < 4) {
      return (
        <>
          <Typography
            fontSize={20}
            fontWeight={400}
            sx={{ m: 1 }}
            align="center"
          >
            Complete the pending forms first
          </Typography>
        </>
      );
    } else {
      isFormDone = true;
      showControls = true;
      if(formLocked){
        showControls = false;
        return (
          <>
            <Typography
              fontSize={20}
              fontWeight={400}
              sx={{ m: 1 }}
              align="center"
            >
              Data is already entered for this. Visit individual Quarter to view data.
            </Typography>
          </>
        );
      }
      return (
        <>
          <Typography
            fontSize={20}
            fontWeight={400}
            sx={{ m: 1 }}
            align="center"
          >
            Click on submit button to submit your data.
          </Typography>
        </>
      );
    }
    // return (
    //   <>
    //     <h1> FormData will appear Here </h1>
    //     <div>{JSON.stringify(formData)}</div>

    //     <div>
    //       {Object.keys(formData).map((keyName, i) => (
    //         <li className="travelcompany-input" key={i}>
    //           <span className="input-label">
    //             `key: {i} Name: {JSON.stringify(formData[keyName])}`
    //           </span>
    //         </li>
    //       ))}
    //     </div>
    //   </>
    // );
  };

  const showFormData_updated = () => {
    checkFormData();
    if (Object.keys(formData).length < 4) {
      return (
        <>
          <Typography
            fontSize={20}
            fontWeight={400}
            sx={{ m: 1 }}
            align="center"
          >
            Complete the pending forms first
          </Typography>
        </>
      );
    } else {
      isFormDone = true;
      showControls = true;
      if(formLocked){
        showControls = false;
      }
      return (
        <>
          <Typography
            fontSize={20}
            fontWeight={400}
            sx={{ m: 1 }}
            align="center"
          >
            {formLocked? 'Budget data is already submitted for this property.':'Click on the "Submit" button to submit your data.'}
            
          </Typography>
        </>
      );
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      onChange={handleChange}
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
        <Form onSubmit={handleSubmit}>
          {/* {propertyName}
          {propertyCode}
          {propertyId} */}
          <h2>Summary View</h2>
          <Box>
          <h3>USER INSTRUCTIONS:</h3>
          <ul>
            <li>
            User can fill budget data for each quarter and save that page. Form will be open for the financial year from 1st April of the given year until the end of 1st Quarter.
            </li>
            <li>
            User can login multiple times and change the data for budget form until 30th June or until he/she does not press the submit button.
            </li>
            <li>
            The data for budget form will become non accessible only if user clicks the submit button or until 2400 hrs of June 30 of the given year.
            </li>
            <li>
            In case, user faces any trouble they may send their written query at pragati@peerless.co.in
            </li>
          </ul>
          <Divider></Divider>
          </Box>
          <Box
            width={"100%"}
            alignItems={"center"}
            sx={{ mt: 3, width: "100%" }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  {showFormData()}
                  <Divider />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <Typography fontSize={20} fontWeight={400}>
                    Q1: {qStatus[0]}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography fontSize={20} fontWeight={400}>
                    Q2: {qStatus[1]}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography fontSize={20} fontWeight={400}>
                    Q3: {qStatus[2]}
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography fontSize={20} fontWeight={400}>
                    Q4: {qStatus[3]}
                  </Typography>
                  <Divider />
                </Grid>
                
                <Grid item xs={12}>
                <Divider></Divider>
                <br/>
                  <Typography fontSize={15} fontWeight={400}>
                    Occupancy Annual (Budgeted in percent):
                  </Typography>
                  <TextField
                    //label={"Occupancy Annual Budget: (in percent)"}
                    placeholder="Occupancy Annual (Budgeted in percent)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.avgOccupancyAnnual}
                    name="avgOccupancyAnnual"
                    //disabled={formLocked}
                    disabled = {!showControls}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.avgOccupancyAnnual) &&
                      Boolean(errors.avgOccupancyAnnual)
                    }
                    helperText={
                      touched.avgOccupancyAnnual && errors.avgOccupancyAnnual
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                
                  <Typography fontSize={15} fontWeight={400}>
                    Average Room Rate Annual (Budgeted in INR):
                  </Typography>
                  <TextField
                    //label={"Average Room Rate Annual Budget (in INR):"}
                    placeholder="Average Room Rate Annual (Budgeted in INR):"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.avgARRAnnual}
                    name="avgARRAnnual"
                    //disabled={formLocked}
                    disabled = {!showControls}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.avgARRAnnual) &&
                      Boolean(errors.avgARRAnnual)
                    }
                    helperText={
                      touched.avgARRAnnual && errors.avgARRAnnual
                    }
                  />
                  <br/>
                  <Divider/>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ m: 1 }}>
                    <FormControlLabel
                      fullWidth
                      //disabled={isFormDone}
                      disabled = {!showControls}
                      //disabled={!showControls && formLocked}
                      control={
                        <Field type="checkbox" name="termsAndConditions" />
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="outlined"
                    //disabled={isFormDone}
                    //disabled={formLocked}
                    disabled = {!showControls}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                  <Button
                    type="cancel"
                    fullWidth
                    variant="link"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => navigate(`/property/show/${propertyId}`)}
                  >
                    cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Typography
            fontSize={14}
            //fontWeight={700}
            //color="#11142D"
            color="#FF0000"
          >
            <i>
              *Page freezes in: <b>XXX</b> days
            </i>
            <br />
          </Typography> */}
        </Form>
      )}
    </Formik>
  );
}

export default HotelTargetSubmitForm;
