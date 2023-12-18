"use client";
import { Container } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container className="error">
      <div className="error-sticker">
        <h1>Error</h1>
        <h2>was occurred!</h2>
        <p>Something went wrong. Please try again.</p>
      </div>
    </Container>
  );
};

export default ErrorPage;
