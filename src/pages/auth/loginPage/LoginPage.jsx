import React from "react";
import { Alert, Button, Container } from "react-bootstrap";
import LoginForm from "../../../components/authPage/login_Page/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const initialFormData = {
    email: "",
    password: "",
  };
  return (
    <>
      <Alert>
        This project is deployed using free hosting services, which allowed me
        to explore and implement various technologies without incurring costs.
        Please be patient.
      </Alert>
      <Alert variant="danger">
        Great amount of time have been spent adding datas please do not abuse
        it.
      </Alert>
      <Alert variant="info">The placeholder is login details.</Alert>
      <div>
        <LoginForm initialFormData={initialFormData} />
        <div className="pt-4">
          Forgot Password? <Link to="reset-password">Reset Password</Link>
        </div>
        <div>
          Don't have an account ? <Link to="/signup">Signup Now</Link>{" "}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
