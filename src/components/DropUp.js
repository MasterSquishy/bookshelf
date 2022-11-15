import React from "react";
import PropTypes from "prop-types";

const DropUp = ({ header, options, onSelect, bookId, currentShelf }) => {
  return (
    <div className="btn-group dropup">
      <button
        className="btn fa-stack small fa-2x book-shelf-changer dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        type="button"
      >
        <i className="fa fa-circle fa-stack-2x"></i>
        <i
          className="fa fa-chevron-down fa-stack-1x fa-inverse"
          aria-hidden="true"
        ></i>
      </button>
      <div className="dropdown-menu">
        <h6 className="dropdown-header">{header}</h6>
        {options.map((o) => (
          <button
            key={o.id}
            className="dropdown-item"
            onClick={() => onSelect(bookId, o.id)}
          >
            {o.name === currentShelf && (
              <i className="fa fa-check" aria-hidden="true"></i>
            )}
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
};

DropUp.propTypes = {
  header: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  bookId: PropTypes.string.isRequired,
  currentShelf: PropTypes.string.isRequired,
};

export default DropUp;
