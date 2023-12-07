"use client";
import Link from "next/link";
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";

const AdminScreen = () => {
  const sidebarItems = [
    { title: "Create articles", path: "/admin/articles/create" },
    { title: "Create recipe", path: "/admin/recipes/create" },
  ];
  return (
    <>
      <Container>
        <Row>
          <Col md={4}>
            <Card style={{ width: "16rem" }}>
              <ListGroup>
                {sidebarItems.map((item, index) => (
                  <ListGroup.Item key={index + 1}>
                    <Link href={item.path}>{item.title}</Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
          <Col md={8}></Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminScreen;
