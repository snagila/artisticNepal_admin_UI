import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../sharedComponents/CustomInput";
import { newProductformFields } from "./newProductFormFields";
import { ImCross } from "react-icons/im";
import { getCategoriesAction } from "../../redux/categoryRedux/categoryActions";
import { editProductAction } from "../../redux/productRedux/productActions";

const EditProductForm = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDeletefromCloud, setImagesToDeletefromCloud] = useState([]);

  const { _id, images, ...rest } = productData;
  const { formData, handleOnChange } = useForm(rest);

  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.helper);

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);
    setNewImages(updatedImages);
  };

  const handleRemoveExistingImage = (index) => {
    const updatedImages = [...existingImages];
    setImagesToDeletefromCloud([
      ...imagesToDeletefromCloud,
      updatedImages[index],
    ]);
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };

  const handleCancelButton = () => {
    if (productData) {
      navigate(`/admin/view-product/${_id}`, {
        state: { product: productData },
      });
    }
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let formObject = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formObject.append(key, value)
    );
    Array.from(newImages).forEach((image) => {
      formObject.append("images", image);
    });
    Array.from(existingImages).forEach((image) => {
      formObject.append("existingImage", image);
    });
    Array.from(imagesToDeletefromCloud).forEach((image) => {
      formObject.append("imagesToDeletefromCloud", image);
    });
    // console.log(...formObject.entries());
    const action = await dispatch(editProductAction(formObject, _id));
    if (action?.status === "success") {
      navigate("/admin/products");
      toast.success(action.message);
      return;
    }
  };

  useEffect(() => {
    dispatch(getCategoriesAction());
    if (_id) {
      setExistingImages(images);
    }
  }, [_id]);
  return (
    <>
      <Container>
        {" "}
        <h3>
          <Badge bg="danger" className="m-auto">
            Add New product
          </Badge>
        </h3>
        <Row>
          <Alert>
            <Row className="d-flex align-items-center justify-content-center">
              <Col className="text-end fw-bold">Adding a new Category?</Col>
              <Col className="text-start">
                <Link to="/admin/categories">
                  <Button variant="outline-primary">Click here </Button>
                </Link>
              </Col>
            </Row>
          </Alert>
        </Row>
        <Form onSubmit={handleOnSubmit}>
          <Row>
            {newProductformFields?.map((field, index) => {
              const singleRow = index === 5;
              return (
                <Col key={index} xs={singleRow ? 12 : 6}>
                  <CustomInput
                    label={field.label}
                    handleOnChange={handleOnChange}
                    inputAttributes={{
                      type: field.type,
                      name: field.name,
                      value: formData[field.name],
                      required: field.required,
                      placeholder: field.placeholder,
                      multiple: field.multiple,
                      rows: 4,
                    }}
                    options={
                      field.options ||
                      categories.map((category) => ({
                        value: category.category,
                        label: category.category,
                      }))
                    }
                  />
                </Col>
              );
            })}
          </Row>
          <Row>
            <Row>
              <Form.Label className="fw-bold ms-1">
                Product Images * {newImages.length} files uploaded
              </Form.Label>

              <Form.Control
                type="file"
                name="image"
                multiple
                max={5}
                onChange={handleNewImagesChange}
                accept="image/png,image/jpeg, image/gif, image/webp"
                className="ms-3"
                required={existingImages < 1}
              />
            </Row>
            <Row className="p-2 ms-2">
              {newImages.length > 0 &&
                newImages.map((image, index) => (
                  <Col key={index}>
                    <div className="productFormCrossDiv">
                      <ImCross
                        size={15}
                        className="productFormCross"
                        onClick={() => handleRemoveImage(index)}
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
              {existingImages.length > 0 &&
                existingImages.map((image, index) => (
                  <Col key={index}>
                    <div className="productFormCrossDiv">
                      <ImCross
                        size={15}
                        className="productFormCross"
                        onClick={() => handleRemoveExistingImage(index)}
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
          <Stack direction="horizontal" gap={2} className="pt-4">
            <Button
              variant="outline-warning"
              className="w-100"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "Update"}
            </Button>

            <Button
              variant="outline-danger"
              className="w-100"
              onClick={handleCancelButton}
            >
              Cancel
            </Button>
          </Stack>
        </Form>
      </Container>
    </>
  );
};

export default EditProductForm;
