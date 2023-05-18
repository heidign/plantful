import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import CommentThread from "../Comments/CommentThread/CommentThread";
import PropTypes from "prop-types";
import {
  Button,
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
  ListItem,
  Divider
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Icon from "@mdi/react";
import { mdiWateringCanOutline } from "@mdi/js";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function PlantDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const today = moment();
  // getting id key from path params
  let { id } = useParams();

  // const apiDetails = useSelector((store) => store.plantDetails.data.details);
  const apiDetails = useSelector((store) => store.plantDetails.apiDetailsReducer);
  // const plantDetails = useSelector((store) => store.plantDetails.data.plantDetails);
  const plantDetails = useSelector((store) => store.plantDetails.plantDetailsReducer);
  const isLoading = useSelector((store) => store.plantDetails.loading);
  const [expanded, setExpanded] = useState(false);

  // fetching all details on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_PLANT_DETAILS",
      payload: { id },
    });
  }, []);

  useEffect(() => {
    if (plantDetails?.id) {
      // fetch all base comments on page load
      dispatch({
        type: "FETCH_BASE_COMMENTS",
        payload: { id: plantDetails.id }
      });
    }
  }, [plantDetails]);

  const goBack = () => {
    history.goBack("/");
    // clearDetails();
  };
  const goToEdit = () => {
    dispatch({
      type: "SET_PLANT_EDIT",
      payload: {
        ...plantDetails,
        dateWatered: moment(plantDetails.dateWatered).format("YYYY-MM-DD"),
        dateFertilized: moment(plantDetails.dateFertilized).format(
          "YYYY-MM-DD"
        ),
        dateRepotted: moment(plantDetails.dateRepotted).format("YYYY-MM-DD"),
      },
    });
    history.push(`/edit/${id}`);
  };

  if (isLoading) {
    return <ClipLoader />;
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.longest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // * notifications based on user's dates
  const getDaysSinceLastWater = (lastWaterTimestamp) => {
    const lastWaterMoment = moment(lastWaterTimestamp);
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

  const daysSinceLastWater = getDaysSinceLastWater(plantDetails.dateWatered);
  const nextWaterDate = getNextWaterDate(daysSinceLastWater);
  const isWaterDayInThePast = getIsWaterDayInThePast(nextWaterDate);
  const daysOverdue = today.diff(nextWaterDate, "days");

  return (
    <>
      <Card
        sx={{
          display: "flex",
          px: "5px",
          justifyItems: "center",
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
          }}
        >
          {/***** User details ****/}
          <Box
            direction="row"
            sx={{
              display: "flex",
              alignItems: "left",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyItems: "center",
              }}
            >
              <CardContent
                style={{ paddingBottom: 0 }}
                sx={{ flex: "1 0 auto" }}
              >
                <Typography component="div" variant="h5">
                  {plantDetails.nickname}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontStyle="italic"
                  position="static"
                  color="text.secondary"
                  component="div"
                >
                  {apiDetails?.scientific_name}
                </Typography>

                {/* pet toxicity */}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {apiDetails?.poisonous_to_pets == 0
                    ? "Non-toxic to Pets"
                    : "Toxic to Pets"}
                </Typography>

                {/***** Offer status for plant offer *****/}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {plantDetails?.isOffered ? "Offered" : "Not Offered"}{" "}
                </Typography>
              </CardContent>
            </Box>
            <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />

            {/* plant image */}
            <CardMedia
              sx={{
                display: "flex",
                align: "right",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
              // loading="lazy"
              style={{
                borderRadius: "5px",
                display: "block",
                width: 150,
                height: 150,
                margin: "1rem",
              }}
              component="img"
              src={plantDetails?.image_url}
              alt="plant image from user"
            />

            {/* notes */}
            <Box>
              <CardContent style={{ paddingBottom: 0, width: "100%" }}>
                <Typography size="h4" style={{ p: 0 }}>
                  <strong> Notes:</strong> {plantDetails?.notes}
                </Typography>
              </CardContent>
            </Box>

            {/* watering */}
            <CardContent>
              <Typography size="h4">
                <b>Last watered:</b>{" "}
                {moment(plantDetails?.dateWatered).format("MMMM D")}
              </Typography>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                {daysOverdue <= -5 ? "Up to Date" : ""}
                <Typography style={{ fontWeight: "bold", color: "#dc445c" }}>
                  <Icon
                    path={mdiWateringCanOutline}
                    size={1}
                    rotate={30}
                    color="#23422a"
                  />
                  {isWaterDayInThePast
                    ? daysOverdue == 0
                      ? `Water today`
                      : daysOverdue == 1
                      ? `Overdue by ${daysOverdue} day, water today `
                      : `Overdue by ${daysOverdue} days, water today`
                    : daysOverdue == 0
                    ? ` Water tomorrow`
                    : `Water on ${nextWaterDate}`}
                </Typography>
              </Typography>
            </CardContent>

            {/* fertilized */}
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Last fertilized:
              </Typography>
              <ListItem>
                {moment(plantDetails?.dateFertilized).format("MMMM D")}
              </ListItem>
            </CardContent>

            {/* re-pot */}
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Last re-pot:
              </Typography>
              <ListItem>
                {moment(plantDetails?.dateRepotted).format("MMMM D")}
              </ListItem>
            </CardContent>
          </Box>
          <Divider component="div" sx={{ m: 0.2 }} orientation="horizontal" />

          {/* Expand Icon */}
          <CardActions disableSpacing sx={{ padding: 0 }}>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {" "}
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse
            onClick={handleExpandClick}
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            {/***** Additional details ******/}
            <Box
              sx={{
                display: "flex",
                // alignItems: "left",
                flexDirection: "column",
                justifyContent: "left",
              }}
            >
              <CardContent>
                <Typography
                  size="h4"
                  style={{ fontWeight: "bold", padding: 0 }}
                >
                  Care:{" "}
                </Typography>
                <ListItem>{apiDetails?.care_level}</ListItem>
              </CardContent>

              <Divider
                component="div"
                sx={{ m: 0.5 }}
                orientation="horizontal"
              />

              <CardContent>
                <Typography
                  size="h4"
                  style={{ fontWeight: "bold", padding: 0 }}
                >
                  Watering:{" "}
                </Typography>
                <ListItem>{apiDetails?.watering}</ListItem>
              </CardContent>

              <Divider
                component="div"
                sx={{ m: 0.5 }}
                orientation="horizontal"
              />

              <CardContent>
                <Typography
                  size="h4"
                  style={{ fontWeight: "bold", padding: 0 }}
                >
                  Sunlight:
                </Typography>
                <ul>
                  {/* mapping over sunlight array to display item at each index */}
                  {apiDetails?.sunlight?.map((sunlight, id) => (
                    <li>{sunlight}</li>
                  ))}
                </ul>
              </CardContent>

              <Divider
                component="div"
                sx={{ p: 0, m: 0.5 }}
                orientation="horizontal"
              />

              <CardContent>
                <Typography size="h4" style={{ fontWeight: "bold" }}>
                  Growth rate:{" "}
                </Typography>
                <ListItem>{apiDetails?.growth_rate}</ListItem>
              </CardContent>

              <Divider
                component="div"
                sx={{ m: 0.5 }}
                orientation="horizontal"
              />

              <CardContent>
                <Typography size="h4" style={{ fontWeight: "bold" }}>
                  Soil type:{" "}
                </Typography>
                <ul>
                  {/* mapping over soil array to display item at each index */}
                  {apiDetails?.soil?.map((soil, id) => (
                    <li>{soil}</li>
                  ))}
                </ul>
              </CardContent>

              <Divider
                component="div"
                sx={{ m: 0.5 }}
                orientation="horizontal"
              />

              <CardContent>
                <Typography size="h4" style={{ fontWeight: "bold" }}>
                  Maintenance level:{" "}
                </Typography>
                <ListItem>{apiDetails?.maintenance}</ListItem>
              </CardContent>
            </Box>
          </Collapse>

          {/*  Back and Edit buttons */}
          <Box
            sx={{
              // display: "flex",
              // flexDirection: "row",
              alignSelf: "center",
              marginBottom: 2,
            }}
          >
            <IconButton
              variant="outlined"
              size="small"
              color="success"
              onClick={goBack}
              sx={{ marginLeft: -1 }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Button
              variant="contained"
              color="success"
              onClick={goToEdit}
              sx={{
                borderRadius: 16,
              }}
            >
              Add Care or Offer
            </Button>
          </Box>
        </Box>
      </Card>
      <CommentThread plant_id={plantDetails.id} />
    </>
  );
}

export default PlantDetails;
