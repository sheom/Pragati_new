import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
//import { useState } from "react";
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
  //inputRevenue: yup.array().required("Enter revenue"),
  // .max(10, "Only 10 tags are allowed")
  // .required("Provide at least one tag"),
  //yup.number().required("required"),
  //
  // inputRevenue0: yup.number().required("Required"),
  // inputRevenue1: yup.number().required("Required"),
  // inputRevenue2: yup.number().required("Required"),
  //
  inputRoomRevenue0: yup.number().required("Required"),
  inputRoomRevenue1: yup.number().required("Required"),
  inputRoomRevenue2: yup.number().required("Required"),
  //
  inputFnBRevenue0: yup.number().required("Required"),
  inputFnBRevenue1: yup.number().required("Required"),
  inputFnBRevenue2: yup.number().required("Required"),
  //
  inputBanquetRevenue0: yup.number().required("Required"),
  inputBanquetRevenue1: yup.number().required("Required"),
  inputBanquetRevenue2: yup.number().required("Required"),
  //
  inputPBT0: yup.number().required("required"),
  inputPBT1: yup.number().required("required"),
  inputPBT2: yup.number().required("required"),
  //
  inputEBIDTA0: yup.number().required("required"),
  inputEBIDTA1: yup.number().required("required"),
  inputEBIDTA2: yup.number().required("required"),
  //
  inputOpCash0: yup.number().required("required"),
  inputOpCash1: yup.number().required("required"),
  inputOpCash2: yup.number().required("required"),
  //
  inputCashGen0: yup.number().required("required"),
  inputCashGen1: yup.number().required("required"),
  inputCashGen2: yup.number().required("required"),
  //
  inputCashInflow0: yup.number().required("required"),
  inputCashInflow1: yup.number().required("required"),
  inputCashInflow2: yup.number().required("required"),
  //
  inputCashOutflow0: yup.number().required("required"),
  inputCashOutflow1: yup.number().required("required"),
  inputCashOutflow2: yup.number().required("required"),
  //
  //inputOccupancy0: yup.number().min(0, "min value 0.").max(100, "max value 100.").required("required"),
  inputOccupancy0: yup.number().required("required"),
  inputOccupancy1: yup.number().required("required"),
  inputOccupancy2: yup.number().required("required"),
  avgOccupancy: yup.number().required("required"),
  //
  inputARR0: yup.number().required("required"),
  inputARR1: yup.number().required("required"),
  inputARR2: yup.number().required("required"),
  avgARR: yup.number().required("required"),
  //
  // termsAndConditions: yup
  //   .bool()
  //   .oneOf([true], "You need to validate the data before submitting"),
});
// var month_full = ["January","February","March","April","May","June","July",
//             "August","September","October","November","December"];
// var month_sub = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

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

function HotelQuarterForm({ propertyName, propertyId, propertyCode }) {
  const {
    activeStepIndex,
    setActiveStepIndex,
    formData,
    setFormData,
    formLocked,
    setFormLocked,
  } = useContext(FormContext);
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //const { propertyId } = useParams();
  //

  const initialValuesTarget = {
    inputRevenue0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputRevenue0
      : "",
    inputRevenue1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputRevenue1
      : "",
    inputRevenue2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputRevenue2
      : "",
    //
    inputRoomRevenue0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputRoomRevenue0
      : "",
    inputRoomRevenue1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputRoomRevenue1
      : "",
    inputRoomRevenue2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputRoomRevenue2
      : "",
      //
      inputFnBRevenue0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputFnBRevenue0
      : "",
    inputFnBRevenue1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputFnBRevenue1
      : "",
    inputFnBRevenue2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputFnBRevenue2
      : "",
    //
    inputBanquetRevenue0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputBanquetRevenue0
      : "",
    inputBanquetRevenue1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputBanquetRevenue1
      : "",
    inputBanquetRevenue2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputBanquetRevenue2
      : "",
    //
    inputPBT0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputPBT0
      : "",
    inputPBT1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputPBT1
      : "",
    inputPBT2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputPBT2
      : "",
    //
    inputEBIDTA0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputEBIDTA0
      : "",
    inputEBIDTA1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputEBIDTA1
      : "",
    inputEBIDTA2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputEBIDTA2
      : "",
    //
    inputOccupancy0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputOccupancy0
      : "",
    inputOccupancy1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputOccupancy1
      : "",
    inputOccupancy2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputOccupancy2
      : "",
    avgOccupancy: formData[activeStepIndex]
      ? formData[activeStepIndex].avgOccupancy
      : "",
    //
    inputARR0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputARR0
      : "",
    inputARR1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputARR1
      : "",
    inputARR2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputARR2
      : "",
    avgARR: formData[activeStepIndex] ? formData[activeStepIndex].avgARR : "",
    //
    inputOpCash0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputOpCash0
      : "",
    inputOpCash1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputOpCash1
      : "",
    inputOpCash2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputOpCash2
      : "",
    //
    inputCashGen0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashGen0
      : "",
    inputCashGen1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashGen1
      : "",
    inputCashGen2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashGen2
      : "",
    //
    inputCashInflow0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashInflow0
      : "",
    inputCashInflow1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashInflow1
      : "",
    inputCashInflow2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashInflow2
      : "",
    //
    inputCashOutflow0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashOutflow0
      : "",
    inputCashOutflow1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashOutflow1
      : "",
    inputCashOutflow2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputCashOutflow2
      : "",
    //
    termsAndConditions: false,
  };

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );

  const handleFormSubmit = async (values, onSubmitProps) => {
    //alert("Form Saved");
    const data = {
      ...formData,
      [activeStepIndex]: { ...values },
    };
    //
    // Logic for saving Quaterly figures
    //
    if (formLocked=== true) {
      //alert("Moving without Saving as form is locked:"+formLocked)
      setActiveStepIndex(activeStepIndex + 1);
    } else {
      const data_saving = {
        propertyName,
        propertyCode,
        propertyId,
        locked: false,
        payload: { ...data },
      };
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
          body: JSON.stringify(data_saving),
        }
      );
      console.log("data_saving");
      console.log(data_saving);

      const savedBudget = await savedBudgetResponse.json();
      if (savedBudget) {
        if (savedBudget.message) {
          alert(savedBudget.message);
        } else {
          alert("Data Saved Successfully");
          setFormData(data);
          setActiveStepIndex(activeStepIndex + 1);
        }
      } else {
        alert("Error Saving data");
      }
    }
    //
    //
    //
    console.log("***Values***Will ShowCurrentQuater values");
    console.log(values);
    console.log("***data*** Will show complete form data");
    console.log(data);
  };
  const handleChange = (event, newValue) => {
    //setValue(newValue);
    //setTotRev(getTotalRevenue())
    console.log("Handle Change Called");
  };

  return (
    <Formik
      // initialValues={{
      //   name: "",
      //   email: "",
      // }}
      // validationSchema={ValidationSchema}
      // onSubmit={(values) => {
      //   const data = { ...formData, ...values };
      //   setFormData(data);
      //   setActiveStepIndex(activeStepIndex + 1);
      // }}
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
          {/* { propertyName }
                {propertyCode}
                {propertyId } */}
                {formLocked?`The form is locked`:``}

          <h3>Enter data for Quarter {activeStepIndex + 1}: {formLocked} </h3>
          <Box
            width={"100%"}
            alignItems={"center"}
            sx={{ mt: 3, width: "100%" }}
          >
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography fontSize={20} fontWeight={400}>
                    Financial Metrics:
                  </Typography>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Room Revenue in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputRoomRevenue0}
                    //value={`values.inputRevenue${[activestepindex*3]}`}
                    name={`inputRoomRevenue0`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputRoomRevenue0) &&
                      Boolean(errors.inputRoomRevenue0)
                    }
                    helperText={touched.inputRoomRevenue0 && errors.inputRoomRevenue0}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputRoomRevenue1}
                    //value = {`values.inputRevenue${[activestepindex*3 + 1]}`}
                    name={`inputRoomRevenue1`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputRoomRevenue1) &&
                      Boolean(errors.inputRoomRevenue1)
                    }
                    helperText={touched.inputRoomRevenue1 && errors.inputRoomRevenue1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputRoomRevenue2}
                    name={`inputRoomRevenue2`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputRoomRevenue2) &&
                      Boolean(errors.inputRoomRevenue2)
                    }
                    helperText={touched.inputRoomRevenue2 && errors.inputRoomRevenue2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Total"
                    value={Number(
                      values.inputRoomRevenue0 +
                        values.inputRoomRevenue1 +
                        values.inputRoomRevenue2
                    ).toFixed(2)}
                    //value={ ((values.inputRevenue0+values.inputRevenue1+values.inputRevenue2) ) }
                    name="totRoomRev"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    F & B Revenue in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputFnBRevenue0}
                    //value={`values.inputRevenue${[activestepindex*3]}`}
                    name={`inputFnBRevenue0`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputFnBRevenue0) &&
                      Boolean(errors.inputFnBRevenue0)
                    }
                    helperText={touched.inputFnBRevenue0 && errors.inputFnBRevenue0}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputFnBRevenue1}
                    //value = {`values.inputRevenue${[activestepindex*3 + 1]}`}
                    name={`inputFnBRevenue1`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputFnBRevenue1) &&
                      Boolean(errors.inputFnBRevenue1)
                    }
                    helperText={touched.inputFnBRevenue1 && errors.inputFnBRevenue1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputFnBRevenue2}
                    name={`inputFnBRevenue2`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputFnBRevenue2) &&
                      Boolean(errors.inputFnBRevenue2)
                    }
                    helperText={touched.inputFnBRevenue2 && errors.inputFnBRevenue2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Total"
                    value={Number(
                      values.inputFnBRevenue0 +
                        values.inputFnBRevenue1 +
                        values.inputFnBRevenue2
                    ).toFixed(2)}
                    //value={ ((values.inputRevenue0+values.inputRevenue1+values.inputRevenue2) ) }
                    name="totFnBRev"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Banquet Revenue in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputBanquetRevenue0}
                    //value={`values.inputRevenue${[activestepindex*3]}`}
                    name={`inputBanquetRevenue0`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputBanquetRevenue0) &&
                      Boolean(errors.inputBanquetRevenue0)
                    }
                    helperText={touched.inputBanquetRevenue0 && errors.inputBanquetRevenue0}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputBanquetRevenue1}
                    //value = {`values.inputRevenue${[activestepindex*3 + 1]}`}
                    name={`inputBanquetRevenue1`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputBanquetRevenue1) &&
                      Boolean(errors.inputBanquetRevenue1)
                    }
                    helperText={touched.inputBanquetRevenue1 && errors.inputBanquetRevenue1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputBanquetRevenue2}
                    name={`inputBanquetRevenue2`}
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputBanquetRevenue2) &&
                      Boolean(errors.inputBanquetRevenue2)
                    }
                    helperText={touched.inputBanquetRevenue2 && errors.inputBanquetRevenue2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Total"
                    value={Number(
                      values.inputBanquetRevenue0 +
                        values.inputBanquetRevenue1 +
                        values.inputBanquetRevenue2
                    ).toFixed(2)}
                    //value={ ((values.inputRevenue0+values.inputRevenue1+values.inputRevenue2) ) }
                    name="totBanquetRev"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                <Divider />
                  <Typography fontSize={15} fontWeight={400}>
                    Total Revenue in Cr.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField
                    label= { "Total - "+ monthsArray[activeStepIndex * 3] }
                    value={Number(
                      values.inputRoomRevenue0 +
                        values.inputFnBRevenue0 +
                        values.inputBanquetRevenue0
                    ).toFixed(2)}
                    //value={ ((values.inputRevenue0+values.inputRevenue1+values.inputRevenue2) ) }
                    name="totRev0"
                    type="number"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField
                    label={"Total - "+monthsArray[activeStepIndex * 3 + 1]}
                    value={Number(
                      values.inputRoomRevenue1 +
                        values.inputFnBRevenue1 +
                        values.inputBanquetRevenue1
                    ).toFixed(2)}
                    //value={ ((values.inputRevenue0+values.inputRevenue1+values.inputRevenue2) ) }
                    name="totRev1"
                    type="number"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField
                    label= { "Total - "+ monthsArray[activeStepIndex * 3+2] }
                    value={Number(
                      values.inputRoomRevenue2 +
                        values.inputFnBRevenue2 +
                        values.inputBanquetRevenue2
                    ).toFixed(2)}
                    //value={ ((values.inputRevenue0+values.inputRevenue1+values.inputRevenue2) ) }
                    name="totRev2"
                    type="number"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField
                    label="Total - Quaterly"
                    value={Number(
                      values.inputRoomRevenue0 +values.inputRoomRevenue1 +values.inputRoomRevenue2 +
                      values.inputFnBRevenue0 +values.inputFnBRevenue1 +values.inputFnBRevenue2 +
                      values.inputBanquetRevenue0 +values.inputBanquetRevenue1 + values.inputBanquetRevenue2
                    ).toFixed(2)}
                    //value={ ((values.inputRevenue0+values.inputRevenue1+values.inputRevenue2) ) }
                    name="totRevAll"
                    type="number"
                    disabled
                  />
                </Grid>
                 
                {/* <Grid item xs={12}>
                <Divider />
                  <Typography fontSize={15} fontWeight={400}>
                    Total Revenue in Cr.: previously entered data
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputRevenue0}
                    name={`inputRevenue0`}
                    //disabled={formLocked}
                    disabled={true}
                    type="number"
                    error={
                      Boolean(touched.inputRevenue0) &&
                      Boolean(errors.inputRevenue0)
                    }
                    helperText={touched.inputRevenue0 && errors.inputRevenue0}
                  />

                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputRevenue1}
                    //value = {`values.inputRevenue${[activestepindex*3 + 1]}`}
                    name={`inputRevenue1`}
                    //disabled={formLocked}
                    disabled={true}
                    type="number"
                    error={
                      Boolean(touched.inputRevenue1) &&
                      Boolean(errors.inputRevenue1)
                    }
                    helperText={touched.inputRevenue1 && errors.inputRevenue1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputRevenue2}
                    name={`inputRevenue2`}
                    //disabled={formLocked}
                    disabled={true}
                    type="number"
                    error={
                      Boolean(touched.inputRevenue2) &&
                      Boolean(errors.inputRevenue2)
                    }
                    helperText={touched.inputRevenue2 && errors.inputRevenue2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Total"
                    value={Number(
                      values.inputRevenue0 +
                        values.inputRevenue1 +
                        values.inputRevenue2
                    ).toFixed(2)}
                    //value={ ((values.inputRevenue0+values.inputRevenue1+values.inputRevenue2) ) }
                    name="totRev"
                    type="number"
                    disabled
                  />
                </Grid> */}
               


                <Grid item xs={12}>
                <Divider />
                  <Typography fontSize={15} fontWeight={400}>  
                  </Typography>
                </Grid>




                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    EBIDTA in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputEBIDTA0}
                    name="inputEBIDTA0"
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputEBIDTA0) &&
                      Boolean(errors.inputEBIDTA0)
                    }
                    helperText={touched.inputEBIDTA0 && errors.inputEBIDTA0}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputEBIDTA1}
                    name="inputEBIDTA1"
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputEBIDTA1) &&
                      Boolean(errors.inputEBIDTA1)
                    }
                    helperText={touched.inputEBIDTA1 && errors.inputEBIDTA1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputEBIDTA2}
                    name="inputEBIDTA2"
                    disabled={formLocked}
                    type="number"
                    error={
                      Boolean(touched.inputEBIDTA2) &&
                      Boolean(errors.inputEBIDTA2)
                    }
                    helperText={touched.inputEBIDTA2 && errors.inputEBIDTA2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="TotalEBIDTA"
                    value={Number(
                      values.inputEBIDTA0 +
                        values.inputEBIDTA1 +
                        values.inputEBIDTA2
                    ).toFixed(2)}
                    name="totalEBIDTA"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    PBT in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputPBT0}
                    disabled={formLocked}
                    name="inputPBT0"
                    type="number"
                    error={
                      Boolean(touched.inputPBT0) && Boolean(errors.inputPBT0)
                    }
                    helperText={touched.inputPBT0 && errors.inputPBT0}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputPBT1}
                    disabled={formLocked}
                    name="inputPBT1"
                    type="number"
                    error={
                      Boolean(touched.inputPBT1) && Boolean(errors.inputPBT1)
                    }
                    helperText={touched.inputPBT1 && errors.inputPBT1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputPBT2}
                    disabled={formLocked}
                    name="inputPBT2"
                    type="number"
                    error={
                      Boolean(touched.inputPBT2) && Boolean(errors.inputPBT2)
                    }
                    helperText={touched.inputPBT2 && errors.inputPBT2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="Total"
                    value={Number(
                      values.inputPBT0 + values.inputPBT1 + values.inputPBT2
                    ).toFixed(2)}
                    name="totPbt"
                    type="number"
                    disabled
                  />
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

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Op Cash/ Bank Balance in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOpCash0}
                    disabled={formLocked}
                    name="inputOpCash0"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOpCash0) &&
                      Boolean(errors.inputOpCash0)
                    }
                    helperText={touched.inputOpCash0 && errors.inputOpCash0}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOpCash1}
                    name="inputOpCash1"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOpCash1) &&
                      Boolean(errors.inputOpCash1)
                    }
                    helperText={touched.inputOpCash1 && errors.inputOpCash1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOpCash2}
                    name="inputOpCash2"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOpCash2) &&
                      Boolean(errors.inputOpCash2)
                    }
                    helperText={touched.inputOpCash2 && errors.inputOpCash2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="TotalOpCash"
                    value={Number(
                      values.inputOpCash0 //+
                        //values.inputOpCash1 +
                        //values.inputOpCash2
                    ).toFixed(2)}
                    name="totalOpCash"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Internal Cash generation in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashGen0}
                    name="inputCashGen0"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashGen0) &&
                      Boolean(errors.inputCashGen0)
                    }
                    helperText={touched.inputCashGen0 && errors.inputCashGen0}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashGen1}
                    name="inputCashGen1"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashGen1) &&
                      Boolean(errors.inputCashGen1)
                    }
                    helperText={touched.inputCashGen1 && errors.inputCashGen1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashGen2}
                    name="inputCashGen2"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashGen2) &&
                      Boolean(errors.inputCashGen2)
                    }
                    helperText={touched.inputCashGen2 && errors.inputCashGen2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="TotalInputCashGens"
                    value={Number(
                      values.inputCashGen0 +
                        values.inputCashGen1 +
                        values.inputCashGen2
                    ).toFixed(2)}
                    name="totalInputCashGen2"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Major Cash Inflow in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashInflow0}
                    name="inputCashInflow0"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashInflow0) &&
                      Boolean(errors.inputCashInflow0)
                    }
                    helperText={
                      touched.inputCashInflow0 && errors.inputCashInflow0
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashInflow1}
                    name="inputCashInflow1"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashInflow1) &&
                      Boolean(errors.inputCashInflow1)
                    }
                    helperText={
                      touched.inputCashInflow1 && errors.inputCashInflow1
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashInflow2}
                    name="inputCashInflow2"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashInflow2) &&
                      Boolean(errors.inputCashInflow2)
                    }
                    helperText={
                      touched.inputCashInflow2 && errors.inputCashInflow2
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="TotalCashInflow"
                    value={Number(
                      values.inputCashInflow0 +
                        values.inputCashInflow1 +
                        values.inputCashInflow2
                    ).toFixed(2)}
                    name="totalCashInflow"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Major Cash Outflow in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashOutflow0}
                    name="inputCashOutflow0"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashOutflow0) &&
                      Boolean(errors.inputCashOutflow0)
                    }
                    helperText={
                      touched.inputCashOutflow0 && errors.inputCashOutflow0
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashOutflow1}
                    name="inputCashOutflow1"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashOutflow1) &&
                      Boolean(errors.inputCashOutflow1)
                    }
                    helperText={
                      touched.inputCashOutflow1 && errors.inputCashOutflow1
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashOutflow2}
                    name="inputCashOutflow2"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashOutflow2) &&
                      Boolean(errors.inputCashOutflow2)
                    }
                    helperText={
                      touched.inputCashOutflow2 && errors.inputCashOutflow2
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="TotalCashOutflow"
                    value={Number(
                      values.inputCashOutflow0 +
                        values.inputCashOutflow1 +
                        values.inputCashOutflow2
                    ).toFixed(2)}
                    name="totalCashOutflow"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Closing Cash & Bank balance:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="totalClosingCash0"
                    name="totalClosingCash0"
                    //label="Number"
                    placeholder=""
                    type="number"
                    disabled
                    value={Number(
                      values.inputOpCash0 +
                        values.inputCashGen0 +
                        values.inputCashInflow0 -
                        values.inputCashOutflow0
                    ).toFixed(2)}
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="totalClosingCash1"
                    name="totalClosingCash1"
                    //label="Number"
                    placeholder=""
                    type="number"
                    fullWidth
                    disabled
                    value={Number(
                      values.inputOpCash1 +
                        values.inputCashGen1 +
                        values.inputCashInflow1 -
                        values.inputCashOutflow1
                    ).toFixed(2)}
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="totalClosingCash2"
                    //label="Number"
                    placeholder=""
                    type="number"
                    fullWidth
                    disabled
                    value={Number(
                      values.inputOpCash2 +
                        values.inputCashGen2 +
                        values.inputCashInflow2 -
                        values.inputCashOutflow2
                    ).toFixed(2)}
                    InputLabelProps={{
                      shrink: false,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    id="totalClosingCashTotal"
                    //label="Number"
                    placeholder=""
                    type="number"
                    fullWidth
                    disabled
                    value={Number(
                      values.inputOpCash0 +
                        //values.inputOpCash1 +
                        //values.inputOpCash2 +
                        values.inputCashGen0 +
                        values.inputCashGen1 +
                        values.inputCashGen2 +
                        values.inputCashInflow0 +
                        values.inputCashInflow1 +
                        values.inputCashInflow2 -
                        values.inputCashOutflow0 -
                        values.inputCashOutflow1 -
                        values.inputCashOutflow2
                    ).toFixed(2)}
                    InputLabelProps={{
                      shrink: false,
                    }}
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

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Occupancy (in percent):
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOccupancy0}
                    name="inputOccupancy0"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOccupancy0) &&
                      Boolean(errors.inputOccupancy0)
                    }
                    helperText={
                      touched.inputOccupancy0 && errors.inputOccupancy0
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOccupancy1}
                    name="inputOccupancy1"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOccupancy1) &&
                      Boolean(errors.inputOccupancy1)
                    }
                    helperText={
                      touched.inputOccupancy1 && errors.inputOccupancy1
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOccupancy2}
                    name="inputOccupancy2"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOccupancy2) &&
                      Boolean(errors.inputOccupancy2)
                    }
                    helperText={
                      touched.inputOccupancy2 && errors.inputOccupancy2
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={"Quarter " + (activeStepIndex + 1)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.avgOccupancy}
                    name="avgOccupancy"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.avgOccupancy) &&
                      Boolean(errors.avgOccupancy)
                    }
                    helperText={touched.avgOccupancy && errors.avgOccupancy}
                  />
                  {/* <TextField
                          id="avgOccupancy"
                          //label="Number"
                          placeholder=""
                          type="number"
                          fullWidth
                          disabled
                          value={
                            (Number(values.inputOccupancy0+
                            values.inputOccupancy1+
                            values.inputOccupancy2 ) /3).toFixed(2)
                          }
                          InputLabelProps={{
                            shrink: false,
                          }}
                        /> */}
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Average Room Rate: (in INR):
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputARR0}
                    name="inputARR0"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputARR0) && Boolean(errors.inputARR0)
                    }
                    helperText={touched.inputARR0 && errors.inputARR0}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputARR1}
                    name="inputARR1"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputARR1) && Boolean(errors.inputARR1)
                    }
                    helperText={touched.inputARR1 && errors.inputARR1}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputARR2}
                    name="inputARR2"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputARR2) && Boolean(errors.inputARR2)
                    }
                    helperText={touched.inputARR2 && errors.inputARR2}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={"Quarter " + (activeStepIndex + 1)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.avgARR}
                    name="avgARR"
                    disabled={formLocked}
                    type="number"
                    fullWidth
                    error={Boolean(touched.avgARR) && Boolean(errors.avgARR)}
                    helperText={touched.avgARR && errors.avgARR}
                  />

                  {/* <TextField
                          id="avgARR"
                          //label="Number"
                          placeholder=""
                          type="number"
                          fullWidth
                          disabled
                          value={
                            (Number(values.inputARR0+
                            values.inputARR1+
                            values.inputARR2 ) /3).toFixed(2)
                          }
                          InputLabelProps={{
                            shrink: false,
                          }}
                        /> */}
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                {formLocked ? "Next" : "Save & Next"}
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
            </Box>
          </Box>
          <Typography
            fontSize={14}
            //fontWeight={700}
            //color="#11142D"
            color="#FF0000"
          >
            <i>
              *Page freezes in: <b>XXX</b> days
            </i>
            <br />
          </Typography>
        </Form>
      )}
    </Formik>
  );
}

export default HotelQuarterForm;
