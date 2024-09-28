import React from "react";
import { Container, Tab, Tabs } from "react-bootstrap";

const OrderPage = () => {
  return (
    <>
      <Container fluid>
        <Tabs
          defaultActiveKey="new"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="new" title="New Order">
            Tab content for Home
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Tab content for Profile
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Tab content for Contact
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default OrderPage;
