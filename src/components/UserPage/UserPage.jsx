import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Input } from "@mui/material";
// * file imports
import LogOutButton from "../LogOutButton/LogOutButton";
import PlantList from "../PlantList/PlantList";
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  return (
    <div className="container" style={{padding: "2vh"}}>
      <h2 className="nav-title"
          style={{ fontFamily: "Oleo-Script", color: "#375379", fontSize: 32 }}>Hello, @{user.username}!</h2>
      <div style={{
                fontFamily: "Dangwa",
                fontSize: 40,
                // color: "#23422a",
                color: "#dc445c",
                borderRadius: "1em 0 1em 0",
                // backgroundColor: "#d1dde5", 
                backgroundColor: "#f8f1e4",
                padding: "7vh",
                margin: "1vh"}}>

      <h4 style={{ fontFamily: "Roboto", color: "#375379", fontSize: 22, marginLeft: 1 }}> add a new plant to your collection </h4>
      </div>
      <PlantList />
      <br></br>
      {/* <LogOutButton className="btn" /> */}
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
