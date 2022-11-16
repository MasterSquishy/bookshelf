import AddShelfModal from "./AddShelfModal";
import BookCollection from "./BookCollection";
import PropTypes from "prop-types";

const MyBooks = ({ shelves, onAddShelf, onShelfChange }) => {
  console.log("MyBookShelves: ", shelves);
  return (
    <>
      <AddShelfModal onAddShelf={() => onAddShelf()} />
      {shelves.map((shelf) => (
        <BookCollection
          key={shelf.id}
          name={shelf.name}
          bookList={shelf.collection}
          shelves={shelves}
          onShelfChange={onShelfChange}
        />
      ))}
    </>
  );
};

MyBooks.propTypes = {
  shelves: PropTypes.array.isRequired,
  onAddShelf: PropTypes.func.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};
export default MyBooks;
