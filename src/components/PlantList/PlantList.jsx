import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PlantItem from "../PlantItem/PlantItem";
import { Grid, Box } from "@mui/material";

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
      <section className="plants" padding="20">
        <Box sx={{ alignContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <h2
              style={{
                fontFamily: "Dangwa",
                fontSize: 40,
                // color: "#23422a",
                color: "#dc445c",
                borderRadius: "0 1em 0 1em",
                // backgroundColor: "#d1dde5", 
                backgroundColor: "#f8f1e4",
                padding: "7vh",
                margin: "1vh",
              }}
            >
              Upcoming
            </h2>
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
              {/* Today */}
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
                  let daysSinceWater = getDaysSinceLastWater(item.dateWatered);
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
            </h4>
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
                }}
              >
                {plantGallery.map((item) => {
                  let daysSinceWater = getDaysSinceLastWater(item.dateWatered);
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
              in one week
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {plantGallery.map((item) => {
                  let daysSinceWater = getDaysSinceLastWater(item.dateWatered);
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
            </h4>
          </div>
        </Box>
      </section>
    </>
  );
}

export default PlantList;
