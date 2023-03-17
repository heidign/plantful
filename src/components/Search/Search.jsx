import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchList from "../SearchList/SearchList";

// search a plant, view search item, at route '/add-plant'
function Search() {
  const dispatch = useDispatch();
  const [newSearch, setNewSearch] = useState('');
  const search = useSelector((store) => store.search.searchReducer);

  function handleClick() {
    console.log("new search:", newSearch);
    dispatch({
      type: "GET_NEW_SEARCH",
      payload: { q: newSearch },
    });
   setNewSearch('')
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  return (
    <div className="search-form">
      <span>
        <h1>Search plants: </h1>
        <input
          value={newSearch}
          onChange={handleSearchChange}
          type="text"
          placeholder="search plants"
        />
        <button onClick={handleClick}>Search</button>
      </span> 
      <SearchList />
    </div>
  );
}

export default Search;
