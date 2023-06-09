import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
// file imports
import PlantItem from "../PlantItem/PlantItem";
// mui
import { Grid, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// * Plant Collection component
function PlantList({ item }) {
  const dispatch = useDispatch();
  const today = moment();

  // subscribe to plants reducer
  const plantGallery = useSelector((store) => store.plants.plantsReducer);

  // fetch all plants from db on page load
  useEffect(() => {
    dispatch({
      type: "FETCH_PLANTS",
    });
  }, []);

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

  return (
    <>
      <main>
        {plantGallery?.length == 0 ? (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "row",
              fontFamily: "Dangwa",
              fontSize: 35,
              color: "#dc445c",
              borderRadius: "1em 0 1em 0",
              backgroundColor: "#f8f1e4",
              padding: "1rem",
            }}
          >
            <IconButton
              sx={{ mx: '1rem', background: "#aaaaaa", width: 50, height: 50, borderRadius: "50%" }}
              size="large"
              aria-label="add plant"
              component={Link}
              to="/add-plant"
            >
              <AddIcon fontSize="large" />
            </IconButton>
            <h4
              style={{
                fontFamily: "Roboto",
                color: "#375379",
                fontSize: 22,
                marginLeft: 1,
              }}
            >
              add a new plant to your collection
            </h4>
          </div>
        ) : (
        <section className="plants" padding="20">
          <Box sx={{ alignContent: "right" }}>
            {/* Upcoming */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                maxWidth: "125vh",
              }}
            >
              <h2
                style={{
                  fontFamily: "Dangwa",
                  fontSize: 40,
                  color: "#dc445c",
                  borderRadius: "0 1em 0 1em",
                  backgroundColor: "#f8f1e4",
                  padding: "4vh",
                }}
              >
                Upcoming
              </h2>
              {/* Today */}
              <Grid
                alignItems="center"
                textAlign="left"
                style={{
                  fontFamily: "Dangwa",
                  fontSize: 35,
                  color: "#d1dde5",
                  borderRadius: ".5em .5em .5em .5em",
                  backgroundColor: "#375379",
                  padding: "2vh",
                }}
              >
                today
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    align: "center",
                  }}
                >
                  {plantGallery.map((item) => {
                    let daysSinceWater = getDaysSinceLastWater(
                      item.dateWatered
                    );
                    let next = getNextWaterDate(daysSinceWater);
                    let daysOverdue = today.diff(next, "days");
                    if (daysOverdue >= 0) {
                      return (
                        <PlantItem
                          key={item?.id}
                          item={item}
                          daysOverdue={`${daysOverdue}`}
                        />
                      );
                    }
                  })}
                </div>
              </Grid>
              {/* In 3 days */}
              <h4
                alignItems="center"
                style={{
                  fontFamily: "Dangwa",
                  fontSize: 35,
                  color: "#d1dde5",
                  borderRadius: ".5em .5em .5em .5em",
                  backgroundColor: "#375379",
                  padding: "2vh",
                }}
              >
                in 3 days
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    align: "center",
                  }}
                >
                  {plantGallery.map((item) => {
                    let daysSinceWater = getDaysSinceLastWater(
                      item.dateWatered
                    );
                    let next = getNextWaterDate(daysSinceWater);
                    let daysOverdue = today.diff(next, "days");
                    if (daysOverdue >= -3 && daysOverdue < 0) {
                      return (
                        <PlantItem
                          key={item?.id}
                          item={item}
                          daysOverdue={daysOverdue}
                        />
                      );
                    }
                  })}
                </div>
              </h4>
              {/* In 7 days */}
              <Grid
                alignItems="center"
                style={{
                  fontFamily: "Dangwa",
                  fontSize: 35,
                  color: "#d1dde5",
                  borderRadius: ".5em .5em .5em .5em",
                  backgroundColor: "#375379",
                  padding: "2vh",
                }}
              >
                in one week
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    align: "center",
                  }}
                >
                  {plantGallery.map((item) => {
                    let daysSinceWater = getDaysSinceLastWater(
                      item.dateWatered
                    );
                    let next = getNextWaterDate(daysSinceWater);
                    let daysOverdue = today.diff(next, "days");
                    if (daysOverdue < -3) {
                      return (
                        <PlantItem
                          key={item?.id}
                          item={item}
                          daysOverdue={daysOverdue}
                        />
                      );
                    }
                  })}
                </div>
              </Grid>
            </div>
          </Box>
        </section>
        )}
      </main>
    </>
  );
}

export default PlantList;
