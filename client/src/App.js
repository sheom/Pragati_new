import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
/////////////////////
import LoginPage from "scenes/loginPage";
//
import HomePage from "scenes/homePage";
import HotelHomePage from "scenes/hotelHomePage";
import SubsHomePage from "scenes/subsHomePage";
//
import UserPage from "scenes/userPage";
//
import DashboardPage from "scenes/dashboardPage";
import PropertyPage from "scenes/propertyPage";
import BudgetPage from "scenes/budgetPage";
import RatingPage from "scenes/ratingPage";
import ActualPage from "scenes/actualPage";
/////////////////////////////
// import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            <Route
              path="/hotel_home"
              element={isAuth ? <HotelHomePage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            <Route
              path="/subs_home"
              element={isAuth ? <SubsHomePage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            <Route
              path="/update_pass"
              element={isAuth ? <UserPage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            <Route
              path="/property/show/:propertyId"
              element={isAuth ? <PropertyPage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            <Route
              path="/property/budget/add/:propertyId"
              element={isAuth ? <BudgetPage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            <Route
              path="/property/rating/add/:propertyId"
              element={isAuth ? <RatingPage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            <Route
              path="/property/actual/add/:propertyId"
              element={isAuth ? <ActualPage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            <Route
              path="/dashboard/:propertyId"
              element={isAuth ? <DashboardPage /> : <Navigate to="/" />}
              //element={ <HomePage /> }
            />
            {/* <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            /> */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
