import { useEffect, useState } from "react";
import * as BooksAPI from "../utils/BooksAPI";
import BookCollection from "./BookCollection";

const Search = ({ shelves, onShelfChange, query }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Get All Books that match the query from the api
    const getSearchResults = async () => {
      const res = await BooksAPI.search(query, 20);
      //convert response object to array
      const booksArray = Object.keys(res).map((key) => {
        return res[key];
      });
      booksArray[0] === "empty query"
        ? setSearchResults([])
        : setSearchResults(booksArray);
    };

    if (query) getSearchResults();
  }, [query]);

  return (
    <div>
      <BookCollection
        Name="Library Results"
        bookList={searchResults}
        shelves={shelves}
        onShelfChange={onShelfChange}
      />
    </div>
  );
};

export default Search;
