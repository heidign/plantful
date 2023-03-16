import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchItem from "../SearchItem/SearchItem";
import SearchDetails from "../SearchDetails/SearchDetails";

// * result of search from api
function SearchList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const searchItems = useSelector((store) => store.search.searchReducer);

  const goToSearchDetails = () => {
    history.push("/search-details");
  };

  const [viewingDetails, setViewingDetails] = useState(false);
  const [viewingPlantId, setViewingPlantId] = useState(0);

  const handleViewingDetails = (id) => {
    setViewingDetails(!viewingDetails);
    setViewingPlantId(id);
  };

  return (
    <>
      <section className="search-result-cards">
        {searchItems.map((item) => (
          <div key={item.id} onClick={() => handleViewingDetails(item.id)}
        style={{
          marginBottom: "1rem",
          border: "1px solid black",
          padding: "1rem",
        }}
        align="auto"
      >
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          <li style={{ fontWeight: "bold", fontStyle: "italic" }}>
            {item.scientific_name}
          </li>
          <li>
            <img
              // src={plant.default_image.original_url} // * perenual api
              src={item.default_image.regular_url}
              // src={plant.images.flower.image_url} // * trefle.io
              loading="lazy"
              style={{
                borderRadius: "15px",
                display: "block",
                width: 100,
                //   height: "50%",
              }}
              alt={item.common_name}
            />
          </li>
        </ul>
            <></>
            {item.id === viewingPlantId ? (
              <SearchDetails
                item={item}
                goBack={() => handleViewingDetails(item.id)}
              />
            ) : (
              <></>
            )}
          </div>
        ))}
      </section>
    </>
  );
}

export default SearchList;
