import React from "react";
import "./authLayout.css";
import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <Row id="authlayoutRow" className="g-1 ">
        <Col className="authlayoutCol1 " sm={4}>
          <div id="authlayoutCol1title1"> ARTISTIC </div>
          <div id="authlayoutCol1title2"> NEPAL</div>
        </Col>

        <Col
          id="authlayoutCol2"
          className="d-flex
       align-items-center justify-content-center flex-column"
        >
          <Outlet />
        </Col>
      </Row>
    </>
  );
};

export default AuthLayout;
