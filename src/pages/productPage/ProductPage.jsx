import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsTag } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProductCard from "../../components/productPage/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../../redux/productRedux/productActions";

const ProductPage = () => {
  const { products } = useSelector((state) => state.product);
  console.log(products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAction());
  }, []);
  return (
    <>
      <Container>
        <Row className="gap-4">
          <Row className="d-flex justify-content-between gap-2">
            <Col md={6} className="d-flex gap-2">
              <Form.Control
                type="text"
                placeholder="Search Products"
                className="text-center"
              />
              <Button>Search</Button>
            </Col>
            <Col xs={12} md={4}>
              <Link to="/admin/new-product">
                <Button variant="success" className="btn-md w-100 ">
                  + Create New Product <BsTag />
                </Button>
              </Link>
            </Col>
          </Row>

          <Row className="gap-2 ms-1">
            <ProductCard products={products} />
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default ProductPage;
