import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SearchItem({ item }) {

  return (
      <>
          <h3>Search Item </h3>
      <div
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
              }}
              alt={item.common_name}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default SearchItem;
