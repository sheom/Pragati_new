import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
//import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//
import { FormContext } from "../HotelAllTargetFormWidget";
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
  inputRevenue0: yup.number().required("Revenue value Required"),
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

});

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

function HotelAllQuarterForm({ propertyName, propertyId, propertyCode }) {
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
        "https://sheom.in/budget/add",
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
    // console.log("***Values***Will ShowCurrentQuater values");
    // console.log(values);
    // console.log("***data*** Will show complete form data");
    // console.log(data);
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
                    Revenue including investment in Cr.:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    label={monthsArray[activeStepIndex * 3]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.inputRevenue0}
                    //value={`values.inputRevenue${[activestepindex*3]}`}
                    name={`inputRevenue0`}
                    disabled={formLocked}
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
                    disabled={formLocked}
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
                    disabled={formLocked}
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
                      Number(values.inputRevenue0) +
                        Number(values.inputRevenue1) +
                        Number(values.inputRevenue2)
                    ).toFixed(2)}
                    name="totRev"
                    type="number"
                    disabled
                  />
                </Grid>

                <Grid item xs={12}>
                  <Divider/>  
                </Grid>

                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    EBIDTA including investment in Cr.:
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
                  <Divider/>  
                </Grid>


                <Grid item xs={12}>
                  <Typography fontSize={15} fontWeight={400}>
                    PBT including investment in Cr.:
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
                      Number(values.inputPBT0) + Number(values.inputPBT1) + Number(values.inputPBT2)
                    ).toFixed(2)}
                    name="totPbt_rs"
                    type="number"
                    disabled
                  />
                </Grid>

                <Typography fontSize={20} fontWeight={700}>
                  &nbsp;
                </Typography>


                <Typography fontSize={20} fontWeight={700}>
                  &nbsp;
                </Typography>

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

export default HotelAllQuarterForm;
