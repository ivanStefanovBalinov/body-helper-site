"use client";
import { useSession, signIn } from "next-auth/react";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const CommentForm = ({ slug, serverAction }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: session, status } = useSession();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const commentInfo = {
        slug: slug,
        rating: rating,
        comment: comment,
        userEmail: session.user.email,
      };
      await serverAction(commentInfo);
      toast.success("Your comment is submitted");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error("Comment submission failed. Please try again.");
    }
  };

  return (
    <>
      {!session || status === "unauthenticated" ? (
        <p>
          {" "}
          Please{" "}
          <span className="login-span" onClick={() => signIn()}>
            Login
          </span>{" "}
          to write a comment.
        </p>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="rating" className="my-2">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}>
              <option value="">Select...</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="comment" className="my-2">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              row="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}></Form.Control>
          </Form.Group>
          <p className="comment-warning">
            *Each user can comment on each article only once. If you try to
            comment again the comment will not be published.
          </p>
          <Button type="submit" variant="dark">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
};

export default CommentForm;
