import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

// * plant item from db
function PlantItem({ item }) {
  const history = useHistory();

  const handleClick = () => {
    goToDetailsPage();
  };

  const goToDetailsPage = () => {
    // history.push(`/details/${plant.id}`);
  };

  return (
    <Box>
      <Card
        sx={{ maxWidth: 240, ml: "10px", mr: "10px", mt: "5px", mb: "5px" }}
      >
        <CardMedia
          sx={{
            height: 240,
            width: 240,
          }}
          component="img"
          onClick={handleClick}
          src={item.image_url}
          alt={item.nickname}
        />
        <CardContent>
          <Typography size="h4" style={{ fontWeight: "bold" }}>
            {item.nickname}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PlantItem;
