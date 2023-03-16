import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

  // * displays more details 
function SearchDetails() {
    const history = useHistory();
    const dispatch = useDispatch();
    const searchDetails = useSelector((store) => store.search.searchReducer);
    
    useEffect(() => {
        dispatch({
          type: "GET_NEW_SEARCH",
        });
    }, []);
    
    const goBack = () => {
        history.goBack("/search-list");
      };

    return (

        <div>
        <button onClick={goBack}>View all</button>
        <h3>Search Details</h3>
            <p>{searchDetails.watering}</p>
            <p>{searchDetails.sunlight}</p>
      </div>
    );
};


export default SearchDetails;