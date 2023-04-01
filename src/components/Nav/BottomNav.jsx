import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Paper } from "@mui/material";
import { Home } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import YardIcon from "@mui/icons-material/Yard";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function BottomNav() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 650 }}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={4}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          color="23422a"
        >
    
          <BottomNavigationAction
            component={Link}
            to="/profile"
            aria-label="my plants"
            label="MyPlants"
            icon={<YardIcon style={{ color: "23422a" }} />}
            />
        
          <BottomNavigationAction
            component={Link}
            to="/favorites"
            color="success"
            aria-label="favorites"
            label="Favorites"
            icon={<FavoriteBorderIcon style={{ color: "23422a" }}/>}
          />

          {/* <StyledFab
            color="success"
            color= "#23422a"
            aria-label="add plant"
            component={Link}
            to="/Add-plant"
          >
            <AddIcon />
          </StyledFab >
          <Box sx={{ flexGrow: 1 }} /> */}

          <BottomNavigationAction
            component={Link}
            to="/browse"
            color="success"
            aria-label="offers"
            label="Offers"
            icon={<SwapHorizIcon style={{ color: "23422a" }}/>}
          />

          <BottomNavigationAction
            component={Link}
            to="/"
            color="success"
            aria-label="account"
            label="Account"
            icon={<AccountCircleIcon style={{ color: "23422a" }}/>}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default BottomNav;