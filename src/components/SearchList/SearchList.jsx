import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// * result of search from api
function SearchList() {
    const history = useHistory(); 
  const searchList = useSelector((store) => store.search.searchReducer);
  const dispatch = useDispatch();

  // * fetch all searched plants on page load
  useEffect(() => {
    dispatch({
      type: "GET_NEW_SEARCH",
    });
  }, []);

  const goToSearchDetails = () => {
      history.push(`/search-details${item.id}`)
  };
  return (
    <section className="search-results">
      {searchList.map((item) => (
        <div align="center">
              <p><strong>{item.common_name}</strong></p>
              <p><i>{item.scientific_name}</i></p>
          <div>
            <img
              // src={plant.default_image.original_url} // * perenual api
              src={item.default_image.regular_url}
              // src={plant.images.flower.image_url} // * trefle.io
              loading="lazy"
              style={{
                borderRadius: "15px",
                display: "block",
                width: "50%",
                height: "50%",
              }}
              onClick={goToSearchDetails}
                      alt={item.common_name}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default SearchList;
