import React from "react";
import { useState, useEffect } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import Home from "../components/home/home";
import Login from "../components/authentication/login";
import Register from "../components/authentication/register";
import Countries from "../components/countries/countries";
import Header from "../components/header_footer/header";
import Footer from "../components/header_footer/footer.js";
import Myprofile from "../components/profile/myProfile";
import Users from "../components/users/users";
import LoggedHeader from "../components/header_footer/logedInHeader";
import MyPosts from "../components/profile/myPosts";
import Profile from "../components/profile/profile";
import Country from "../components/countries/country";

function AllRoutes() {
  function isLogedIn() {
    return localStorage.getItem('token');
  }
  const [isAuthenticated, setIsAuthenticated] = useState(isLogedIn());
  console.log(isAuthenticated);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={[
              isAuthenticated ? <LoggedHeader /> : <Header />,
              <Home />,
              <Countries />,
              <Footer />,
            ]}
          ></Route>
          <Route
            exact
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/profile" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          ></Route>
          <Route
            exact
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/profile" />
              ) : (
                <Register setIsAuthenticated={setIsAuthenticated} />
              )
            }
          ></Route>
<Route
  exact
  path="/countries"
  element={
    isAuthenticated ? (
      <div>
        <LoggedHeader />
        <Countries />
        <Footer />
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
/>

          <Route
            exact
            path="/profile"
            element={
              isAuthenticated ? (
                [<LoggedHeader />, <Myprofile />, <MyPosts />]
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
  path="/profile/:userId"
  element={
    isAuthenticated ? (
      <div>
        <LoggedHeader />
        <Profile />
        <Footer />
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
></Route>
<Route
  path="/countries/:countryId"
  element={
    isAuthenticated ? (
      <div>
        <LoggedHeader />
        <Country />
        <Footer />
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
></Route>
          <Route
  path="/users"
  element={
    isAuthenticated ? (
      <div>
        <LoggedHeader />
        <Users />
        <Footer />
      </div>
    ) : (
      <Navigate to="/login" />
    )
  }
></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AllRoutes;
