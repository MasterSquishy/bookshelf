import React from "react";
import DropUp from "./DropUp";

const BookCollection = ({ name, bookList, shelves, onShelfChange }) => {
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
                  backgroundImage: `url(${b.imageLinks.smallThumbnail})`,
                }}
              ></div>
              <DropUp
                header="Move to..."
                options={shelves}
                onSelect={onShelfChange}
                bookId={b.id}
                currentShelf={name}
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
