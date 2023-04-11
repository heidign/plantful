import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, Paper, Box } from "@mui/material";

// * displays more details 
function SearchDetails({ item }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const searchDetails = useSelector((store) => store.search.searchReducer);
  
  const addToCollection = () => {
    dispatch({
      type: 'SET_SEARCH_PLANT',
      // payload: { trefleId: item.id, image_url: item?.image_url }
      payload: { api_id: item.id, image_url: item?.default_image?.medium_url }
    });
    history.push("/plant-form");
  };

    const goBack = () => {
        history.push("/search-list");
      };

    return (

      <Box alignItems="center">
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        <li><strong>Common name:</strong> {item?.common_name}</li>
          <li><strong>Other names:</strong> {item?.other_name}</li>
          <li><strong>Watering:</strong> {item?.watering}</li>
          <li><strong>Sunlight:</strong> {item?.sunlight}</li>
        </ul>
        <Button onClick={goBack} color="success" variant="outlined" size="small">Back</Button>
        <Button onClick={addToCollection} color="success" variant="contained" size="small">Add Plant</Button>
        <Divider component="div" alignSelf="center" sx={{ m: 0.5, p: 0.5}} orientation="horizontal" />
     </Box>
    );
};


export default SearchDetails;