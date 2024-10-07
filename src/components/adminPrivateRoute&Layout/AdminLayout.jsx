import React, { useState } from "react";
import "./adminPageLayout.css";
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import {
  BsBoxSeam,
  BsCart,
  BsPerson,
  BsPersonCheck,
  BsTag,
  BsTags,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { logoutAdminAction } from "../../redux/adminRedux/adminActions";

const AdminLayout = () => {
  const { admin } = useSelector((state) => state.admin);
  const { firstName, lastName, email } = admin;
  const dispatch = useDispatch();

  const [activeItem, setActiveItem] = useState("Dashboard");

  const handleLogout = () => {
    dispatch(logoutAdminAction(email));
  };

  return (
    <>
      <>
        <Row>
          <Col xs={4} md={3}>
            <div
              className="AdminLayoutCol1 shadow"
              style={{ minHeight: "100vh" }}
            >
              <Stack className=" p-2">
                <Card>
                  {/* logo and header part */}
                  <Card.Header className="text-center fw-bold">
                    <BsPersonCheck size={70} />
                  </Card.Header>
                  <Card.Body className="fw-bold text-center">
                    {firstName + " " + lastName}
                  </Card.Body>
                </Card>

                {/* Menu Items */}
                <Stack className="my-4 ">
                  <SidebarItem
                    icon={<BsBoxSeam />}
                    label="Dashboard"
                    path="/admin/dashboard"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  />
                  <SidebarItem
                    icon={<BsTag />}
                    label="Category"
                    path="/admin/categories"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  />
                  <SidebarItem
                    icon={<BsTags />}
                    label="Product"
                    path="/admin/products"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  />
                  <SidebarItem
                    icon={<BsCart />}
                    label="Order"
                    path="/admin/orders"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  />
                  <SidebarItem
                    icon={<BsPerson />}
                    label="User"
                    path="/admin/users"
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                  />
                </Stack>

                <Button
                  variant="outline-danger"
                  className="w-100 mt-auto"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Stack>
            </div>
          </Col>

          {/* this is the multipage content side */}
          <Col className="AdminLayoutCol2  p-2 " xs={8} md={9}>
            <Outlet />
          </Col>
        </Row>
      </>
    </>
  );
};

export default AdminLayout;
