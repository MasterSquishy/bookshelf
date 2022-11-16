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
      <div className="books-grid">
        {bookList.map((b) => (
          <li className="book" key={b.id}>
            <div>
              <div
                className="book-cover"
                style={{
                  backgroundImage: `url(${b.imageLinks.thumbnail})`,
                }}
              ></div>
              <DropUp
                header="Move to..."
                options={shelves}
                onSelect={onShelfChange}
                bookId={b.id}
                currentShelf={getBookData(b.id)}
              />
            </div>
            <p className="book-title">{b.title}</p>
            {b.authors.map((author, i) => (
              <span className="book-authors" key={i}>
                {i > 0 && ", "}
                {author}
              </span>
            ))}
          </li>
        ))}
      </div>
    </div>
  );
};

export default BookCollection;
