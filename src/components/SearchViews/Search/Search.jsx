import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchList from "../SearchList/SearchList";
// material ui
import { Box, Paper, Typography, InputBase } from "@mui/material/";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

// search a plant, view search item, at route '/add-plant'
function Search() {
  const dispatch = useDispatch();
  const [newSearch, setNewSearch] = useState("");
  const search = useSelector((store) => store.search.searchReducer);

  function handleSearch() {
    console.log("new search:", newSearch);
    dispatch({
      type: "GET_NEW_SEARCH",
      payload: { q: newSearch },
    });
    setNewSearch("");
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  return (
    <>
      <Box align="center" sx={{ mb: "50px", mt: "20px" }}>
        <Typography
          variant="h4"
          alignItems="center"
          style={{
            fontFamily: "Oleo-Script",
            color: "#327c36",
            fontSize: 35,
            padding: "2vh",
          }}
        >
          {" "}
          find your plant{" "}
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Paper
            className="search-form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 300,
            }}
          >
            <InputBase
              value={newSearch}
              onChange={handleSearchChange}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search our collection of plants"
              inputProps={{ "aria-label": "search our list of plants" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              onClick={handleSearch}
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </form>
        <SearchList />
      </Box>
    </>
  );
}

export default Search;
