"use client";
import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import RichTextEditor from "@/components/RichTextEditor";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

const EditArticle = ({ params }) => {
  const [article, setArticle] = useState(null);

  const slug = params.slug;

  useEffect(() => {
    const fetchArticle = async () => {
      await fetch(`http://localhost:3000/api/articles/${slug}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => setArticle(response.data[0]))
        .catch((err) => console.error("Fetch Failed", err));
    };
    fetchArticle();
  }, [slug]);

  if (!article) {
    return <Loader />;
  }

  const onChangeHandler = (e) => {
    setArticle((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/articles/${slug}`, {
      method: "PUT",
      body: JSON.stringify(article),
    }).then((response) => {
      if (response.ok) {
        toast.success("Article was updated successfully!");
      } else {
        toast.error("Updating Failed!");
      }
    });
  };

  return (
    <>
      <Container className="py-2">
        <h2 className="my-3">Edit {article.title}</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-2">
            <label htmlFor="title" className="form-label">
              Article title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={article.title}
              name="title"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-2 form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="summary"
              style={{ height: "100px" }}
              value={article.summary}
              name="summary"
              onChange={onChangeHandler}></textarea>
            <label htmlFor="summary">Summary</label>
          </div>
          <div className="mb-2">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              id="author"
              value={article.author}
              name="author"
              onChange={onChangeHandler}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="sources" className="form-label">
              Sources
            </label>
            <input
              type="text"
              className="form-control"
              id="sources"
              name="sources"
              value={article.sources}
              onChange={onChangeHandler}
            />
          </div>
          <RichTextEditor
            value={article.content}
            onChange={(newValue) => {
              setArticle((prevState) => ({ ...prevState, content: newValue }));
            }}
          />
          <button type="submit " className="btn btn-dark mt-2">
            Submit
          </button>
        </form>
      </Container>
    </>
  );
};

export default EditArticle;
