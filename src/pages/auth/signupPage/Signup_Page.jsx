import React from "react";
import SignUp_Form from "../../../components/authPage/SignUp_Page/SignUp_Form";
import { Link } from "react-router-dom";

const initialFormData = {
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup_Page = () => {
  return (
    <>
      <div
        className="d-flex
       align-items-center justify-content-center flex-column"
      >
        <SignUp_Form initialFormData={initialFormData} />
        <div className=" mt-2">
          Already a user? &nbsp;{" "}
          <Link to={"/"}>
            <span className="fw-bold">Login Now</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup_Page;
