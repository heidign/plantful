import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
// import { ClipLoader } from "react-spinners";
import { Button, Typography } from "@mui/material";
import EditDetails from "./EditDetails";

function PlantDetails() {
  const history = useHistory();

  // * getting id key from path params
  let { id } = useParams();
  const dispatch = useDispatch();

  const plantDetails = useSelector((store) => store.plantDetails.data.details);
  const dataFromUser = useSelector((store) => store.plantDetails.data.dataFromUser);
  const isLoading = useSelector((store) => store.plantDetails.loading);
  // const [edit, setEdit] = useState(false);

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

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <>
       <h3>{plantDetails.nickname}</h3>
        {/* <EditDetails /> */}
        {/* <pre>{JSON.stringify(plantDetails, null, 2)}</pre> */}
        <h4 type="h4">Watering:</h4>
      <ul>
        <p>{plantDetails.watering}</p>
      </ul>
        <h4 type="h4">Sunlight:</h4>
        <ul>
          {plantDetails.sunlight.map((sunlight) => (
          <li>{sunlight}</li>
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

      <h4>Date last watered: </h4>git commit -m ""
      <p>{moment(dataFromUser.dateWatered).format('LL') }</p>
      <h4>Data last fertilized: </h4>
      <p>{moment(dataFromUser.dateFertilized).format('LL')}</p>
      <h4>Date of last re-pot:</h4>
      <p>{moment(dataFromUser.dateRepotted).format('LL') }</p>
      <Button onClick={goBack}>Back</Button>
      {/* <button onClick={goBack}>Delete</button> */}
    </>
  );
}

export default PlantDetails;





