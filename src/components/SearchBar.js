import React from "react";

const SearchBar = ({ onSearchQuery, placeholder, query }) => {
  console.log("query in search bar", query);
  return (
    <form className="d-flex" role="search">
      <input
        onChange={(e) => onSearchQuery(e)}
        className="form-control me-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={query}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
