import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = ({ appName, pages, onSearchQuery }) => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {appName}
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {pages.map((p) => (
              <li key={p.name} className="nav-item">
                <Link
                  to={p.path}
                  className="nav-link active"
                  aria-current="page"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <SearchBar
            placeholder="Search My Library"
            onSearchQuery={onSearchQuery}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
