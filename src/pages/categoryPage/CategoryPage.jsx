import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { BsTag } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import AddCategoryModal from "./AddCategoryModal";
import { getCategoriesAction } from "../../redux/categoryRedux/categoryActions";
import CategoryCard from "../../components/category_Page/CategoryCard";

const initialFormData = {
  category: "",
};

const CategoryPage = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { categories } = useSelector((state) => state.category);

  const handleOnSearch = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    dispatch(getCategoriesAction());
  }, []);

  return (
    <>
      <Col className="p-2 gap-1">
        <Row className="g-5 d-flex justify-content-between">
          <Col xs={12} md={4}>
            <Button variant="success" onClick={() => setModalShow(true)}>
              + Create New Category <BsTag />
            </Button>
          </Col>
        </Row>
        {
          <AddCategoryModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            initialformdata={initialFormData}
          />
        }
        <Row className="mt-2 p-3">
          <CategoryCard categories={categories} />
        </Row>
      </Col>
    </>
  );
};

export default CategoryPage;
