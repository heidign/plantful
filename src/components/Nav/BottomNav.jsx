import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper } from '@mui/material';
import { Home } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import YardIcon from '@mui/icons-material/Yard';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    


    
  return (
      <Box sx={{ width: 500 }}>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={4}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={Link} to='/' label="Profile" icon={<Home />} />
        <BottomNavigationAction component={Link} to='/' label="Account" icon={<AccountCircleIcon />} />
        <BottomNavigationAction component={Link} to='/browse' label="Offers" icon={<SwapHorizIcon/> } />
          </BottomNavigation>
        </Paper>
    </Box>
  );
}