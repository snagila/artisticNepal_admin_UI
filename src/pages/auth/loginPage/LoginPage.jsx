import React from "react";
import { Button } from "react-bootstrap";
import LoginForm from "../../../components/authPage/login_Page/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const initialFormData = {
    email: "",
    password: "",
  };
  return (
    <>
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
