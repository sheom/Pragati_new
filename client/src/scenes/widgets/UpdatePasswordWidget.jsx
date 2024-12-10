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

const targetSchema = yup.object().shape({
  oldPassword: yup.string().required("Enter your current password"),
  newPassword: yup.string().required("Enter your new password"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords don't match!")
    .required("Required"),
});

const UpdatePasswordWidget = ({ propertyName, propertyCode, propertyId }) => {
  const isCurrentUser = true;
  const theme = createTheme();
  const navigate = useNavigate();
  //
  let initialValuesTarget = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };
  //
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);
  //setSessionTarget({...initialValuesTarget});
  //
  useEffect(() => {
    //getBudget();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //

  //
  const handleFormSubmit = async (values, onSubmitProps) => {
    //alert("Form Submitted");
    //console.log(values);
    //
    const data = {
       ...values
    };
    console.log("***data*** Will show complete form data");
    console.log(data);
    ///

    const updatePasswordResponse = await fetch(
      "http://localhost:4000/auth/change",
      //"http://localhost:4000/auth/change",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const updatePassword = await updatePasswordResponse.json();
    if (updatePassword) {
      if ( (updatePassword.msg ) && (updatePassword.msg !== "Password updated.") ) {
        alert(updatePassword.msg);
      } else {
        alert("Password changed successfully");
        navigate("/")
      }
    } else {
      alert("Error Saving data");
    }
    console.log(updatePassword);
    //
  };
  let returnValue = "";
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
                  mt={1}
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
                        marginTop: 2,
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
                        Change your password
                      </Typography>
                      <br />

                      <Box alignItems={"center"} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>

                          <Grid item xs={12}>
                            Current password:
                            <FormControl fullWidth sx={{ m: 1 }}>
                              <TextField
                                //label="Current Password"
                                placeholder="Current Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.oldPassword}
                                name="oldPassword"
                                type="password"
                                error={
                                  Boolean(touched.oldPassword) &&
                                  Boolean(errors.oldPassword)
                                }
                                helperText={
                                  touched.oldPassword && errors.oldPassword
                                }
                                width="100%"
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12} sm={12}>
                            New Password:
                            <FormControl fullWidth sx={{ m: 1 }}>
                              <TextField
                                placeholder="New Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.newPassword}
                                name="newPassword"
                                type="password"
                                error={
                                  Boolean(touched.newPassword) &&
                                  Boolean(errors.newPassword)
                                }
                                helperText={
                                  touched.newPassword && errors.newPassword
                                }
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            Confirm New Password
                            <FormControl fullWidth sx={{ m: 1 }}>
                              <TextField
                                placeholder="Confirm New Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmNewPassword}
                                name="confirmNewPassword"
                                type="password"
                                error={
                                  Boolean(touched.confirmNewPassword) &&
                                  Boolean(errors.confirmNewPassword)
                                }
                                helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                              />
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <Divider></Divider>
                          </Grid>

                          <Grid item xs={12}>
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
                              onClick={() => navigate(`/home`)}
                            >
                              cancel
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      <Typography
                        fontSize={14}
                        //fontWeight={700}
                        //color="#11142D"
                        color="#FF0000"
                      >
                        <br />
                      </Typography>
                    </Box>
                  </Container>
                  {/* </ThemeProvider> */}
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

export default UpdatePasswordWidget;
