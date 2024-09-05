import React, { useState } from "react";
import "./categoryComponent.css";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddCategoryModal from "../../pages/categoryPage/AddCategoryModal";
import { deleteCategoryAction } from "../../redux/categoryRedux/categoryActions";

const CategoryCard = ({ categories }) => {
  const [modalShow, setModalShow] = useState(false);
  const [categoryToEdit, setIsCategoryToEdit] = useState({});

  const initialFormData = {
    category: categoryToEdit.category,
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnDelete = (id) => {
    if (
      window.confirm(
        "This deletes all your products within this category. \n Are you sure you want to continue?"
      )
    ) {
      dispatch(deleteCategoryAction(id));
    }
  };

  return (
    <>
      {categories.map((category) => (
        <Col xs={12} md={6} key={category._id}>
          <Alert key={category._id} className="categoryAlert text-center">
            <Row>
              <Col>
                <span className="fw-bold fs-3 text-wrap ">
                  {category.category}{" "}
                </span>{" "}
              </Col>
              <Col lg={6}>
                <Button
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
                >
                  <MdOutlineDelete />
                </Button>
              </Col>
            </Row>
          </Alert>

          {
            <AddCategoryModal
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
