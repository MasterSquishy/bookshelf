import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import _ from "lodash";
import "../css/App.css";
import MyBooks from "./MyBooks";
import Search from "./Search";
import * as BooksAPI from "../utils/BooksAPI";

function App({ query }) {
  const [myBooks, setMyBooks] = useState([]); // Books that belong to one of my collections
  const [searchBooks, setSearchBooks] = useState([]); //books returned from API search query

  const [shelves, setShelves] = useState([
    {
      name: "Currently Reading",
      id: "currentlyReading",
      collection: [],
    },
    {
      name: "Want to Read",
      id: "wantToRead",
      collection: [],
    },
    {
      name: "Read",
      id: "read",
      collection: [],
    },
  ]);

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

  useEffect(() => {
    let tempShelves = new Set();
    // Ensure that these are the first 3 shelves in the list
    tempShelves.add("currentlyReading");
    tempShelves.add("wantToRead");
    tempShelves.add("read");

    // Extract unique shelves from booklist
    myBooks.forEach((b) => {
      tempShelves.add(b.shelf);
    });

    // Add an id and collection of books to each shelf
    tempShelves = Array.from(tempShelves).map((s) => ({
      name: _.startCase(s),
      id: s,
      collection: myBooks.filter((b) =>
        b.shelf === "" ? b.shelf === "none" : b.shelf === s
      ),
    }));

    setShelves(tempShelves);
  }, [myBooks]);

  const handleShelfChange = (bookId, newShelf) => {
    let target = myBooks.find((book) => book.id === bookId);

    target.shelf = newShelf;

    // update booklist with new shelf for target book
    setMyBooks(
      myBooks.map((b) => (b.id === bookId ? { ...b, shelf: newShelf } : b))
    );
  };

  const handleAddShelf = (name) => {
    const newShelfObject = {
      name: name,
      id: _.camelCase(name),
      collection: [],
    };
    setShelves([...shelves, newShelfObject]);
  };
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <MyBooks
            shelves={shelves}
            onAddShelf={handleAddShelf}
            onShelfChange={handleShelfChange}
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
  );
}

export default App;
