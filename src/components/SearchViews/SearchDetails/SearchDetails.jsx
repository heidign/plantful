import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Divider, Box } from "@mui/material";

// * displays more details 
function SearchDetails({ item }) {

  const history = useHistory();
  const dispatch = useDispatch();
  
  const addToCollection = () => {
    dispatch({
      type: 'SET_SEARCH_PLANT',
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
        </ul>
        <div style={{ display: "flex", flexDirection: "row", justifyContent:"center" }}>
          <strong>Sunlight:</strong>
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  {/* mapping over sunlight array to display item at each index */}
                  {item?.sunlight?.map((sunlight, id) => (
                    <li key={id}>{sunlight}</li>
                  ))}
          </ul>
          </div>
        <Button onClick={goBack} color="success" variant="outlined" size="small">Back</Button>
        <Button onClick={addToCollection} color="success" variant="contained" size="small">Add Plant</Button>
        <Divider component="div" alignSelf="center" sx={{ m: 0.5, p: 0.5}} orientation="horizontal" />
     </Box>
    );
};


export default SearchDetails;