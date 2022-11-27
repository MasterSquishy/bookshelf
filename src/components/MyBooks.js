import BookCollection from "./BookCollection";
import PropTypes from "prop-types";
import _ from "lodash";

const MyBooks = ({ shelves, onShelfChange, myBooks }) => {
  //console.log("MyBookShelves: ", shelves);

  //console.log("shelves", Object.keys(shelves));
  //console.log("Values", Object.values(shelves));
  //console.log("Entries", Object.entries(shelves));

  

  return (
    <>
      {shelves.map((s) => (
        <BookCollection
          key={Object.keys(s)[0]}
          name={_.startCase(Object.keys(s)[0])}
          bookList={myBooks.filter((b) => b.shelf === Object.keys(s)[0])}
          shelves={shelves}
          onShelfChange={onShelfChange}
        />
      ))}
    </>
  );
};

MyBooks.propTypes = {
  shelves: PropTypes.array.isRequired,
  myBooks: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};
export default MyBooks;
