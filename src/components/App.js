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
    // Get All Books from the api
    const getAllBooks = async () => {
      const res = await BooksAPI.getAll();
      const booksArray = Object.keys(res).map((key) => {
        return res[key];
      });

      setAllBooks(booksArray);
    };

    getAllBooks();
  }, []);

  useEffect(() => {
    let tempShelves = new Set();
    // Ensure that these are the first 3 shelves in the list
    tempShelves.add("currentlyReading");
    tempShelves.add("wantToRead");
    tempShelves.add("read");

    // Extract unique shelves from booklist
    allBooks.forEach((b) => {
      tempShelves.add(b.shelf);
    });

    // Add an id and collection of books to each shelf
    tempShelves = Array.from(tempShelves).map((s) => ({
      name: _.startCase(s),
      id: s,
      collection: allBooks.filter((b) => b.shelf === s),
    }));

    setShelves(tempShelves);
  }, [allBooks]);

  const handleSearchQuery = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const handleShelfChange = (bookId, newShelf) => {
    console.log("handleShelfChange - bookId: ", bookId);
    console.log("handleShelfChange - newShelf: ", newShelf);
    console.log(allBooks);
    let target = allBooks.find((book) => book.id === bookId);
    console.log("handleShelfChange - target: ", target);
    target.shelf = newShelf;

    console.log("Updated target:", target);

    setAllBooks(
      allBooks.map((b) => (b.id === bookId ? { ...b, shelf: newShelf } : b))
    );
    console.log(allBooks);
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
