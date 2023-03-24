import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchItem from "../SearchItem/SearchItem";
import SearchDetails from "../SearchDetails/SearchDetails";
// material ui
import Box from "@mui/material/Box";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";

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

  // const SelectedListItem = () {
  //   const [selectedIndex, setSelectedIndex] = React.useState(1);

  //   const handleListItemClick = (event, index) => {
  //     setSelectedIndex(index);
  //   };

  return (
    <>
      <section className="search-result-cards" background-color="#F9F9F9">
      <List sx={{ width: "100%", maxWidth: 360 }}>
          {searchItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleViewingDetails(item.id)}
              //     style={{
              //   margin: '1rem',
              //  marginBottom: "1rem",
              //   border: "1px solid black",
              //   padding: "1rem",
              // }}
              // align="auto"
            >
              <>
                <ListItem
                  alignItems="flex-start"
                  style={{ listStyleType: "none", paddingLeft: 0 }}
                >
                </ListItem>
                {/* <li>style={{ display: 'inline' fontWeight: "bold", fontStyle: "italic" }}>{item.scientific_name}</li> */}
                {/* <ul style={{ listStyleType: "none", paddingLeft: 0 }}> */}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      // src={item?.default_image?.original_url} // * perenual api
                      src={item?.default_image?.medium_url}
                      // src={item.images.flower.image_url} // * trefle.io
                      // loading="lazy"
                      style={{
                        borderRadius: "10px",
                        display: "block",
                        width: 100,
                        height: 100,
                        margin: '0 1rem',
                      }}
                      alt={item.common_name}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.scientific_name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.common_name}
                        </Typography>
                        {/* {" — details…"} */}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {/* <Divider variant="inset" component="li" sx={{ height: 10, m: 0.5 }} orientation="horizontal"/> */}
              </>
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
          </List>
        </section>

    </>
  );
}

export default SearchList;
