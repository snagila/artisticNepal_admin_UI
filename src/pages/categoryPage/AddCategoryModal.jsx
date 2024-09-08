import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useForm from "../../hooks/useForm";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import "./categoryPage.css";
import { useDispatch, useSelector } from "react-redux";
import { createNewCategoryAction } from "../../redux/categoryRedux/categoryActions";
import { useState } from "react";
import { ImCross } from "react-icons/im";

const AddCategoryModal = (props) => {
  const { isLoading } = useSelector((state) => state.helper);
  const [categoryThumbnail, setCategoryThumbnail] = useState([]);
  const { formData, handleOnChange } = useForm(props.initialformdata);

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setCategoryThumbnail([...files]);
  };

  const handleRemoveImage = () => {
    setCategoryThumbnail([]);
  };

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let formObject = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formObject.append(key, value)
    );
    Array.from(categoryThumbnail).forEach((image) => {
      formObject.append("categoryThumbnail", image);
    });
    // console.log(...formObject.entries());
    const action = await dispatch(createNewCategoryAction(formObject));
    if (action?.status === "success") {
      props.onHide();
      toast.success(action.message);
    }
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
            Add Category
          </Modal.Title>
        </Modal.Header>

        <Form className=" gap-2" onSubmit={handleOnSubmit}>
          <Modal.Body>
            <Row>
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
            </Row>
            <Row>
              {/* category Thumbnail */}
              <Row>
                <Row className="w-100">
                  <Form.Label className="fw-bold ms-1 mt-2">
                    Thumbnail * {categoryThumbnail.length} files uploaded
                  </Form.Label>

                  <Form.Control
                    type="file"
                    name="categoryThumbnail"
                    onChange={handleNewImagesChange}
                    max={1}
                    className="ms-3"
                    required
                  />
                </Row>
                <Row className="p-2 ms-2">
                  {categoryThumbnail?.length > 0 &&
                    categoryThumbnail.map((image, index) => (
                      <Col key={index}>
                        <div className="productFormCrossDiv">
                          <ImCross
                            size={15}
                            className="productFormCross"
                            onClick={() =>
                              handleRemoveImage(index, "thumbnail")
                            }
                          />

                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Product Image ${index + 1}`}
                            style={{
                              maxWidth: "100px",
                              maxHeight: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Col>
                    ))}
                </Row>
              </Row>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" type="submit">
              {isLoading ? <Spinner animation="border" size="sm" /> : "Add"}
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};
export default AddCategoryModal;
