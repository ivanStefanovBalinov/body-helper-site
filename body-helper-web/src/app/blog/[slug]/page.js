import Image from "next/image";
import { createArticleComment, getArticle } from "../../../../lib/articles";
import { Button, Col, Container, Row } from "react-bootstrap";
import { notFound } from "next/navigation";
import Link from "next/link";
import Rating from "@/components/Rating";
import CommentForm from "@/components/CommentForm";

const BlogArticles = async ({ params }) => {
  const slug = params.slug;
  const article = await getArticle(slug);

  if (!article) {
    //I MUST CREATE NOT FOUND PAGE
    notFound();
  }

  article.content = article.content.replace(/\n/g, "<br />");

  return (
    <>
      <Container>
        <header>
          <div className="blog-hero-section">
            <Image src={article.image} alt={article.title} fill />
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
          <section>
            <h2>Comment</h2>
            <Row>
              <Col md={6}>
                <CommentForm serverAction={createArticleComment} slug={slug} />
              </Col>
            </Row>
            <Row>
              <Col>
                {article.comments.length === 0 ? (
                  <h3>This article has no comments yet. </h3>
                ) : (
                  <ul className="list-group comment-list">
                    {article.comments.map((comment) => (
                      <li className="list-group-item" key={comment.createdAt}>
                        <div className="comment-info">
                          <strong>{comment.name}</strong>
                          <Rating value={comment.rating} />
                        </div>
                        <time>
                          {comment.createdAt.toString().substring(3, 15)}
                        </time>

                        <p>{comment.comment}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </Col>
            </Row>
          </section>
        </main>
      </Container>
    </>
  );
};

export default BlogArticles;
