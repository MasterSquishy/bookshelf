import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

const AddShelfModal = ({ onAddShelf }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = (event) => {
    event.preventDefault();

    // Close Modal
    setShow(false);
    // Add New Shelf - via App's handleAddShelf
    onAddShelf(newShelf);
    // Clear the input field
    setNewShelf("");
  };

  const [newShelf, setNewShelf] = useState("");
  return (
    <>
      <Button className="addShelf" variant="primary" onClick={handleShow}>
        + Add New Shelf
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Shelf</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              onChange={(e) => setNewShelf(e.target.value)}
              className="form-control"
              type="text"
              placeholder="Name"
              value={newShelf}
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={(e) => handleAdd(e)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddShelfModal.propTypes = {
  onAddShelf: PropTypes.func.isRequired,
};

export default AddShelfModal;
