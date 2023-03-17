import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// * displays more details 
function SearchDetails({ item }) {

  const history = useHistory();
  const dispatch = useDispatch();
  const searchDetails = useSelector((store) => store.search.searchReducer);
  
  const addToCollection = () => {
    dispatch({
      type: 'ADD_PLANT',
      payload: { api_id: item.id }
    });
    history.push("/plant-form");
  };

    const goBack = () => {
        history.push("/search-list");
      };

    return (

      <div>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        <li><strong>Other names:</strong> {item.common_name}</li>
          <li><strong>Watering:</strong> {item.watering}</li>
          <li><strong>Sunlight:</strong> {item.sunlight}</li>
        </ul>
        <button onClick={goBack}>Back</button>
        <button onClick={addToCollection}>Add Plant</button>
      </div>
    );
};


export default SearchDetails;