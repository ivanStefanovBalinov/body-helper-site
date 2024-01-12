import AdminTabs from "@/screens/Admin/AdminTabs";
import Link from "next/link";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { getAllArticles } from "../../../lib/articles";
import { notFound } from "next/navigation";
import { MdDelete, MdEdit } from "react-icons/md";

const AdminPage = async () => {
  const sidebarItems = [
    { title: "Create articles", path: "/admin/articles/create" },
    { title: "Create recipe", path: "/admin/recipes/create" },
  ];

  const articles = await getAllArticles();

  if (!articles) {
    notFound();
  }

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
            <AdminTabs articlesData={[]} recipesData={[]} usersData={[]} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;
