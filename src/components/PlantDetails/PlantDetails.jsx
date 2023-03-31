import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import PropTypes from "prop-types";
import {
  FormControlLabel,
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
  Stack,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import Icon from "@mdi/react";
import { mdiWateringCanOutline } from "@mdi/js";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function PlantDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  const today = moment();
  // getting id key from path params
  let { id } = useParams();

  const plantDetails = useSelector((store) => store.plantDetails.data.details);
  const dataFromUser = useSelector(
    (store) => store.plantDetails.data.dataFromUser
  );

  const isLoading = useSelector((store) => store.plantDetails.loading);
  const [isOffered, setIsOffered] = useState(false);

  // fetching all details on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_DETAILS",
      payload: { id },
    });
  }, []);

  const goBack = () => {
    history.goBack("/");
    // clearDetails();
  };
  const goToEdit = () => {
    dispatch({
      type: "SET_PLANT_EDIT",
      payload: {
        ...dataFromUser,
        dateWatered: moment(dataFromUser.dateWatered).format("YYYY-MM-DD"),
        dateFertilized: moment(dataFromUser.dateFertilized).format(
          "YYYY-MM-DD"
        ),
        dateRepotted: moment(dataFromUser.dateRepotted).format("YYYY-MM-DD"),
      },
    });
    history.push(`/edit/${id}`);
  };

  if (isLoading) {
    return <ClipLoader />;
  }

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

  const daysSinceLastWater = getDaysSinceLastWater(dataFromUser.dateWatered);
  const nextWaterDate = getNextWaterDate(daysSinceLastWater);
  const isWaterDayInThePast = getIsWaterDayInThePast(nextWaterDate);
  const daysOverdue = today.diff(nextWaterDate, "days");

  const handleChangeDisplay = (e) => {
    const checkedValue = e.target.checked;
    setIsOffered(!isOffered);
  };

  // const [autoFillNotes, setAutoFillNotes] = useState('');
  // const handleAutoFillNotes = () => {
  //   setAutoFillNotes('dkfhsdlcl');
  // };

  return (
    <>
      <Card
        sx={{
          display: "flex",
          // flexDirection: "row",
          justifyItems: "center",
        }}
      >
        <Box
          sx={{
            // border: "1px solid black",
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
          }}
        >
          {/***** User details ****/}
          <Box
            direction="row"
            sx={{
              // border: "1px solid black",
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
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {dataFromUser.nickname}
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontStyle="italic"
                  position="static"
                  color="text.secondary"
                  component="div"
                  // sx={{ flexWrap: "nowrap"}}
                >
                  {plantDetails?.scientific_name}
                </Typography>

                {/* pet toxicity */}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {plantDetails?.poisonous_to_pets == 0
                    ? "Non-toxic to Pets"
                    : "Toxic to Pets"}
                </Typography>

                {/***** Offer status for plant offer *****/}
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {
                    dataFromUser?.isOffered ? "Offered" : "Not Offered"
                    // TODO: margins
                    // <FormControlLabel
                    //   value="start"
                    //   control={
                    //     <Checkbox
                    //       disabled
                    //       checked={dataFromUser?.isOffered}
                    //       onChange={(e) => handleChangeDisplay(e.target.checked)}
                    //       value={dataFromUser.isOffered}
                    //       name="isOffered"
                    //       inputProps={{
                    //         "aria-label": "Offer Checkbox",
                    //       }}
                    //     />
                    //   }
                    //   label="Not Offered"
                    //   labelPlacement="start"
                    //   />
                  }{" "}
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
              src={dataFromUser?.image_url}
              alt="plant image from user"
            />

            <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />

            {/* notes */}
            <Box>
              <CardContent>
                <Typography size="h4" style={{ padding: 0 }}>
                  <strong> Notes:</strong> {dataFromUser?.notes}
                </Typography>
                {/* <ListItem>{dataFromUser?.notes}</ListItem> */}
              </CardContent>
            </Box>

            <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />

            {/* watering */}
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Date of last watering:
              </Typography>

              <ListItem>
                {moment(dataFromUser?.dateWatered).format("ll")}
              </ListItem>
              <Typography
                size="h4"
                style={{ fontWeight: "bold", color: "#dc445c" }}
              >
                <ListItem>
                  <Icon
                    path={mdiWateringCanOutline}
                    size={1}
                    rotate={30}
                    color="#23422a"
                  />
                  {isWaterDayInThePast
                    ? ` Overdue by ${daysOverdue} days `
                    : nextWaterDate}
                </ListItem>
              </Typography>
            </CardContent>

            {/* fertilized */}
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Date last fertilized:
              </Typography>
              <ListItem>
                {moment(dataFromUser?.dateFertilized).format("ll")}
              </ListItem>
            </CardContent>

            {/* re-pot */}
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Date of last re-pot:
              </Typography>
              <ListItem>
                {moment(dataFromUser?.dateRepotted).format("ll")}
              </ListItem>
            </CardContent>
          </Box>
          {/* </Stack> */}
          <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />
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
              <Typography size="h4" style={{ fontWeight: "bold", padding: 0 }}>
                Care{" "}
              </Typography>
              <ListItem>{plantDetails?.care_level}</ListItem>
            </CardContent>

            <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />

            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold", padding: 0 }}>
                Watering:{" "}
              </Typography>
              <ListItem>{plantDetails?.watering}</ListItem>
            </CardContent>

            <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />

            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold", padding: 0 }}>
                Sunlight:
              </Typography>
              <ul>
                {/* mapping over sunlight array to display item at each index */}
                {plantDetails?.sunlight.map((sunlight, id) => (
                  <li>{sunlight}</li>
                ))}
              </ul>
            </CardContent>

            <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />

            <CardContent sx={{ p: 0, m: 1 }}>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Growth rate:{" "}
              </Typography>
              <ListItem>{plantDetails?.growth_rate}</ListItem>
            </CardContent>

            <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />

            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Soil type:{" "}
              </Typography>
              <ListItem>{plantDetails?.soil}</ListItem>
            </CardContent>

            <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" />

            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Maintenance level:{" "}
              </Typography>
              <ListItem>{plantDetails?.maintenance}</ListItem>
            </CardContent>
          </Box>
          {/* <Divider component="div" sx={{ m: 0.5 }} orientation="horizontal" /> */}

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
    </>
  );
}

export default PlantDetails;
