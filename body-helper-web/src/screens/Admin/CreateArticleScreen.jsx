"use client";

import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const CreateArticleScreen = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(undefined);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      ["link", "image"],
      [{ align: [] }],

      ["clean"],
    ],
  };

  const formGroups = [
    {
      label: "Title",
      controlId: "title",
      type: "text",
      placeholder: "Enter title...",
      value: title,
      onChange: (e) => setTitle(e.target.value),
    },

    {
      label: "Image",
      controlId: "image",
      type: "text",
      placeholder: "Enter image url",
      value: image,
      onChange: (e) => setImage(e.target.value),
    },

    {
      label: "Author",
      controlId: "author",
      type: "text",
      placeholder: "Enter author",
      value: author,
      onChange: (e) => setAuthor(e.target.value),
    },
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const newArticle = {
      title: title,
      image: image,
      author: author,
      content: content,
    };
    try {
      const response = await fetch("/api/articles", {
        method: POST,
        body: JSON.stringify(newArticle),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("DATA:", data);
    } catch (error) {
      toast.error(error);
    }
  };

  const uploadFileHandler = async (e) => {
    if (!e.target.files[0]) return;

    const formData = new FormData();
    formData.set("image", e.target.files[0]);
    try {
      const response = await fetch("/api/imageupload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log("RESPONSE:", data);
      toast.success(data.message);
      setImage(data.image);
    } catch (error) {
      toast.error(error?.data?.message || error);
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 className="section-main-header">Create Article</h1>
        <Col xs={12} md={6}>
          <Form onSubmit={onSubmit}>
            {formGroups.map((formGroup, index) =>
              formGroup.controlId === "image" ? (
                <Form.Group
                  controlId={formGroup.controlId}
                  className="my-2"
                  key={index + 1}>
                  <Form.Label>{formGroup.label}</Form.Label>
                  <Form.Control
                    type={formGroup.type}
                    placeholder={formGroup.placeholder}
                    value={formGroup.value}
                    onChange={formGroup.onChange}
                  />
                  <Form.Control
                    type="file"
                    label="Choose file"
                    onChange={uploadFileHandler}></Form.Control>
                </Form.Group>
              ) : (
                <Form.Group
                  controlId={formGroup.controlId}
                  className="my-2"
                  key={index + 1}>
                  <Form.Label>{formGroup.label}</Form.Label>
                  <Form.Control
                    type={formGroup.type}
                    placeholder={formGroup.placeholder}
                    value={formGroup.value}
                    onChange={formGroup.onChange}
                  />
                </Form.Group>
              )
            )}
            {/* //TRIGGER ERROR */}
            {/* <ReactQuill
              theme="snow"
              value={content}
              modules={modules}
              onChange={(newValue) => {
                setContent(newValue);
              }}
            /> */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateArticleScreen;
