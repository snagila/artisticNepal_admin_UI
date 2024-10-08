import React, { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import UserModal from "./UserModal";
import { useDispatch } from "react-redux";
import { deleteUserAction } from "../../redux/userRedux/userActions";

const AllUsers = ({ allUser }) => {
  const dispatch = useDispatch();
  const [viewUserDetails, setViewUserDetails] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOnDelete = (userId) => {
    if (window.confirm("This action will delete user. Are you sure?")) {
      const result = dispatch(deleteUserAction(userId));
    }
  };

  const [formData, setFormData] = useState("");
  const handleSearch = (e) => {
    setFormData(e.target.value);
  };

  const displayUser =
    allUser.filter(
      (user) =>
        //  console.log(user)
        user.firstName.toLowerCase().includes(formData.toLowerCase()) ||
        user.lastName.toLowerCase().includes(formData.toLowerCase()) ||
        user.email.toLowerCase().includes(formData.toLowerCase()) ||
        user.phone.includes(formData)
    ) || allUser;

  return (
    <>
      <Form.Control
        placeholder="enter user"
        onChange={handleSearch}
        value={formData}
      />
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User E-mail</th>
              <th className="text-center">User Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUser.map((individual, i) => (
              <tr key={i}>
                <td className="text-center">{i + 1}</td>
                <td>{individual.firstName}</td>
                <td>{individual.lastName}</td>
                <td>{individual.email}</td>
                <td className="text-center">
                  <Button
                    className=""
                    size="sm"
                    variant="outline-success"
                    onClick={() => {
                      handleShow(), setViewUserDetails(individual);
                    }}
                  >
                    {" "}
                    View{" "}
                  </Button>{" "}
                  <Button
                    className=""
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleOnDelete(individual._id)}
                  >
                    {" "}
                    Delete{" "}
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <UserModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        individual={viewUserDetails}
      />
    </>
  );
};

export default AllUsers;
