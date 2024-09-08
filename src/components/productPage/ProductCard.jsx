import { useEffect } from "react";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();

  const handleViewProduct = (product) => {
    if (product) {
      navigate(`/admin/view-product/${product._id}`, {
        state: { product: product },
      });
    }
  };

  return (
    <>
      {products?.map((product) => (
        <Card
          style={{ width: "19rem", color: "white" }}
          className=" bg-dark ms-1 "
          key={product._id}
        >
          <Card.Img
            src={product.thumbnail[0]}
            alt="Card image"
            style={{ height: "17rem" }}
          />
          <Card.Body>
            <Card.Title className="fw-bold text-wrap">
              {product.name} &nbsp;
              {product.status === "active" ? (
                <Badge bg="success text-sm">Active</Badge>
              ) : (
                <Badge bg="danger">Inactive</Badge>
              )}
            </Card.Title>

            <Button
              variant="outline-primary"
              className="ms-5 text-white"
              onClick={() => handleViewProduct(product)}
            >
              View Product
            </Button>
          </Card.Body>
        </Card>
      ))}
    </>
  );
};

export default ProductCard;
