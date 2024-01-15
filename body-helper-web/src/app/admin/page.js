"use client";
import AdminTabs from "@/components/Admin/AdminTabs";
import Loader from "@/components/Loader";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const AdminPage = () => {
  const [isSession, setIsSession] = useState(undefined);

  const router = useRouter();

  const sidebarItems = [
    { title: "Create articles", path: "/admin/articles/create" },
    { title: "Create recipe", path: "/admin/recipes/create" },
  ];

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await getSession();
        setIsSession(session ? true : false);

        if (!session || !session.user.isAdmin) {
          setTimeout(() => {
            router.push("/");
          }, 0);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsSession(false);
      }
    };

    checkSession();
  }, [router]);

  if (isSession === undefined) {
    return <Loader />;
  }

  if (!isSession) {
    return null;
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
            <AdminTabs />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;
