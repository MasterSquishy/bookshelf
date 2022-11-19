import React from "react";
import DropUp from "./DropUp";
import * as BooksAPI from "../utils/BooksAPI";

const BookCollection = ({ name, bookList, shelves, onShelfChange }) => {
  const getBookData = async (bookId) => {
    const res = await BooksAPI.get();
    const book = res;

    return book.shelf;
  };
  return (
    <div className="bookshelf">
      <div className="bookshelf-title">{name}</div>
      {bookList && (
        <div className="books-grid">
          {bookList.map((b) => (
            <li key={b.id}>
              <div className="book">
                <div
                  className="book-cover"
                  style={
                    b.imageLinks && {
                      backgroundImage: `url(${b.imageLinks.thumbnail})`,
                    }
                  }
                ></div>
                <DropUp
                  header="Move to..."
                  options={shelves}
                  onSelect={onShelfChange}
                  bookId={b.id}
                  currentShelf={b.shelf}
                />

                <p className="book-title">{b.title}</p>
                {b.authors &&
                  b.authors.map((author, i) => (
                    <span className="book-authors" key={i}>
                      {i > 0 && ", "}
                      {author}
                    </span>
                  ))}
              </div>
            </li>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookCollection;
