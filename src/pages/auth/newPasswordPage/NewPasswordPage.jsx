import React, { useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { newPassword } from "../../../axios/adminAxios";

const NewPasswordPage = () => {
  const [loading, setIsLoading] = useState(false);
  const initialFormData = {
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const { password, confirmPassword } = formData;
  const [params] = useSearchParams();
  const userEmail = params.get("e");
  const token = params.get("id");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setIsLoading(false);
      return toast.error("Passwords do not match.");
    }
    const result = await newPassword({ password, token, userEmail });

    if (result?.status === "error") {
      setIsLoading(false);
      return toast.error(result.message);
    }

    if (result?.status === "success") {
      setIsLoading(false);
      setFormData(initialFormData);
      return toast.success(result.message);
    }

    toast.error("Something went wrong.Please try again later.");
    setIsLoading(false);
  };
  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group>
          <Form.Label className="fw-bold">Password:</Form.Label>
          <Form.Control
            placeholder="Enter  new password"
            className="w-100"
            name="password"
            value={formData.password}
            required={true}
            type="password"
            onChange={handleOnChange}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Label className="fw-bold ">Confirm Password:</Form.Label>
          <Form.Control
            placeholder="Confirm  new password"
            className="w-100"
            name="confirmPassword"
            value={formData.confirmPassword}
            required={true}
            type="password"
            onChange={handleOnChange}
          />
        </Form.Group>

        <Button type="submit" className="mt-3 ms-4 w-75" disabled={loading}>
          {loading ? <Spinner animation="grow" /> : "Reset Password"}
        </Button>
      </Form>
      <Link to="/" className="mt-1">
        Login Now
      </Link>
    </>
  );
};

export default NewPasswordPage;
