import React, { useEffect, useState } from "react";
import "./productPageComp.css";
import {
  Badge,
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductActions } from "../../redux/productRedux/productActions";
import { toast } from "react-toastify";
import ViewProductSwiper from "../../components/productPage/ViewProduct_Page/ViewProductSwiper";
import { format } from "date-fns";

const ViewProduct = () => {
  const { isLoading } = useSelector((state) => state.helper);
  const [productPicDisplay, setProductPicDisplay] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = location;
  const product = state?.product;

  const handleOnDelete = async (product) => {
    if (
      window.confirm(
        "This action is irreversible.  \n Do you want to continue."
      )
    ) {
      const result = await dispatch(deleteProductActions(product));
      if (result?.status === "success") {
        navigate("/admin/products");
        toast.success("Product Successfully Deleted.");
        return;
      }
    }
  };

  const allImages = product.thumbnail
    ?.map((picture) => picture)
    .concat(product.images?.map((images) => images));

  useEffect(() => {
    if (product?.thumbnail) {
      setProductPicDisplay(product.thumbnail?.map((picture) => picture));
      setProductDescription(product.description?.slice(0, 400));
    }
  }, [product]);

  return (
    <>
      <Link to={"/admin/products"}>
        <Button className="ms-2">Go Back</Button>
      </Link>

      <Container className="pt-5">
        <Row className="productPageRow1">
          <Col className=" productPageCol1" xs={12} md={1}>
            <Col xs={12} className="sidePicturesDiv">
              {allImages?.map((image, index) => (
                <Col key={index} className="mb-1">
                  <img
                    src={image}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    onClick={() => {
                      setProductPicDisplay(image);
                    }}
                  />
                </Col>
              ))}
            </Col>
          </Col>

          <Col className="mainProductImageCol position-relative" xs={12} md={6}>
            <Image
              src={productPicDisplay}
              style={{ height: "100%", width: "100%" }}
            />
            {/* On Sale Badge */}
            {product.salesPrice && (
              <Badge
                className="bg-danger position-absolute top-0 end-0 p-2 me-3 mt-1"
                style={{ zIndex: 1 }}
              >
                {(
                  ((product.price - product.salesPrice) / product.price) *
                  100
                ).toFixed(2)}
                % off
              </Badge>
            )}
          </Col>

          <Col className="productDescriptionCol " xs={12} md={5}>
            <Row className="gap-2 p-2">
              <div className="productName-row">
                <h3 className="p-0">
                  {product.name}{" "}
                  {product.status === "active" ? (
                    <Badge bg="success">Active</Badge>
                  ) : (
                    <Badge bg="danger">InActive</Badge>
                  )}
                </h3>
              </div>
              <div className="fw-bold fs-4 " style={{ color: "#696969" }}>
                <div>
                  ${" "}
                  <span
                    className={
                      product.salesPrice ? "text-decoration-line-through" : ""
                    }
                  >
                    {product.price}
                  </span>
                  <span className="text-danger"> {product.salesPrice}</span>
                </div>
              </div>

              {/* product Category */}
              <div>
                <span className="fw-bold"> Item Category:</span> &nbsp;
                <span className="text-info">{product.category}</span>{" "}
              </div>

              {/* product SKU */}
              <div>
                <span className="fw-bold"> Item SKU:</span> &nbsp;
                <span>{product.sku}</span>{" "}
              </div>

              {/* sales start date */}
              <div>
                <span className="fw-bold">Sales Start Date:</span> &nbsp;
                <span>
                  {format(new Date(product?.salesStartDate), "yyyy-MM-dd", "")}
                </span>{" "}
              </div>

              {/* sales end date */}
              <div>
                <span className="fw-bold">Sales End Date:</span> &nbsp;
                <span>
                  {format(new Date(product?.salesEndDate), "yyyy-MM-dd", "")}
                </span>{" "}
              </div>

              {/* quantity */}
              <div>
                <span className="fw-bold"> Item Quantity:</span> &nbsp;
                <span>{product.quantity}</span>{" "}
              </div>
              <div>
                <Link to={`/admin/edit-product/${product._id}`}>
                  <Button className="w-75  " variant="outline-warning">
                    Edit
                  </Button>
                </Link>

                <Button
                  variant="outline-danger"
                  size="md"
                  className="w-75 mt-2"
                  onClick={() => handleOnDelete(product)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Delete"
                  )}
                </Button>
              </div>
            </Row>
          </Col>
        </Row>

        <Row className=" productDescriptionRow">
          <span className="">Description:</span>
          <span>
            {productDescription}
            {productDescription?.length > 400 ? (
              <button
                className="product-readmore-button"
                onClick={() =>
                  setProductDescription(product?.description.slice(0, 400))
                }
              >
                Read Less..
              </button>
            ) : (
              <button
                className="product-readmore-button"
                onClick={() => setProductDescription(product.description)}
              >
                Read More..
              </button>
            )}
          </span>
        </Row>
      </Container>
    </>
  );
};

export default ViewProduct;
