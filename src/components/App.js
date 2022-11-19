import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import _ from "lodash";
import "../css/App.css";
import MyBooks from "./MyBooks";
import Search from "./Search";
import NavBar from "./NavBar";
import * as BooksAPI from "../utils/BooksAPI";

function App() {
  const [myBooks, setMyBooks] = useState([]); // Books that belong to one of my collections
  const [searchBooks, setSearchBooks] = useState([]); //books returned from API search query
  const [query, setQuery] = useState("");
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

  const [shelves, setShelves] = useState({
    currentlyReading: ["1"],
    wantToRead: ["1"],
    read: ["1"],
  });

  const updateBook = async (book) => {
    const res = await BooksAPI.update(book, book.shelf);

    console.log("The Problem", res);
    return res;
  };

  useEffect(() => {
    // Get All Books from the api
    const getMyBooks = async () => {
      const res = await BooksAPI.getAll();
      const booksArray = Object.keys(res).map((key) => {
        return res[key];
      });

      setMyBooks(booksArray);
    };

    getMyBooks();
  }, []);

  const handleShelfChange = (bookId, newShelf) => {
    let target = myBooks.find((book) => book.id === bookId);

    target.shelf = newShelf;

    updateBook(target, newShelf).then(setShelves);
  };

  const handleSearchQuery = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  return (
    <>
      <NavBar
        appName="Bookshelf"
        pages={navPages}
        onSearchQuery={handleSearchQuery}
        query={query}
      />
      <div className="container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <MyBooks
                shelves={shelves}
                onShelfChange={handleShelfChange}
                myBooks={myBooks}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Search
                shelves={shelves}
                onShelfChange={handleShelfChange}
                query={query}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
