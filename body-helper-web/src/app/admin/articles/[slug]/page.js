import React from "react";
import { getArticle } from "../../../../../lib/articles";
import { Container } from "react-bootstrap";
import ImagePicker from "@/components/ImagePicker";

const EditArticle = async ({ params }) => {
  const slug = params.slug;
  const article = await getArticle(slug);

  return (
    <>
      <Container className="py-2">
        <form>
          <div className="mb-2">
            <label for="title" className="form-label">
              Article title
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              value={article.title}
            />
          </div>
          <div className="mb-2 form-floating">
            <textarea
              class="form-control"
              placeholder="Leave a comment here"
              id="summary"
              style={{ height: "100px" }}
              value={article.summary}></textarea>
            <label for="summary">Summary</label>
          </div>
          <ImagePicker label="Your image" name="image" />
          <div className="mb-2">
            <label for="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              class="form-control"
              id="author"
              value={article.author}
            />
          </div>

          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </form>
      </Container>
    </>
  );
};

export default EditArticle;
