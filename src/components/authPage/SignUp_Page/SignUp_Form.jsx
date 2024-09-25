import React, { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { signupFormFields } from "./signupformFields";
import CustomInput from "../../sharedComponents/CustomInput";
import useForm from "../../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signUpAdmin } from "../../../axios/adminAxios";
import { setIsLoading } from "../../../redux/helperRedux.js/helperSlice";

const SignUp_Form = ({ initialFormData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [message, setMessage] = useState("");

  const { formData, setFormData, handleOnChange } = useForm(initialFormData);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { confirmPassword, password, ...rest } = formData;
    if (confirmPassword !== password) {
      return toast.error("Passwords do not match.");
    }
    const result = await signUpAdmin({ password, ...rest });

    if (result?.status === "error") {
      setIsLoading(false);
      setMessage(result.message);
      setErrorAlert(true);
      // setFormData(initialFormData);
      return;
    }

    if (result?.status === "success") {
      // setFormData(initialFormData);
      setIsLoading(false);
      setMessage(result.message);
      setSuccessAlert(true);

      return;
    }
    setIsLoading(false);
    toast.error("Something went wrong. Please try again later.");
  };

  return (
    <>
      <Container>
        {" "}
        <Form className="p-2" onSubmit={handleOnSubmit}>
          <h2 className=" mb-4">
            <Badge bg="danger">ADMIN SignUp</Badge>
          </h2>
          {successAlert && (
            <Alert variant="success" className="mt-2">
              {message}
            </Alert>
          )}
          {errorAlert && (
            <Alert variant="danger" className="mt-2">
              {message}
            </Alert>
          )}
          <Row>
            {signupFormFields.map((field, index) => (
              <Col key={index} xs={index === 0 || index === 1 ? 6 : 12}>
                <CustomInput
                  handleOnChange={handleOnChange}
                  label={field.label}
                  inputAttributes={{
                    name: field.name,
                    type: field.type,
                    placeholder: field.placeholder,
                    required: field.required,
                    value: formData[field.name],
                  }}
                />
              </Col>
            ))}
          </Row>
          <Button className="w-100" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner animation="grow" /> : "Submit"}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default SignUp_Form;
