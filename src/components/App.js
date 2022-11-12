import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import * as BooksAPI from "../utils/BooksAPI";
import "../css/App.css";
import BookCollection from "./BookCollection";
import _ from "lodash";
import AddShelfModal from "./AddShelfModal";

function App() {
  const [allBooks, setAllBooks] = useState([]);
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

  const navPages = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
  ];

  useEffect(() => {
    // Get All Books
    const getAllBooks = async () => {
      const res = await BooksAPI.getAll();
      const booksArray = Object.keys(res).map((key) => {
        return res[key];
      });
      setAllBooks(booksArray);
    };

    getAllBooks();

    setShelves((s) =>
      s.map((shelf) => ({
        ...shelf,
        collection: allBooks.filter((b) => b.shelf === shelf.id),
      }))
    );
  }, [allBooks]);

  const handleSearchQuery = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const handleShelfChange = (event) => {
    event.preventDefault();
    console.log("handleShelfChange - event: ", event.target.value);
    console.log("handleShelfChange - bookId: ", event.target.bookId);
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
    <div className="App">
      <NavBar
        appName="Bookshelf"
        pages={navPages}
        onSearchQuery={handleSearchQuery}
      />
      <AddShelfModal onAddShelf={handleAddShelf} />
      {shelves.map((shelf) => (
        <BookCollection
          key={shelf.id}
          name={shelf.name}
          bookList={shelf.collection}
          shelves={shelves}
          onShelfChange={handleShelfChange}
        />
      ))}
    </div>
  );
}

export default App;
