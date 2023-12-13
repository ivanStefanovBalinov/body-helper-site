import Image from "next/image";
import heroImg from "../../../public/blog-hero.jpg";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { getAllArticles } from "../../../lib/articles";
import Link from "next/link";
import { FaRegCalendarAlt } from "react-icons/fa";
import { notFound } from "next/navigation";
import Rating from "@/components/Rating";

const Blog = async () => {
  const articles = await getAllArticles();
  if (!articles) {
    notFound();
  }

  return (
    <>
      <Container>
        <div className="hero-section">
          <Image src={heroImg} alt="Bodybuilder photo" fill />
          <h2>Blog</h2>
        </div>

        <section style={{ marginTop: "50px" }}>
          {articles.map((article) => (
            <div className="article-wrapper" key={article._id}>
              <Row
                style={{
                  marginBottom: "20px",
                }}>
                <Col md={3}>
                  <div
                    style={{
                      height: "200px",
                      position: "relative",
                    }}>
                    <Image
                      className="article-img"
                      src={article.image}
                      alt={article.title}
                      fill
                    />
                  </div>
                </Col>
                <Col md={9}>
                  <h2>{article.title}</h2>
                  <div className="date-rating-wrapper">
                    <time>
                      <FaRegCalendarAlt />{" "}
                      {article.createdAt.toString().substring(3, 15)}
                    </time>
                    {
                      <Rating
                        value={article.rating}
                        text={`${article.numComments} reviews`}
                      />
                    }
                  </div>
                  <p>{article.summary}</p>
                  <Button variant="dark">
                    <Link
                      style={{ color: "white" }}
                      href={`/blog/${article.slug}`}>
                      Read more
                    </Link>
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </section>
      </Container>
    </>
  );
};

export default Blog;
