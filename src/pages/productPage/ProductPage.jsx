import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsTag } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productPage/ProductCard";
import { useSelector } from "react-redux";

const ProductPage = () => {
  const [formData, setFormData] = useState("");
  const { products } = useSelector((state) => state.product);

  const handleSearch = (e) => {
    setFormData(e.target.value);
  };

  const displayProduct =
    products.filter(
      (product) =>
        product.name.toLowerCase().includes(formData.toLowerCase()) ||
        product.sku.toLowerCase().includes(formData.toLowerCase())
    ) || products;

  return (
    <>
      <Container>
        <Row className="gap-4">
          <Row className="d-flex justify-content-between gap-2">
            <Col md={6} className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Search Products by name/sku"
                className="text-center"
                value={formData}
                onChange={handleSearch}
              />
              <Button>Search</Button>
            </Col>
            <Col xs={12} md={4}>
              <Link to="/admin/new-product">
                <Button variant="success" className="btn-md w-100 ">
                  + New Product <BsTag />
                </Button>
              </Link>
            </Col>
          </Row>

          <Row
            // className="gap-2 ms-1"
            className="d-flex align-items-center justify-content-evenly gap-4"
          >
            <ProductCard products={displayProduct} />
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
