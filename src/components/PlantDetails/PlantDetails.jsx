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
  Stack, ListItem,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
// import { Box } from "@mui/system";

function PlantDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
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

  // * sorting out alerts based on user's dates
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

  const daysSinceLastWater = getDaysSinceLastWater(dataFromUser.dateWatered);
  const nextWaterDate = getNextWaterDate(daysSinceLastWater);
  const isWaterDayInThePast = getIsWaterDayInThePast(nextWaterDate);

  const handleChangeDisplay = (e) => {
    const checkedValue = e.target.checked;
    setIsOffered(!isOffered);
  };

  function Item(props) {
    const { sx, ...other } = props;
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "grey.100",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          ...sx,
        }}
        {...other}
      />
    );
  }
  return (
    <>
      <Card
        sx={{
          border: "2px solid black",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            border: "1px solid black",
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
          }}
        >
          {/* <pre>{JSON.stringify(plantDetails, null, 2)}</pre> */}
          <CardHeader
            title={dataFromUser.nickname}
            component="div"
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          />
          <CardMedia
            sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}
            loading="lazy"
            style={{
              borderRadius: "10px",
              display: "block",
              width: 100,
              height: 100,
              margin: "1rem",
            }}
            component="img"
            src={dataFromUser?.image_url}
            alt="plant image from user"
          />

          {/* User details */}
          <Box
            direction="row"
            sx={{
              border: "1px solid black",
              marginInlineStart: "1rem",
              display: "inline-flex",
              alignItems: "left",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Date of last watering:{" "}
              </Typography>
              <p>{moment(dataFromUser.dateWatered).format("LL")}</p>
              <strong>Watering day: </strong>
              {""}
              {isWaterDayInThePast ? `today` : nextWaterDate}
            </CardContent>

            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Date last fertilized:{" "}
              </Typography>
              <p>{moment(dataFromUser.dateFertilized).format("LL")}</p>
            </CardContent>

            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Date of last re-pot:{" "}
              </Typography>
              <p>{moment(dataFromUser.dateRepotted).format("LL")}</p>
            </CardContent>
          </Box>
          {/* </Stack> */}

          {/* check box for plant offer */}
          <Box
            sx={{
              border: "1px solid black",
              marginInlineStart: "1rem",
              display: "inline-flex",
              flexDirection: "column",
            }}
          >
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  disabled
                  checked={dataFromUser.isOffered}
                  onChange={(e) => handleChangeDisplay(e.target.checked)}
                  value={dataFromUser.isOffered}
                  name="isOffered"
                  inputProps={{
                    "aria-label": "Offer Checkbox",
                  }}
                />
              }
              label="Offered"
              labelPlacement="start"
            />
          </Box>

          {/* Additional details */}
          <Box
            sx={{
              marginInlineStart: "1rem",
              // paddingBlock: "3rem",
              display: "inline-flex",
              alignItems: "left",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Watering:{" "}
              </Typography>
              <ul>
                <p>{plantDetails.watering}</p>
              </ul>
            </CardContent>
            <h4 type="h4">Sunlight:</h4>
            <ul>
              {/* mapping over sunlight array to display item at each index */}
              {plantDetails.sunlight.map((sunlight, id) => (
                <li key={id}>{sunlight}</li>
              ))}
            </ul>
            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Growth rate:{" "}
              </Typography>
              <ul>
                <p>{plantDetails.growth_rate}</p>
              </ul>
            </CardContent>

            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Soil type:{" "}
              </Typography>
              <ul>
                <p>{plantDetails.soil}</p>
              </ul>
            </CardContent>

            <CardContent>
              <Typography size="h4" style={{ fontWeight: "bold" }}>
                Maintenance level:{" "}
              </Typography>
              <ListItem>{plantDetails.maintenance}</ListItem>
            </CardContent>
          </Box>

          {/*  Back and Edit buttons */}
          <Box sx={{
            marginInlineStart: "1rem",
            display: "inline-flex",
            flexDirection: "row"
          }}>
              <Button  variant="outlined" color="secondary" onClick={goBack}>
                Back
              </Button>

              <Button variant="contained" color="secondary" onClick={goToEdit}>
                Edit
              </Button>
          </Box>
          
        </Box>
      </Card>
    </>
  );
}

export default PlantDetails;
