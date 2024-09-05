import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { resetPassword } from "../../../axios/adminAxios";

const ResetPassword = () => {
  const initialFormData = {
    email: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setIsLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await resetPassword(formData);
    console.log(result);
    if (result?.status === "error") {
      toast.error(result.message);
      setIsLoading(false);
      return;
    }
    if (result?.status === "success") {
      toast.success(result.message);
      setFormData(initialFormData);
      setIsLoading(false);
      return;
    }

    toast.error("Something went wrong. Please try again later.");
    setIsLoading(false);
  };
  return (
    <>
      <Col className="resetPasswordCol2 d-flex flex-column justify-content-center align-items-center ">
        <Row>
          <RiLockPasswordFill size={80} />
        </Row>
        <Row className="my-3 fw-bold">
          Please enter your email to reset your password
        </Row>
        <Row>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              <Form.Label className="fw-bold"></Form.Label>
              <Form.Control
                placeholder="please enter your user email"
                className="w-100"
                name="email"
                value={formData.email}
                required={true}
                type="email"
                onChange={handleOnChange}
              />
            </Form.Group>

            <Button type="submit" className="mt-3 ms-4 w-75" disabled={loading}>
              {loading ? <Spinner animation="border" /> : "Reset Password"}
            </Button>
          </Form>
        </Row>
        <Row className="d-flex justify-content-center align-items-center mt-4 fw-bold">
          Have an account ?{" "}
          <Link
            to="/"
            className="d-flex justify-content-center align-items-center"
          >
            Login Now
          </Link>{" "}
        </Row>
      </Col>
    </>
  );
};

export default ResetPassword;
