import React, { useState } from "react";
import "./categoryComponent.css";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "../../pages/categoryPage/AddCategoryModal";
import { deleteCategoryAction } from "../../redux/categoryRedux/categoryActions";
import EditCategoryModal from "../../pages/categoryPage/EditCategoryModal";
import { toast } from "react-toastify";

const CategoryCard = ({ categories }) => {
  const [modalShow, setModalShow] = useState(false);
  const [categoryToEdit, setIsCategoryToEdit] = useState({});

  const initialFormData = {
    _id: categoryToEdit._id,
    category: categoryToEdit.category,
    categoryThumbnail: categoryToEdit.categoryThumbnail?.map(
      (imageUrl) => imageUrl
    ),
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnDelete = (id) => {
    if (
      window.confirm(
        "This deletes all your products within this category. \n Are you sure you want to continue?"
      )
    ) {
      toast.error(
        "Sorry! please try deleting product instead. As this will remove all the products of this category."
      );
      // dispatch(deleteCategoryAction(id));
    }
  };

  return (
    <>
      {categories.map((category) => (
        <Col
          md={4}
          lg={3}
          key={category._id}
          className="d-flex align-items-center justify-content-center mt-2 "
        >
          <Card style={{ width: "15rem" }} className=" ">
            <Card.Img
              variant="top"
              src={category.categoryThumbnail}
              style={{ height: "10rem" }}
            />
            <Card.Body>
              <Card.Title className="text-center fw-bold">
                {category.category}
              </Card.Title>

              <Row
                md={6}
                className="gap-1 d-flex align-items-center justify-content-center"
              >
                <Button
                  className=" d-flex align-items-center justify-content-center"
                  variant="outline-warning"
                  onClick={() => {
                    setIsCategoryToEdit(category);
                    setModalShow(true);
                  }}
                >
                  <MdOutlineEdit />
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  onClick={() => handleOnDelete(category._id)}
                  className=" d-flex align-items-center justify-content-center"
                >
                  <MdOutlineDelete />
                </Button>
              </Row>
            </Card.Body>
          </Card>

          {
            <EditCategoryModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              initialformdata={initialFormData}
              categorytoedit={categoryToEdit}
            />
          }
        </Col>
      ))}
    </>
  );
};

export default CategoryCard;
