import { React } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./components/App";
import NavBar from "./components/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
let query = "React";
const navPages = [
  { name: "Home", path: "/", search: false },
  {
    name: "Search",
    path: "/search",
    active: false,
    search: true,
    collection: [],
  },
];

const handleSearchQuery = (event) => {
  event.preventDefault();
  query = event.target.value;
  console.log(event.target.value);
};

root.render(
  <BrowserRouter>
    <NavBar
      appName="Bookshelf"
      pages={navPages}
      onSearchQuery={handleSearchQuery}
      query={query}
    />
    <App query={query} />
  </BrowserRouter>
);
