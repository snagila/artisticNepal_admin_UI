import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useForm from "../../hooks/useForm";
import { Form, Spinner } from "react-bootstrap";
import "./categoryPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewCategoryAction,
  updateCategoryAction,
} from "../../redux/categoryRedux/categoryActions";

const AddCategoryModal = (props) => {
  const { isLoading } = useSelector((state) => state.helper);
  const { setFormData, formData, handleOnChange } = useForm(
    props.initialformdata
  );

  const dispatch = useDispatch();
  const buttonText = props.initialformdata.category ? "Update" : "Add";
  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.categorytoedit?._id
      ? dispatch(updateCategoryAction(props.categorytoedit._id, formData)) &&
        setFormData({
          category: "",
        })
      : dispatch(createNewCategoryAction(formData));
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="categoryModal rounded">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.categorytoedit?._id ? "Update Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>

        <Form className=" gap-2" onSubmit={handleOnSubmit}>
          <Modal.Body>
            <Form.Control
              type="text"
              placeholder="Add New Category"
              className="text-center"
              name="category"
              value={
                formData.category
                  ? formData.category
                  : props.initialformdata.category
              }
              onChange={handleOnChange}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant={
                buttonText === "Update" ? "outline-warning" : "outline-success"
              }
              type="submit"
            >
              {isLoading ? <Spinner animation="grow" /> : buttonText}
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};
export default AddCategoryModal;
