import React, { useEffect } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import {
  FaShoppingCart,
  FaDollarSign,
  FaUsers,
  FaBox,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import "./Dashboard.css";

// Chart.js config
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { getOrdersActions } from "../../redux/orderRedux/orderAction";
import { getAllUserAction } from "../../redux/userRedux/userActions";
import { getProductsAction } from "../../redux/productRedux/productActions";
// import { deleteOrderAction } from "../../redux/order/orderAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler
);

const Dashboard = () => {
  const { users } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const chartColors = {
    purple: "rgba(102, 16, 242, 0.8)",
    purpleFill: "rgba(102, 16, 242, 0.2)",
    green: "rgba(28, 200, 138, 0.8)",
    greenFill: "rgba(28, 200, 138, 0.2)",
  };

  // Sales Over the Past 7 Days
  const salesByDay = new Array(7).fill(0);

  orders.forEach((order) => {
    const day = new Date(order.updatedAt).getDay();
    salesByDay[day] += order.orderTotal;
  });

  const salesData = {
    labels: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    datasets: [
      {
        label: "Sales ($)",
        data: salesByDay,
        fill: true,
        backgroundColor: chartColors.purpleFill,
        borderColor: chartColors.purple,
        tension: 0.3,
      },
    ],
  };

  const handleDelete = (order) => {
    dispatch(deleteOrderAction(order));
  };

  // Get the latest 5 orders
  const latestOrders = orders.slice(-5).reverse();

  useEffect(() => {
    dispatch(getOrdersActions());
    dispatch(getAllUserAction());
    dispatch(getProductsAction());
  }, []);
  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/orders">
              <Card.Body>
                <FaShoppingCart
                  size={50}
                  className="dashboard-icon"
                  color="#4e73df"
                />
                <Card.Title>
                  <CountUp end={orders.length} duration={2} />
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/sales">
              <Card.Body>
                <FaDollarSign
                  size={50}
                  className="dashboard-icon"
                  color="#1cc88a"
                />
                <Card.Title>
                  <CountUp
                    end={salesByDay.reduce((acc, curr) => acc + curr, 0)}
                    duration={2}
                    separator=","
                    prefix="$"
                  />{" "}
                  Sales
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/users">
              <Card.Body>
                <FaUsers size={50} className="dashboard-icon" color="#36b9cc" />
                <Card.Title>
                  <CountUp end={users.length} duration={2} /> Users
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card">
            <Link className="dashboard-link" to="/admin/products">
              <Card.Body>
                <FaBox size={50} className="dashboard-icon" color="#f6c23e" />
                <Card.Title>
                  <CountUp end={products.length} duration={2} /> Products
                </Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card className="dashboard-card">
            <Card.Body>
              <h6>Sales Over the Past 7 Days</h6>
              <Line data={salesData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="dashboard-card">
            <Card.Header>
              Recent Orders
              <Link to="/admin/orders" style={{ float: "right" }}>
                <Button variant="primary">Show All</Button>
              </Link>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order Id</th>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Amount</th>
                    <th>Placed Date</th>
                    <th>Delivery Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {latestOrders.map((order, index) => {
                    // Find the user matching the order's userId
                    const user = users.find(
                      (user) => user._id === order.userId
                    );
                    const customerName = user
                      ? `${user.firstName} ${user.lastName}`
                      : "Unknown User";

                    return (
                      <tr key={order._id}>
                        <td>{index + 1}</td>
                        <td>{order._id}</td>
                        <td>{customerName}</td>
                        <td>
                          {order.orderItems
                            .map((p) => ` ${p.name} (${p.quantity})`)
                            .join(", ")}
                        </td>
                        <td>${order.orderTotal}</td>
                        <td>
                          {new Date(order.updatedAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "confirmed"
                                ? "bg-primary"
                                : order.status === "pending"
                                ? "bg-info"
                                : "bg-warning"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <FaTrash
                            color="red"
                            style={{ cursor: "pointer", marginLeft: 10 }}
                            onClick={() => handleDelete(order)}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
