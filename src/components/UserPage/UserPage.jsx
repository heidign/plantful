import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Input } from "@mui/material";
// * file imports
import PlantList from '../PlantList/PlantList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      
      <PlantList />
      <LogOutButton className="btn" />
    </div>
  );
};

// this allows us to use <App /> in index.js
export default UserPage;
