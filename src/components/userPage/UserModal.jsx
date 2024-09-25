import { useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useForm from "../../hooks/useForm";
import CustomInput from "../sharedComponents/CustomInput";
import { userPageUserFormFields } from "./userPageUserFormFields";
import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "../../redux/userRedux/userActions";

const UserModal = ({ show, handleClose, individual }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const { isLoading } = useSelector((state) => state.helper);

  const initialFormData = {
    _id: individual._id,
    firstName: individual.firstName,
    lastName: individual.lastName,
    address: individual.address,
    phone: individual.phone,
    isVerified: individual.isVerified,
    createdAt: individual.createdAt,
    email: individual.email,
  };
  const { formData, setFormData, handleOnChange } = useForm(initialFormData);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    handleClose();
    setEdit(false);
    dispatch(editUserAction(formData));
  };

  useEffect(() => {
    if (individual._id) {
      setFormData(initialFormData);
      setEdit(false);
    }
  }, [individual._id]);
  return (
    <>
      {
        <Modal
          show={show}
          onHide={() => {
            setEdit(false), handleClose();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleOnSubmit}>
            {" "}
            <Modal.Body>
              {userPageUserFormFields.map((field, i) => (
                <CustomInput
                  key={i}
                  handleOnChange={edit ? handleOnChange : undefined}
                  label={field.label}
                  inputAttributes={{
                    name: field.name,
                    type: field.type,
                    placeholder: field.placeholder,
                    required: field.required,
                    value: formData[field.name],
                    disabled: field.disabled || edit === false,
                  }}
                />
              ))}
            </Modal.Body>
            <Modal.Footer>
              {edit && (
                <Button variant="danger" onClick={() => setEdit(false)}>
                  Cancel
                </Button>
              )}
              {!edit && (
                <Button variant="warning" onClick={() => setEdit(true)}>
                  Edit
                </Button>
              )}

              {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
              {edit && (
                <Button variant="primary" type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : " Save Changes"}
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      }
    </>
  );
};

export default UserModal;
