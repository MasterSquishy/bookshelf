import { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";
import BookCollection from "./BookCollection";

const Search = ({ shelves, onShelfChange, query }) => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    // Get All Books from the api
    const getAllBooks = async () => {
      const res = await BooksAPI.search(query, 20);

      setAllBooks(res);
    };

    getAllBooks();
  }, []);

  console.log("Search Results:", allBooks);
  return (
    <div>
      <BookCollection
        Name="Library Results"
        bookList={allBooks}
        shelves={shelves}
        onShelfChange={onShelfChange}
      />
    </div>
  );
};

export default Search;
