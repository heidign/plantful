import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import { Button } from "@mui/material";

function PlantDetails() {
  const history = useHistory();
  const dispatch = useDispatch();
  // getting id key from path params
  let { id } = useParams();

  const plantDetails = useSelector((store) => store.plantDetails.data.details);
  const dataFromUser = useSelector((store) => store.plantDetails.data.dataFromUser);
  const isLoading = useSelector((store) => store.plantDetails.loading);


  useEffect(() => {
    dispatch({
      type: "FETCH_DETAILS",
      payload: { id }
    });
  }, []);

  const goBack = () => {
    history.goBack("/");
    // clearDetails();
  };
  const goToEdit = () => {
    history.push(`/edit/${id}`)
  }

  if (isLoading) {
    return <ClipLoader />
  }

  // * sorting out alerts based on user's dates
  const getDaysSinceLastWater = (lastWaterTimestamp) => {
    const lastWaterMoment = moment.unix(lastWaterTimestamp);
    const today = moment();
  
    return today.diff(lastWaterMoment, "days");
  };
  
  const getNextWaterDate = (daysSinceLastWater) => {
    const WATER_DAYS_INTERVAL = 7;
    const daysTilNextWater = WATER_DAYS_INTERVAL - daysSinceLastWater;
  
    return moment().add(daysTilNextWater, "day").format("LL");
  };
  
  const getIsWaterDayInThePast = (nextWaterDate) => {
    return moment(nextWaterDate).isBefore();
  };
 
  const daysSinceLastWater = getDaysSinceLastWater(plantDetails.lastWateredTimestamp);
  const nextWaterDate = getNextWaterDate(daysSinceLastWater);
  const isWaterDayInThePast = getIsWaterDayInThePast(nextWaterDate);

  return (
    <>
       {/* <h3>{plantDetails.nickname}</h3> */}
      {/* <pre>{JSON.stringify(plantDetails, null, 2)}</pre> */}
      <h4 type="h4">Watering:</h4>
      <ul>
        <p>{plantDetails.watering}</p>
      </ul>
        <h4 type="h4">Sunlight:</h4>
      <ul> 
        {/* mapping over sunlight array to display item at each index */}
          {plantDetails.sunlight.map((sunlight) => (
          <li key={id}>{sunlight}</li>
        ))}
      </ul>
      <h4 type="h4">Growth rate:</h4>
      <ul>
        <p>{plantDetails.growth_rate}</p>
      </ul>
      <h4 type="h4">Soil type:</h4>
      <ul>
        <p>{plantDetails.soil}</p>
      </ul>
      <h4 type="h4">Maintenance level: </h4>
      <ul>
        <p>{plantDetails.maintenance}</p>
      </ul>

      <h4>Date last watered:</h4>
      <p>{moment(dataFromUser.dateWatered).format('LL')}</p>
      <li><strong>Next Water Date:</strong>{''}
          {isWaterDayInThePast ? ` Water ASAP`: nextWaterDate}
      </li>
      <h4>Data last fertilized:</h4>
      <p>{moment(dataFromUser.dateFertilized).format('LL')}</p>
      <h4>Date of last re-pot:</h4>
      <p>{moment(dataFromUser.dateRepotted).format('LL') }</p>
      <Button onClick={goBack}>Back</Button>
      <Button variant="contained" onClick={goToEdit}>Edit</Button>
    </>
  );
}

export default PlantDetails;





