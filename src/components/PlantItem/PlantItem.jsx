import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Icon from "@mdi/react";
import { mdiWateringCanOutline } from "@mdi/js";

// * plant item from db
function PlantItem({ item, daysOverdue }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const detailsFromAPI = useSelector(
    (store) => store.plantDetails.data.details
  );

  // sending user to details page on card click 
  const handleClick = () => {
    goToDetailsPage();
  };
  const goToDetailsPage = () => {
    history.push(`/details/${item.id}`);
  };

  // sending user to favorites page on IconButton click
  // const goToFavorites = () => {
  //   history.push(`/favorites/${item.id}`);
  // };

  // * icon indication based on user's dates
  const getDaysSinceLastWater = (lastWaterTimestamp) => {
    const lastWaterMoment = moment(lastWaterTimestamp);
    const today = moment();
    return today.diff(lastWaterMoment, "days");
  };

  const getNextWaterDate = (daysSinceLastWater) => {
    const waterDaysInterval = 7;
    const daysTilNextWater = waterDaysInterval - daysSinceLastWater;
    return moment().add(daysTilNextWater, "day").format("ll");
  };

  const getIsWaterDayInThePast = (nextWaterDate) => {
    return moment(nextWaterDate).isBefore();
  };

  const daysSinceLastWater = getDaysSinceLastWater(item.dateWatered);
  const nextWaterDate = getNextWaterDate(daysSinceLastWater);
  const isWaterDayInThePast = getIsWaterDayInThePast(nextWaterDate);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Card
          onClick={handleClick}
          sx={{
            ml: "10px",
            mr: "10px",
            mt: "5px",
            mb: "20px",
            width: "300px",
          }}
        >
          <CardHeader title={item.nickname} />
          <CardMedia
            sx={{
              height: 240,
              width: "100%",
            }}
            component="img"
            src={item.image_url}
          />
          <CardContent>
            <Typography size="h4" style={{ fontWeight: "bold" }}>
              <Icon path={mdiWateringCanOutline} size={1} rotate={30} /> Water
            </Typography>
            <Typography
              variant="subtitle2"
              style={{ fontWeight: "medium", color: "#dc445c" }}
            >
              {isWaterDayInThePast
                ? daysOverdue == 0
                  ? `Water today`
                  : daysOverdue == 1
                  ? `Overdue by ${daysOverdue} day `
                  : `Overdue by ${daysOverdue} days `
                : daysOverdue == 0
                ? ` Water tomorrow`
                : `Water on ${nextWaterDate}`}
            </Typography>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites"
            // onClick={goToFavorites}
            >
              <FavoriteBorderIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}
export default PlantItem;
