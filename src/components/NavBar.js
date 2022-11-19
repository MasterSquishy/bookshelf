import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

const NavBar = ({ appName, pages, query, onSearchQuery }) => {
  let location = useLocation();

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
                <NavLink
                  to={p.path}
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                  aria-current="page"
                >
                  {p.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {location.pathname === "/search" && (
            <div className="searchBar">
              <SearchBar
                placeholder="Title, author, or ISBN..."
                onSearchQuery={onSearchQuery}
                query={query}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
