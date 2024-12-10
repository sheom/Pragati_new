//import { ErrorMessage, Field } from "formik";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
//import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//
import { FormContext } from "../HospitalTargetFormWidget";
import * as yup from "yup";
//
import { Typography, Box, Divider, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import FormControl from "@mui/material/FormControl";
//
const targetSchema = yup.object().shape({
  inputRevenue0: yup.number().required("Required"),
  inputRevenue1: yup.number().required("Required"),
  inputRevenue2: yup.number().required("Required"),
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
  inputALOS0: yup.number().required("required"),
  inputALOS1: yup.number().required("required"),
  inputALOS2: yup.number().required("required"),
  qALOS: yup.number().required("required"),
  //
  inputARPOB0: yup.number().required("required"),
  inputARPOB1: yup.number().required("required"),
  inputARPOB2: yup.number().required("required"),
  qARPOB: yup.number().required("required"),
  //
  inputIntRevenue0: yup.number().required("required"),
  inputIntRevenue1: yup.number().required("required"),
  inputIntRevenue2: yup.number().required("required"),
  //qIntRevenue: yup.number().required("required"),
  //
  inputPatientServed0: yup.number().required("required"),
  inputPatientServed1: yup.number().required("required"),
  inputPatientServed2: yup.number().required("required"),
  //qPatientServed: yup.number().required("required"),
  //
  inputOccupancy0: yup.number().min(0, "Min value 0.").max(100, "Max value 100.").required("required"),
  inputOccupancy1: yup.number().min(0, "min value 0.").max(100, "max value 100.").required("required"),
  inputOccupancy2: yup.number().min(0, "min value 0.").max(100, "max value 100.").required("required"),
  qOccupancy: yup.number().min(0, "min value 0.").max(100, "max value 100.").required("required"),
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

function HospitalQuarterForm({ propertyName, propertyId, propertyCode }) {
  const {
    activeStepIndex,
    setActiveStepIndex,
    formData,
    setFormData,
    formLocked,
    setFormLocked,
  } = useContext(FormContext);
  const navigate = useNavigate();
  //const { palette } = useTheme();
  //const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  //const subsidiary = useSelector((state) => state.user.subsidiary);
  //const { propertyId } = useParams();
  //

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
    inputALOS0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputALOS0
      : "",
    inputALOS1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputALOS1
      : "",
    inputALOS2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputALOS2
      : "",
    qALOS: formData[activeStepIndex] ? formData[activeStepIndex].qALOS : "",
    //
    inputARPOB0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputARPOB0
      : "",
    inputARPOB1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputARPOB1
      : "",
    inputARPOB2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputARPOB2
      : "",
    qARPOB: formData[activeStepIndex] ? formData[activeStepIndex].qARPOB : "",
    //
    inputIntRevenue0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputIntRevenue0
      : "",
    inputIntRevenue1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputIntRevenue1
      : "",
    inputIntRevenue2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputIntRevenue2
      : "",
    //qIntRevenue: formData[activeStepIndex]? formData[activeStepIndex].qIntRevenue: "",
    //
    inputPatientServed0: formData[activeStepIndex]
      ? formData[activeStepIndex].inputPatientServed0
      : "",
    inputPatientServed1: formData[activeStepIndex]
      ? formData[activeStepIndex].inputPatientServed1
      : "",
    inputPatientServed2: formData[activeStepIndex]
      ? formData[activeStepIndex].inputPatientServed2
      : "",
    //qPatientServed: formData[activeStepIndex]? formData[activeStepIndex].qPatientServed: "",
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
    qOccupancy: formData[activeStepIndex]
      ? formData[activeStepIndex].qOccupancy
      : "",
    //
    termsAndConditions: false,
  };

  const renderError = (message) => (
    <p className="italic text-red-600">{message}</p>
  );

  // const handleFormSubmit = async (values, onSubmitProps) => {
  //   //alert("Form Saved");
  //   const data = {
  //     ...formData,
  //     [activeStepIndex] : {...values}
  //    };

  //   setFormData(data);
  //   setActiveStepIndex(activeStepIndex + 1);
  //   console.log("***Values***Will ShowCurrentQuater values")
  //   console.log(values);
  //   console.log("***data*** Will show complete form data")
  //   console.log(data);

  //   //submitForm(propertyId, values);
  //   //handleTargetSubmit()
  //   //if (isLogin) await login(values, onSubmitProps);
  //   //if (isRegister) await register(values, onSubmitProps);
  // };
  const handleFormSubmit = async (values, onSubmitProps) => {
    //alert("Form Saved");
    const data = {
      ...formData,
      [activeStepIndex]: { ...values },
    };
    //
    // Logic for saving Quaterly figures
    //
    if (formLocked === true) {
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
        //console.log("savedBudget");
        //console.log(savedBudget);
        //
        if (savedBudget.message) {
          alert(savedBudget.message);
        } else if (savedBudget.error) {
          alert("There is an error saving your Data. Please retry after some time")
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

          <h3>Enter data for Quarter {activeStepIndex + 1}</h3>
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
                    Revenue in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputRevenue0}
                    //value={`values.inputRevenue${[activestepindex*3]}`}
                    disabled={formLocked}
                    name={`inputRevenue0`}
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
                    disabled={formLocked}
                    name={`inputRevenue1`}
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
                    disabled={formLocked}
                    name={`inputRevenue2`}
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
                    //label="Total"
                    label={"Quarter " + (activeStepIndex + 1) + " total"}
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
                    type="number"
                    error={
                      Boolean(touched.inputEBIDTA0) &&
                      Boolean(errors.inputEBIDTA0)
                    }
                    helperText={touched.inputEBIDTA0 && errors.inputEBIDTA0}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputEBIDTA1}
                    name="inputEBIDTA1"
                    type="number"
                    error={
                      Boolean(touched.inputEBIDTA1) &&
                      Boolean(errors.inputEBIDTA1)
                    }
                    helperText={touched.inputEBIDTA1 && errors.inputEBIDTA1}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputEBIDTA2}
                    name="inputEBIDTA2"
                    type="number"
                    error={
                      Boolean(touched.inputEBIDTA2) &&
                      Boolean(errors.inputEBIDTA2)
                    }
                    helperText={touched.inputEBIDTA2 && errors.inputEBIDTA2}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //label="TotalEBIDTA"
                    label={"Quarter " + (activeStepIndex + 1) + " total"}
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
                    name="inputPBT0"
                    type="number"
                    error={
                      Boolean(touched.inputPBT0) && Boolean(errors.inputPBT0)
                    }
                    helperText={touched.inputPBT0 && errors.inputPBT0}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputPBT1}
                    name="inputPBT1"
                    type="number"
                    error={
                      Boolean(touched.inputPBT1) && Boolean(errors.inputPBT1)
                    }
                    helperText={touched.inputPBT1 && errors.inputPBT1}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputPBT2}
                    name="inputPBT2"
                    type="number"
                    error={
                      Boolean(touched.inputPBT2) && Boolean(errors.inputPBT2)
                    }
                    helperText={touched.inputPBT2 && errors.inputPBT2}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    //label="Total"
                    label={"Quarter " + (activeStepIndex + 1) + " total"}
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
                    name="inputOpCash0"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOpCash0) &&
                      Boolean(errors.inputOpCash0)
                    }
                    helperText={touched.inputOpCash0 && errors.inputOpCash0}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOpCash1}
                    name="inputOpCash1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOpCash1) &&
                      Boolean(errors.inputOpCash1)
                    }
                    helperText={touched.inputOpCash1 && errors.inputOpCash1}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOpCash2}
                    name="inputOpCash2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOpCash2) &&
                      Boolean(errors.inputOpCash2)
                    }
                    helperText={touched.inputOpCash2 && errors.inputOpCash2}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label="TotalOpCash"
                    value={Number(
                      values.inputOpCash0 
                      //+
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
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashGen0) &&
                      Boolean(errors.inputCashGen0)
                    }
                    helperText={touched.inputCashGen0 && errors.inputCashGen0}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashGen1}
                    name="inputCashGen1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashGen1) &&
                      Boolean(errors.inputCashGen1)
                    }
                    helperText={touched.inputCashGen1 && errors.inputCashGen1}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashGen2}
                    name="inputCashGen2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashGen2) &&
                      Boolean(errors.inputCashGen2)
                    }
                    helperText={touched.inputCashGen2 && errors.inputCashGen2}
                    disabled={formLocked}
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
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashInflow0) &&
                      Boolean(errors.inputCashInflow0)
                    }
                    helperText={
                      touched.inputCashInflow0 && errors.inputCashInflow0
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashInflow1}
                    name="inputCashInflow1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashInflow1) &&
                      Boolean(errors.inputCashInflow1)
                    }
                    helperText={
                      touched.inputCashInflow1 && errors.inputCashInflow1
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashInflow2}
                    name="inputCashInflow2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashInflow2) &&
                      Boolean(errors.inputCashInflow2)
                    }
                    helperText={
                      touched.inputCashInflow2 && errors.inputCashInflow2
                    }
                    disabled={formLocked}
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
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashOutflow0) &&
                      Boolean(errors.inputCashOutflow0)
                    }
                    helperText={
                      touched.inputCashOutflow0 && errors.inputCashOutflow0
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashOutflow1}
                    name="inputCashOutflow1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashOutflow1) &&
                      Boolean(errors.inputCashOutflow1)
                    }
                    helperText={
                      touched.inputCashOutflow1 && errors.inputCashOutflow1
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputCashOutflow2}
                    name="inputCashOutflow2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputCashOutflow2) &&
                      Boolean(errors.inputCashOutflow2)
                    }
                    helperText={
                      touched.inputCashOutflow2 && errors.inputCashOutflow2
                    }
                    disabled={formLocked}
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
                    value={Number(
                      values.inputOpCash0 +
                        values.inputCashGen0 +
                        values.inputCashInflow0 -
                        values.inputCashOutflow0
                    ).toFixed(2)}
                    InputLabelProps={{
                      shrink: false,
                    }}
                    disabled
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
                    value={Number(
                      values.inputOpCash1 +
                        values.inputCashGen1 +
                        values.inputCashInflow1 -
                        values.inputCashOutflow1
                    ).toFixed(2)}
                    InputLabelProps={{
                      shrink: false,
                    }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="totalClosingCash2"
                    //label="Number"
                    placeholder=""
                    type="number"
                    fullWidth
                    value={Number(
                      values.inputOpCash2 +
                        values.inputCashGen2 +
                        values.inputCashInflow2 -
                        values.inputCashOutflow2
                    ).toFixed(2)}
                    InputLabelProps={{
                      shrink: false,
                    }}
                    disabled
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    id="totalClosingCashTotal"
                    //label="Number"
                    //placeholder=""
                    type="number"
                    fullWidth
                    value={Number(
                      values.inputOpCash0 //+
                        //values.inputOpCash1 +
                        //values.inputOpCash2 
                        +
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
                    disabled
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
                    ALOS: (in days)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputALOS0}
                    name="inputALOS0"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputALOS0) && Boolean(errors.inputALOS0)
                    }
                    helperText={touched.inputALOS0 && errors.inputALOS0}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputALOS1}
                    name="inputALOS1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputALOS1) && Boolean(errors.inputALOS1)
                    }
                    helperText={touched.inputALOS1 && errors.inputALOS1}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputALOS2}
                    name="inputALOS2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputALOS2) && Boolean(errors.inputALOS2)
                    }
                    helperText={touched.inputALOS2 && errors.inputALOS2}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={"Quarter " + (activeStepIndex + 1)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.qALOS}
                    name="qALOS"
                    type="number"
                    fullWidth
                    error={Boolean(touched.qALOS) && Boolean(errors.qALOS)}
                    helperText={touched.qALOS && errors.qALOS}
                    disabled={formLocked}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    ARPOB: (in INR)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputARPOB0}
                    name="inputARPOB0"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputARPOB0) &&
                      Boolean(errors.inputARPOB0)
                    }
                    helperText={touched.inputARPOB0 && errors.inputARPOB0}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputARPOB1}
                    name="inputARPOB1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputARPOB1) &&
                      Boolean(errors.inputARPOB1)
                    }
                    helperText={touched.inputARPOB1 && errors.inputARPOB1}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputARPOB2}
                    name="inputARPOB2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputARPOB2) &&
                      Boolean(errors.inputARPOB2)
                    }
                    helperText={touched.inputARPOB2 && errors.inputARPOB2}
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={"Quarter " + (activeStepIndex + 1)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.qARPOB}
                    name="qARPOB"
                    type="number"
                    fullWidth
                    error={Boolean(touched.qARPOB) && Boolean(errors.qARPOB)}
                    helperText={touched.qARPOB && errors.qARPOB}
                    disabled={formLocked}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    International Revenue in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputIntRevenue0}
                    name="inputIntRevenue0"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputIntRevenue0) &&
                      Boolean(errors.inputIntRevenue0)
                    }
                    helperText={
                      touched.inputIntRevenue0 && errors.inputIntRevenue0
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputIntRevenue1}
                    name="inputIntRevenue1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputIntRevenue1) &&
                      Boolean(errors.inputIntRevenue1)
                    }
                    helperText={
                      touched.inputIntRevenue1 && errors.inputIntRevenue1
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputIntRevenue2}
                    name="inputIntRevenue2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputIntRevenue2) &&
                      Boolean(errors.inputIntRevenue2)
                    }
                    helperText={
                      touched.inputIntRevenue2 && errors.inputIntRevenue2
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  {/* <TextField
                          label={"Quarter "+ (activeStepIndex+1)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.qIntRevenue}
                          name="qIntRevenue"
                          type="number"
                          fullWidth
                          error={
                            Boolean(touched.qIntRevenue) &&
                            Boolean(errors.qIntRevenue)
                          }
                          helperText={touched.qIntRevenue && errors.qIntRevenue}
                          disabled = {formLocked}
                        /> */}

                  <TextField
                    label={"Quarter " + (activeStepIndex + 1) + " total"}
                    value={Number(
                      values.inputIntRevenue0 +
                        values.inputIntRevenue1 +
                        values.inputIntRevenue2
                    ).toFixed(2)}
                    name="totIntRev"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    Total No. of Patients Served:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputPatientServed0}
                    name="inputPatientServed0"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputPatientServed0) &&
                      Boolean(errors.inputPatientServed0)
                    }
                    helperText={
                      touched.inputPatientServed0 && errors.inputPatientServed0
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputPatientServed1}
                    name="inputPatientServed1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputPatientServed1) &&
                      Boolean(errors.inputPatientServed1)
                    }
                    helperText={
                      touched.inputPatientServed1 && errors.inputPatientServed1
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputPatientServed2}
                    name="inputPatientServed2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputPatientServed2) &&
                      Boolean(errors.inputPatientServed2)
                    }
                    helperText={
                      touched.inputPatientServed2 && errors.inputPatientServed2
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={"Quarter " + (activeStepIndex + 1) + " total"}
                    value={
                      values.inputPatientServed0 +
                      values.inputPatientServed1 +
                      values.inputPatientServed2
                    }
                    name="totPatientServed"
                    type="number"
                    disabled
                  />
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
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOccupancy0) &&
                      Boolean(errors.inputOccupancy0)
                    }
                    helperText={
                      touched.inputOccupancy0 && errors.inputOccupancy0
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 1]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOccupancy1}
                    name="inputOccupancy1"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOccupancy1) &&
                      Boolean(errors.inputOccupancy1)
                    }
                    helperText={
                      touched.inputOccupancy1 && errors.inputOccupancy1
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3 + 2]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputOccupancy2}
                    name="inputOccupancy2"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.inputOccupancy2) &&
                      Boolean(errors.inputOccupancy2)
                    }
                    helperText={
                      touched.inputOccupancy2 && errors.inputOccupancy2
                    }
                    disabled={formLocked}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={"Quarter " + (activeStepIndex + 1)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.qOccupancy}
                    name="qOccupancy"
                    type="number"
                    fullWidth
                    error={
                      Boolean(touched.qOccupancy) && Boolean(errors.qOccupancy)
                    }
                    helperText={touched.qOccupancy && errors.qOccupancy}
                    disabled={formLocked}
                  />
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

export default HospitalQuarterForm;
