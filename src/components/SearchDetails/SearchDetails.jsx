import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchList from "../SearchList/SearchList";

  // * displays more details 
function SearchDetails({item}) {
    const history = useHistory();
    const dispatch = useDispatch();
    const searchDetails = useSelector((store) => store.search.searchReducer);
  console.log('search details', searchDetails);
  console.log('ITEM', item);

    useEffect(() => {
        dispatch({
          type: "GET_NEW_SEARCH",
          // payload: {q: }
        });
    }, []);
    
    const goBack = () => {
        history.goBack("/search-list");
      };

    return (

      <div>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        <li><strong>Other names:</strong> {item.common_name}</li>
          <li><strong>Watering:</strong> {item.watering}</li>
          <li><strong>Sunlight:</strong> {item.sunlight}</li>
        </ul>
        <button onClick={goBack}>View all</button>
        <button>Add Plant</button>
      </div>
    );
};


export default SearchDetails;