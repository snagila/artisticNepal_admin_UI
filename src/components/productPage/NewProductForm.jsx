import React, { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import "./productPageComp.css";
import { Link, useNavigate } from "react-router-dom";
import { newProductformFields } from "./newProductFormFields";
import CustomInput from "../sharedComponents/CustomInput";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../redux/categoryRedux/categoryActions";
import { ImCross } from "react-icons/im";
import {
  createNewProductAction,
  editProductAction,
} from "../../redux/productRedux/productActions";
import { toast } from "react-toastify";

const NewProductForm = ({ initialFormData }) => {
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories } = useSelector((state) => state.category);
  const { isLoading } = useSelector((state) => state.helper);
  const { formData, handleOnChange } = useForm(initialFormData);

  const handleNewImagesChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "thumbnail") {
      const file = Array.from(e.target.files);

      setThumbnail(file);
    } else {
      const files = Array.from(e.target.files);
      setImages([...images, ...files]);
    }
  };

  const handleRemoveImage = (index, imageName) => {
    if (imageName === "thumbnail") {
      setThumbnail([]);
    } else {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // PROCESS FORM DATA TO SEND IMAGE FILE AS WELL IN XML

    let formObject = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formObject.append(key, value)
    );
    Array.from(images).forEach((image) => {
      formObject.append("images", image);
    });
    Array.from(thumbnail).forEach((image) => {
      formObject.append("thumbnail", image);
    });
    // console.log(...formObject.entries());
    const action = await dispatch(createNewProductAction(formObject));
    if (action?.status === "success") {
      navigate("/admin/products");
      toast.success(action.message);
      return;
    }
  };

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);
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

          {/* PRODUCT THUMBNAIL */}
          <Row>
            <Row>
              <Form.Label className="fw-bold ms-1">
                Thumbnail * {thumbnail.length} files uploaded
              </Form.Label>

              <Form.Control
                type="file"
                name="thumbnail"
                onChange={handleNewImagesChange}
                // accept="image/png,image/jpeg, image/gif, image/webp"
                className="ms-3"
                required
              />
            </Row>
            <Row className="p-2 ms-2">
              {thumbnail?.length > 0 &&
                thumbnail.map((image, index) => (
                  <Col key={index}>
                    <div className="productFormCrossDiv">
                      <ImCross
                        size={15}
                        className="productFormCross"
                        onClick={() => handleRemoveImage(index, "thumbnail")}
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

          {/* PRODUCT IMAGES */}
          <Row>
            <Row>
              <Form.Label className="fw-bold ms-1">
                Product Images * {images.length} files uploaded
              </Form.Label>

              <Form.Control
                type="file"
                name="image"
                multiple
                max={5}
                onChange={handleNewImagesChange}
                accept="image/png,image/jpeg, image/gif, image/webp"
                className="ms-3"
                required
              />
            </Row>
            <Row className="p-2 ms-2">
              {images.length > 0 &&
                images.map((image, index) => (
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
            </Row>
          </Row>
          <Stack direction="horizontal" gap={2} className="pt-4">
            <Button
              variant="outline-success"
              className="w-100"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : "Create"}
            </Button>

            <Link to="/admin/products" className="w-100">
              <Button variant="outline-danger" className="w-100">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Form>
      </Container>
    </>
  );
};

export default NewProductForm;
