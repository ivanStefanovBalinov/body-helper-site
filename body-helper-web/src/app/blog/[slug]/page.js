import Image from "next/image";
import { getArticle } from "../../../../lib/articles";
import { Button, Container } from "react-bootstrap";
import { notFound } from "next/navigation";
import Link from "next/link";

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
          <Button
            variant="dark"
            size="lg"
            style={{ color: "white", margin: "15px 0px" }}>
            <Link style={{ color: "white" }} href="/blog">
              Back
            </Link>
          </Button>
          <article>
            <h3>Summary:</h3>
            <p>{article.summary}</p>
            <h3>Content:</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: article.content,
              }}></p>
          </article>
        </main>
      </Container>
    </>
  );
};

export default BlogArticles;
