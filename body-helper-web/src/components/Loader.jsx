import { Container, Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Container className="loader">
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "100px",
          height: "100px",
          margin: "auto",
          display: "block",
        }}
      />
    </Container>
  );
};

export default Loader;
