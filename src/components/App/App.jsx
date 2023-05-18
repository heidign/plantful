import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Search from "../Search/Search";
import SearchList from "../SearchList/SearchList";
import SearchDetails from "../SearchDetails/SearchDetails";
import PlantForm from "../PlantViews/PlantForm/PlantForm";
import Profile from "../UserProfile/UserProfile";
import PlantDetails from "../PlantDetails/PlantDetails";
import EditDetailsForm from "../PlantDetails/EditDetailsForm";
import OfferGallery from "../OfferViews/OfferGallery/OfferGallery";
// layout components
import Nav from "../Nav/Nav";
import BottomNav from "../Nav/BottomNav";
import Footer from "../Footer/Footer";
// CSS
import "./App.css";
// Material UI theme
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const themeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#23422a",
      light: "#fcf5f0",
      // dark: "#ffda9a",
    },
    secondary: {
      main: "#ffffff",
      dark: "#fffaf2",
      contrastText: "#000000",
      light: "#fffbf2",
    },
    background: {
      default: "#fcf5f0",
      paper: "#ffffff",
    },
    text: {
      primary: "#23422a",
      secondary: "#23422a",
      disabled: "#23422a",
      hint: "#327c36",
    },
  },
  shape: {
    borderRadius: 0,
  },
};

const theme = createTheme(themeOptions);
function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          {/* <div style={{ height: 'calc(100% - 300px)' }}> */}
          <Nav />

          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )}
            </Route>

            <ProtectedRoute
              // logged in shows Add Plant
              exact
              path="/add-plant"
            >
              {/* <SearchAppBar /> */}
              <Search />
            </ProtectedRoute>

            <ProtectedRoute exact path="/search-list">
              <SearchList />
            </ProtectedRoute>

            <ProtectedRoute exact path="/search-details">
              <SearchDetails />
            </ProtectedRoute>

            <ProtectedRoute exact path="/plant-form">
              <PlantForm />
            </ProtectedRoute>

            <ProtectedRoute exact path="/profile">
              <Profile />
            </ProtectedRoute>

            <ProtectedRoute exact path="/details/:id">
              <PlantDetails />
            </ProtectedRoute>

            <ProtectedRoute exact path="/edit/:id">
              <EditDetailsForm />
            </ProtectedRoute>

            <ProtectedRoute>
              <BottomNav />
            </ProtectedRoute>

            <Route exact path="/browse">
              <OfferGallery />
            </Route>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1 align="center">404</h1>
            </Route>
          </Switch>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
