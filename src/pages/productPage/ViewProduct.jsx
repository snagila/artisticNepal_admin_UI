import React from "react";
import "./productPageComp.css";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductActions } from "../../redux/productRedux/productActions";
import { toast } from "react-toastify";

const ViewProduct = () => {
  const { isLoading } = useSelector((state) => state.helper);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = location;
  const product = state?.product;

  const handleOnDelete = async (product) => {
    const result = await dispatch(deleteProductActions(product));
    if (result?.status === "success") {
      navigate("/admin/products");
      toast.success("Product Successfully Deleted.");
    }
  };
  return (
    <>
      <Container>
        <Row>
          {product?.images.map((image, i) => (
            <Col xs={6} md={4} key={i} className="viewProductImages">
              <Image src={image} thumbnail />
            </Col>
          ))}
        </Row>
        <Link to={`/admin/edit-product/${product._id}`}>
          <Button>Edit</Button>
        </Link>

        <Button
          variant="danger"
          onClick={() => handleOnDelete(product)}
          disabled={isLoading}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "Delete"}
        </Button>
      </Container>
    </>
  );
};

export default ViewProduct;
