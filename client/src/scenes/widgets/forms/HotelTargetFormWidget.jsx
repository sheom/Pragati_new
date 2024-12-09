import { Typography, Box, Stack, Divider, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import submitForm from "./submitForm";
import WidgetWrapper from "components/WidgetWrapper";
//
import Step from "./quarterForms/Step";
import Stepper from "./quarterForms/Steper";

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

export const FormContext = createContext();

const HotelTargetFormWidget = ({ propertyName, propertyCode, propertyId }) => {
  const isCurrentUser = true;
  const theme = createTheme();
  const navigate = useNavigate();
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const subsidiary = useSelector((state) => state.user.subsidiary);

  const handleFormSubmit = async (values, onSubmitProps) => {
    alert("Form Submitted");
    console.log(values);
    submitForm(propertyId, values);
    //handleTargetSubmit()
    //if (isLogin) await login(values, onSubmitProps);
    //if (isRegister) await register(values, onSubmitProps);
  };

  const [value, setValue] = useState("0");
  //
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [formLocked, setFormLocked] = useState(false);
  const fye = new Date().getFullYear()+1
  //
  const getBudget = async () => {
    //"https://pragati-backend.com/",
    const response = await fetch(
      `https://pragati-backend.com/budget?propertyCode=${propertyCode}&budgetYear=${fye}`,
      {
        // const response = await fetch(`http://localhost:4000/budget?propertyCode=${propertyCode}&budgetYear=${new Date().getFullYear() + 1}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (data) {
      console.log("Returned Budget Data")
      console.log(data)
      console.log(data.locked)
      setFormData(data.payload);
      setFormLocked(data.locked)
      setActiveStepIndex(4);
      makeForm();
    }
  };

  useEffect(() => {
    getBudget();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  //
  //
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    setActiveStepIndex(newValue);
  };

  const makeForm = () => {
    return (
      <>
        <Box display="flex" minHeight="230px">
          <FormContext.Provider
            value={{
              activeStepIndex,
              setActiveStepIndex,
              formData,
              setFormData,
              formLocked,
              setFormLocked
            }}
          >
            <div>
              <Step
                propertyName={propertyName}
                propertyCode={propertyCode}
                propertyId={propertyId}
              />
            </div>
          </FormContext.Provider>
        </Box>
      </>
    );
  };

  return (
    <>
      <>
        <WidgetWrapper>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center" //minHeight="100vh"
          >
            <Typography
              fontSize={25}
              fontWeight={700}
              //color="#11142D"
              color="#FF0000"
              align="center"
            >
              {propertyName} <br />
              Enter budget data for Financial year {fye-1}-{fye}
            </Typography>
          </Box>

          <TabContext value={activeStepIndex}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                centered={true}
                onChange={handleTabChange}
                fontSize={"20px"}
              >
                <Tab label="Quarter One" value={0} />
                <Tab label="Quarter Two" value={1} />
                <Tab label="Quarter Three" value={2} />
                <Tab label="Quarter Four" value={3} />
                <Tab label="Summary" value={4} />
              </TabList>
            </Box>

            <TabPanel value={0}>{makeForm()}</TabPanel>
            <TabPanel value={1}>{makeForm()}</TabPanel>
            <TabPanel value={2}>{makeForm()}</TabPanel>
            <TabPanel value={3}>{makeForm()}</TabPanel>
            <TabPanel value={4}>{makeForm()}</TabPanel>
          </TabContext>
        </WidgetWrapper>
      </>
    </>
  );
};

export default HotelTargetFormWidget;
