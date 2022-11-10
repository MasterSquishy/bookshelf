import React from "react";

const BookCollection = ({ name, bookList }) => {
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
              <span class="fa-stack small fa-2x book-shelf-changer">
                <i class="fa fa-circle fa-stack-2x"></i>
                <i
                  class="fa fa-chevron-down fa-stack-1x fa-inverse"
                  aria-hidden="true"
                ></i>
              </span>
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
