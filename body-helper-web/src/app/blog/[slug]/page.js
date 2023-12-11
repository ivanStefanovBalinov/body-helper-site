import Image from "next/image";
import { getArticle } from "../../../../lib/articles";
import { Button, Col, Container, Row } from "react-bootstrap";
import { notFound } from "next/navigation";
import Link from "next/link";
import Rating from "@/components/Rating";

const BlogArticles = async ({ params }) => {
  const slug = params.slug;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  article.content = article.content.replace(/\n/g, "<br />");
  return (
    <>
      <Container>
        <header>
          <div className="blog-hero-section">
            <Image src={article.image} fill />
            <h2>{article.title}</h2>
          </div>
        </header>
        <main>
          <Row style={{ alignItems: "center" }}>
            <Col md={10}>
              <Button
                variant="dark"
                size="lg"
                style={{ color: "white", margin: "15px 0px" }}>
                <Link style={{ color: "white" }} href="/blog">
                  Back
                </Link>
              </Button>
            </Col>
            <Col md={2}>
              <Rating
                value={article.rating}
                text={`${article.numComments} reviews`}
              />
            </Col>
          </Row>
          <article>
            <h3>Summary:</h3>
            <p>{article.summary}</p>
            <h3>Content:</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}></p>
          </article>
          <section className="dark-bg">
            <h2>Comment</h2>
          </section>
        </main>
      </Container>
    </>
  );
};

export default BlogArticles;
