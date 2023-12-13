import React from "react";
import { commentRecipe, getRecipe } from "../../../../lib/recipes";
import { notFound } from "next/navigation";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Rating from "@/components/Rating";
import Link from "next/link";
import { GiFlame } from "react-icons/gi";
import CommentForm from "@/components/CommentForm";

const Recipe = async ({ params }) => {
  const slug = params.slug;
  const recipe = await getRecipe(slug);

  if (!recipe) {
    //I MUST CREATE NOT FOUND PAGE
    notFound();
  }

  return (
    <>
      <Container>
        <div className="hero-section">
          <Image src={recipe.image} alt={recipe.title} fill />
          <h2>{recipe.title}</h2>
        </div>
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
            <p className="recipe-date-info">
              Published on: {recipe.createdAt.toString().substring(3, 15)}
            </p>
            <p className="recipe-date-info">
              Last Update on: {recipe.updatedAt.toString().substring(3, 15)}
            </p>
          </Col>
          <Col md={2}>
            <Rating
              value={recipe.rating}
              text={`${recipe.numComments} reviews`}
            />
          </Col>
        </Row>
        <section>
          <Row>
            <Col md={9}>
              <h3>Summary</h3>
              <p>{recipe.summary}</p>
              <h3>Ingredients</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: recipe.ingredients,
                }}></div>
              <h3>Instructions:</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions,
                }}></div>
            </Col>
            <Col md={3}>
              <ul className="list-group list-group-flush details-list">
                <h3>Nutrient Details:</h3>
                <p>Per portion</p>
                <li className="list-group-item">
                  <GiFlame style={{ color: "#e06805" }} />
                  <strong>Calories:</strong> {recipe.calories} kcal
                </li>
                <li className="list-group-item">
                  <strong>Protein:</strong> {recipe.protein} grams
                </li>
                <li className="list-group-item">
                  <strong>Carbs:</strong> {recipe.carbs} grams
                </li>
                <li className="list-group-item">
                  <strong>Fats:</strong> {recipe.fats} grams
                </li>
                <li className="list-group-item">
                  <strong>Sugar:</strong> {recipe.sugar} grams
                </li>
                <li className="list-group-item">
                  <strong>Fiber:</strong> {recipe.fiber} grams
                </li>
              </ul>
            </Col>
          </Row>
        </section>
        <section>
          <h2>Comment</h2>
          <Row>
            <Col md={6}>
              <CommentForm serverAction={commentRecipe} slug={slug} />
            </Col>
          </Row>
          <Row>
            <Col>
              {recipe.comments.length === 0 ? (
                <h3>This recipe has no comments yet. </h3>
              ) : (
                <ul className="list-group comment-list">
                  {recipe.comments.map((comment) => (
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
      </Container>
    </>
  );
};

export default Recipe;
