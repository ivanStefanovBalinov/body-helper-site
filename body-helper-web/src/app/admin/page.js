import AdminTabs from "@/components/Admin/AdminTabs";
import Link from "next/link";
import { Card, Col, Container, Row } from "react-bootstrap";

const AdminPage = async () => {
  const sidebarItems = [
    { title: "Create articles", path: "/admin/articles/create" },
    { title: "Create recipe", path: "/admin/recipes/create" },
  ];

  return (
    <>
      <Container>
        <Row className="py-3">
          <Col md={3}>
            <Card style={{ width: "16rem" }}>
              <ul className="list-group">
                {sidebarItems.map((item, index) => (
                  <li className="list-group-item " key={index + 1}>
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col md={9}>
            <AdminTabs />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;
