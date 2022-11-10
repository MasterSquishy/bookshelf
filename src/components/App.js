import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import * as BooksAPI from "../utils/BooksAPI";
import "../css/App.css";
import BookCollection from "./BookCollection";

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [allMyBooks, setAllMyBooks] = useState([]);
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
    console.log("All Books", allBooks);
  }, []);

  const handleSearchQuery = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  return (
    <div className="App">
      <NavBar
        appName="Bookshelf"
        pages={navPages}
        onSearchQuery={handleSearchQuery}
      />
      <BookCollection name="Currently Reading" bookList={allBooks} />
      <BookCollection name="Want to Read" bookList={allBooks} />
      <BookCollection name="Read" bookList={allBooks} />
    </div>
  );
}

export default App;
