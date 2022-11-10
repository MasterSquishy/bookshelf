import React from "react";

const SearchBar = ({ onSearchQuery, placeholder }) => {
  return (
    <form className="d-flex" role="search">
      <input
        onChange={onSearchQuery}
        className="form-control me-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
