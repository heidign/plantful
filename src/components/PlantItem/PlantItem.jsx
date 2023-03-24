import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
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
import { FavoriteOutlined } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlantDetails from "../PlantDetails/PlantDetails";
import moment from "moment";

// * plant item from db
function PlantItem({ item }) {
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
    // history.push(`/details/${item.id}`);
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
    return moment().add(daysTilNextWater, "day").format("LL");
  };

  const getIsWaterDayInThePast = (nextWaterDate) => {
    return moment(nextWaterDate).isBefore();
  };

  const daysSinceLastWater = getDaysSinceLastWater(item.dateWatered);
  const nextWaterDate = getNextWaterDate(daysSinceLastWater);
  const isWaterDayInThePast = getIsWaterDayInThePast(nextWaterDate);
  return (
    <>

        <div>
          <Box>
            <Card
              onClick={goToDetailsPage}
              sx={{
                ml: "10px",
                mr: "10px",
                mt: "5px",
                mb: "20px",
              }}
            >
              <CardHeader title={item.nickname} />
              <CardMedia
                sx={{
                  height: 240,
                  width: '100%',
                }}
                component="img"
                src={item.image_url}
              />
              <CardContent>
                <Typography size="h4" style={{ fontWeight: "bold" }}>
                  {/* {detailsFromAPI.scientific_name} */}
                  {/* <p>{moment(detailsFromDb.dateWatered).format("LL")}</p> */}
                 Water your plant:
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {isWaterDayInThePast ? `Today` : nextWaterDate} 
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteBorderIcon />
                </IconButton>

                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse
                onClick={handleExpandClick}
                in={expanded}
                timeout="auto"
                unmountOnExit
              >
                <PlantDetails item={item} />
                {/* <p><i>{detailsFromAPI}</i></p> */}
              </Collapse>
            </Card>
          </Box>
        </div>
    </>
  );
}
export default PlantItem;
