import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Icon from "@mdi/react";
import { mdiWateringCanOutline } from "@mdi/js";
import PlantDetails from "../PlantDetails/PlantDetails";
import moment from "moment";

// * plant item from db
function PlantItem({ item, daysOverdue }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const detailsFromAPI = useSelector(
    (store) => store.plantDetails.data.details
  );

  const handleClick = () => {
    goToDetailsPage();
  };

  const goToDetailsPage = () => {
    history.push(`/details/${item.id}`);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    history.push(`/details/${item.id}`);
  };

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
          onClick={goToDetailsPage}
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
            <IconButton aria-label="add to favorites">
              <FavoriteBorderIcon />
            </IconButton>
            {/* <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore> */}
          </CardActions>
          <Collapse
            onClick={handleExpandClick}
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <PlantDetails item={item} />
          </Collapse>
        </Card>
      </Box>
    </>
  );
}
export default PlantItem;
