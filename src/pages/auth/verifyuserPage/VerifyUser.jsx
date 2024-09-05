import React, { useEffect, useState } from "react";
import { Col, Row, Spinner, Stack } from "react-bootstrap";
import { MdVerifiedUser } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { verifyUser } from "../../../axios/adminAxios";
import { toast } from "react-toastify";

const VerifyUser = () => {
  const [emailVerifying, setIsEmailVerifying] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [params] = useSearchParams();
  const userEmail = params.get("e");
  const sessionToken = params.get("id");

  const verifyUserEmail = async () => {
    const result = await verifyUser({ userEmail, sessionToken });
    setIsEmailVerifying(false);

    // if user is not verified
    if (result.status === "error") {
      toast.error(result.message);
      //   navigate("/signup");
      return;
    }
    setEmailVerified(true);
  };

  useEffect(() => {
    verifyUserEmail();
  }, [userEmail]);
  return (
    <>
      {emailVerifying && (
        <Row className="vh-100 loginRow">
          <Col className=" d-flex justify-content-center align-items-center">
            <Stack
              gap={4}
              className="vh-100 justify-content-center align-items-center"
            >
              <Spinner animation="border" variant="primary" role="status" />
              <p>Verifying email, Please Wait...</p>
            </Stack>
          </Col>
        </Row>
      )}
      {emailVerified && (
        <Row className="vh-100 loginRow">
          <Col className=" d-flex justify-content-center align-items-center">
            <Stack
              gap={2}
              className="vh-100 justify-content-center align-items-center"
            >
              <div className="my-4">
                <MdVerifiedUser size={100} />
              </div>

              <p>Email successfully verified, You can login now.</p>

              <Link to="/" className="btn btn-lg btn-outline-primary">
                Login Now
              </Link>
            </Stack>
          </Col>
        </Row>
      )}
    </>
  );
};

export default VerifyUser;
