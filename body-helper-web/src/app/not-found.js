import Image from "next/image";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="not-found">
      <div className="not-found-sticker">
        <h1>404</h1>
        <h2> Not Found</h2>
        <p>Unfortunately, we could not find the requested page or resources</p>
      </div>
    </Container>
  );
};

export default NotFound;
