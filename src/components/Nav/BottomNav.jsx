import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={Link} to='/' label="Profile" icon={<HomeIcon/>} />
        <BottomNavigationAction component={Link} to='/favorites' label="Favorites" icon={<AccountBoxIcon />} />
        <BottomNavigationAction component={Link} to='/browse' label="Browse" icon={<SwapHorizIcon/> } />
      </BottomNavigation>
    </Box>
  );
}