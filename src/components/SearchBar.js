import React from "react";

const SearchBar = ({ onSearchQuery, placeholder, query }) => {
  return (
    <form className="form-inline my-2 my-lg-0" role="search">
      <input
        onChange={(e) => onSearchQuery(e)}
        className="form-control mr-sm-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={query}
      />
    </form>
  );
};

export default SearchBar;
