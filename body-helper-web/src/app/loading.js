import React from "react";
import { Container, Spinner } from "react-bootstrap";

const loading = () => {
  return (
    <Container className="loader">
      <div>
        <Spinner animation="border" role="status" variant="dark" />
      </div>
    </Container>
  );
};

export default loading;
