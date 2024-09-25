import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useForm from "../../hooks/useForm";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import "./categoryPage.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCategoryAction } from "../../redux/categoryRedux/categoryActions";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

const EditCategoryModal = (props) => {
  const { isLoading } = useSelector((state) => state.helper);
  const [newThumbnail, setNewThumbnail] = useState([]);
  const [existingThumbnail, setExistingthumbnail] = useState([]);
  const [thumbnailToDeleteFromCloud, setThumbnailToDeleteFromCloud] = useState(
    []
  );

  const { setFormData, formData, handleOnChange } = useForm(
    props.initialformdata
  );

  // console.log(formData);
  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewThumbnail([...files]);
    setThumbnailToDeleteFromCloud([existingThumbnail]);
    setExistingthumbnail([]);
  };

  const handleRemoveImage = () => {
    setCategoryThumbnail([]);
  };

  const handleRemoveExistingImage = () => {
    const updatedImages = [...existingThumbnail];
    setExistingthumbnail([]);
    setThumbnailToDeleteFromCloud([updatedImages]);
  };

  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let formObject = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "categoryThumbnail") {
        formObject.append(key, value);
      }
    });
    Array.from(thumbnailToDeleteFromCloud).forEach((image) => {
      formObject.append("thumbnailToDeleteFromCloud", image);
    });
    Array.from(newThumbnail).forEach((image) => {
      formObject.append("newThumbnail", image);
    });
    Array.from(existingThumbnail).forEach((image) => {
      formObject.append("existingThumbnail", image);
    });
    const action = await dispatch(
      updateCategoryAction(props.initialformdata._id, formObject)
    );

    if (action?.status === "success") {
      props.onHide();
      toast.success(action.message);
    }
  };
  useEffect(() => {
    setExistingthumbnail(props.initialformdata.categoryThumbnail);
    setFormData(props.initialformdata);
  }, [props.initialformdata]);
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
            Update Category
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
                value={formData.category}
                onChange={handleOnChange}
                required
              />
            </Row>
            <Row>
              {/* category Thumbnail */}
              <Row>
                <Row>
                  <Form.Label className="fw-bold ms-1">
                    Thumbnail * 1 files uploaded
                  </Form.Label>

                  <Form.Control
                    type="file"
                    name="thumbnail"
                    onChange={handleNewImagesChange}
                    accept="image/png,image/jpeg, image/gif, image/webp"
                    className="ms-3"
                    required={existingThumbnail?.length < 1}
                    max={1}
                  />
                </Row>
                <Row className="p-2 ms-2">
                  {newThumbnail?.length > 0 &&
                    newThumbnail.map((image, index) => (
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

                  {newThumbnail.length < 1 &&
                    existingThumbnail?.map((image, index) => (
                      <Col key={index}>
                        <div className="productFormCrossDiv">
                          <ImCross
                            size={15}
                            className="productFormCross"
                            onClick={() =>
                              handleRemoveExistingImage(
                                index,
                                "removeexistingThumbnail"
                              )
                            }
                          />

                          <img
                            src={image}
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

              {/* this is the end of cat thumbnail */}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant={"outline-warning"}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
