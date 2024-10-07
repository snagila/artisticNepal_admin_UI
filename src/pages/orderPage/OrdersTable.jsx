import React, { useState } from "react";
import { Table, Badge, Button, Form, Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaEdit, FaTrash, FaShippingFast } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const OrdersTable = () => {
  const { orders } = useSelector((state) => state.order);
  const { users } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders =
    orders.filter(
      (order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        users
          .find((user) => user._id === order.userId)
          ?.firstName.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        users
          .find((user) => user._id === order.userId)
          ?.lastName.toLowerCase()
          .includes(searchTerm.toLowerCase())
    ) || orders;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Form.Control
        type="text"
        placeholder="Search by user or order ID"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-3"
      />
      <Tabs defaultActiveKey="all" id="order-tabs">
        <Tab eventKey="all" title="All Orders">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Product Name(s)</th>
                  <th>User Name</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={order.orderId}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td>
                      {order.orderItems.map((product, idx) => (
                        <div key={idx}>
                          {product.name} (Qty: {product.quantity})
                        </div>
                      ))}
                    </td>
                    <td>
                      {
                        users.find((user) => user._id === order.userId)
                          ?.firstName
                      }{" "}
                      {
                        users.find((user) => user._id === order.userId)
                          ?.lastName
                      }
                    </td>
                    <td>{order.address}</td>
                    <td>{new Date(order.updatedAt).toLocaleDateString()}</td>
                    <td>$ {order.orderTotal}</td>
                    <td>
                      <Badge
                        bg={
                          order.status === "completed"
                            ? "success"
                            : order.status === "pending"
                            ? "warning"
                            : order.status === "shipped"
                            ? "info"
                            : "danger"
                        }
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </Badge>
                    </td>
                    <td>
                      {order.status === "pending" && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(order)}
                        >
                          <FaShippingFast />
                        </Button>
                      )}
                      {order.status === "shipped" && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleApprove(order)}
                        >
                          <IoMdCheckmark />
                        </Button>
                      )}
                      {order.status === "pending" && (
                        <Button
                          variant="warning"
                          size="sm"
                          className="mx-1"
                          onClick={() => handleEdit(order)}
                        >
                          <FaEdit />
                        </Button>
                      )}
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(order)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <div className="text-center mt-4 fw-bold text-danger">
            Next project Handling Shipping
          </div>
        </Tab>
        <Tab eventKey="pending" title="Pending">
          <div className="text-center mt-4 fw-bold text-danger">
            Next project Handling Shipping
          </div>
        </Tab>
        <Tab eventKey="shipped" title="Shipped">
          <div className="text-center mt-4 fw-bold text-danger">
            Next project Handling Shipping
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default OrdersTable;
