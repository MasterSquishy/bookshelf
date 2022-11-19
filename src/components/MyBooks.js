import BookCollection from "./BookCollection";
import PropTypes from "prop-types";
import _ from "lodash";

const MyBooks = ({ shelves, onShelfChange, myBooks }) => {
  //console.log("MyBookShelves: ", shelves);

  //console.log("shelves", Object.keys(shelves));
  //console.log("Values", Object.values(shelves));
  //console.log("Entries", Object.entries(shelves));

  const bookshelves = Object.entries(shelves);

  return (
    <>
      {bookshelves.map((s) => (
        <BookCollection
          key={s[0]}
          name={_.startCase(s[0])}
          bookList={myBooks.filter((b) => b.shelf === s[0])}
          shelves={Object.keys(shelves)}
          onShelfChange={onShelfChange}
        />
      ))}
    </>
  );
};

MyBooks.propTypes = {
  shelves: PropTypes.object.isRequired,
  myBooks: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};
export default MyBooks;
