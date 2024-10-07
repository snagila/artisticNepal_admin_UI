import { Badge, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

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
        <Col md={5} lg={3}>
          <Card
            key={product._id}
            className="position-relative bg-dark"
            style={{ color: "whitesmoke" }}
          >
            <Card.Img
              src={product.thumbnail[0]}
              alt="Card image"
              style={{ height: "17rem" }}
            />
            {/* active status */}
            <span
              className={`badge ${
                product.status === "active" ? "bg-success" : "bg-danger"
              } position-absolute`}
              style={{ top: "10px", right: "10px" }}
            >
              {product.status === "active" ? "Active" : "Inactive"}
            </span>

            {/* sale status */}
            <span
              className={`badge bg-danger
               position-absolute`}
              style={{ top: "35px", right: "10px" }}
            >
              {product.salesPrice && "On Sale"}
            </span>
            <Card.Body>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div>
                  <Card.Title className=" ">{product.name}</Card.Title>
                </div>
                <div>
                  {" "}
                  <Button
                    variant="outline-primary"
                    className="w-100 "
                    onClick={() => handleViewProduct(product)}
                    size="sm"
                  >
                    View Product
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default ProductCard;
