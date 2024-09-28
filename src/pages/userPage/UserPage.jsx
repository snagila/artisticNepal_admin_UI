import React, { useEffect } from "react";
import { getAllUserAction } from "../../redux/userRedux/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Container, Tab, Tabs } from "react-bootstrap";
import AllUsers from "../../components/userPage/AllUsers";

const UserPage = () => {
  useEffect(() => {
    dispatch(getAllUserAction());
  }, []);

  const { users } = useSelector((state) => state.user);

  const userUser = users?.filter((user) => user.role === "user");

  const adminUser = users?.filter((user) => user.role === "admin");

  const dispatch = useDispatch();

  return (
    <>
      <Container fluid>
        <Tabs
          defaultActiveKey="user"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="user" title="User">
            <AllUsers allUser={userUser} />
          </Tab>
          <Tab eventKey="admin" title="Admin">
            <AllUsers allUser={adminUser} />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default UserPage;
