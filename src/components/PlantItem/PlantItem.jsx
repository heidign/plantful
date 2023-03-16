import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/system";

// * plant item from db
function PlantItem({ plant }) {
  const history = useHistory();

  const handleClick = () => {
    goToDetailsPage();
  };

  const goToDetailsPage = () => {
    // history.push(`/details/${plant.id}`);
  };

  return (
    <Box>
      <div>
        <h3>{plant.nickname}</h3>
        <Box
          component="img"
          style={{
            borderRadius: "15px",
            display: "block",
            width: "300px",
            height: "300px",
          }}
          onClick={handleClick}
          src={plant.plantImage}
          alt={plant.name}
        />
      </div>
    </Box>
  );
}

export default PlantItem;
