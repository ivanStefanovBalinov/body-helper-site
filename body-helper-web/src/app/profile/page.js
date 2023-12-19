import Image from "next/image";
import React from "react";
import { Container, Row } from "react-bootstrap";

const userInfo = {
  name: "John Doe",
  image: undefined,
  height: 187,
  weight: 100,
  targetWeight: 90,
  dailyCalories: 1900,
};

const ProfileScreen = () => {
  return (
    <Container>
      <Row>
        <div>
          <Image />
        </div>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
