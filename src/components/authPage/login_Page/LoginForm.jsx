import React, { useEffect, useState } from "react";
import { Badge, Button, Form, Spinner } from "react-bootstrap";
import CustomInput from "../../sharedComponents/CustomInput";
import { loginFormFields } from "./loginFormFields";
import useForm from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../axios/adminAxios";
import { toast } from "react-toastify";
import {
  autoLoginAction,
  getAdminAction,
} from "../../../redux/adminRedux/adminActions";

const LoginForm = ({ initialFormData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, handleOnChange } = useForm(initialFormData);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await loginAdmin(formData);
    console.log(result);
    if (result.status === "error") {
      setIsLoading(false);
      return toast.error(result.message);
    }

    if (result.status === "success") {
      sessionStorage.setItem("accessJWT", result.data.accessJWT);
      localStorage.setItem("refreshJWT", result.data.refreshJWT);

      dispatch(getAdminAction());
      setIsLoading(false);
      return;
    }
    toast.error("Something went wrong.Please try again later.");
    setIsLoading(false);
  };

  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAdminAction());
    // if user exists [logged in], navigate to admin homepage
    if (admin?._id) {
      dispatch(getAdminAction());
      navigate("/admin/dashboard");
      return;
    }

    // if not try auto login
    // if (!admin._id) {
    //   dispatch(autoLoginAction());
    // }
  }, [admin?._id]);
  return (
    <>
      <Form className="loginCol-2" onSubmit={handleOnSubmit}>
        <h2 className=" mb-4">
          <Badge bg="danger">ADMIN Login</Badge>
        </h2>
        <hr />
        {loginFormFields.map((field, index) => (
          <CustomInput
            key={index}
            label={field.label}
            handleOnChange={handleOnChange}
            inputAttributes={{
              type: field.type,
              name: field.name,
              value: formData[field.name],
              placeholder: field.placeholder,
              required: Form.required,
            }}
          />
        ))}

        <Button variant="primary" className="btn-lg w-100" type="submit">
          {isLoading ? <Spinner animation="border" /> : "Login"}
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
