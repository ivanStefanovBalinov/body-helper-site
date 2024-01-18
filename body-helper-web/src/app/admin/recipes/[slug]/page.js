"use client";

import Loader from "@/components/Loader";
import RichTextEditor from "@/components/RichTextEditor";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const EditRecipe = ({ params }) => {
  const [recipe, setRecipe] = useState(null);
  const slug = params.slug;

  useEffect(() => {
    const fetchRecipe = async () => {
      await fetch(`https://body-helper.vercel.app/api/recipes/${slug}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((response) => setRecipe(response.data[0]))
        .catch((err) => console.error("Fetch Failed", err));
    };
    fetchRecipe();
  }, [slug]);

  const onChangeHandler = (e) => {
    setRecipe((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await fetch(`https://body-helper.vercel.app/api/recipes/${slug}`, {
      method: "PUT",
      body: JSON.stringify(recipe),
    }).then((response) => {
      if (response.ok) {
        toast.success("Recipe was updated successfully!");
      } else {
        toast.error("Updating Failed!");
      }
    });
  };

  if (!recipe) {
    return <Loader />;
  }

  return (
    <>
      <Container className="py-2">
        <h2 className="my-3">
          Edit Recipe: <span className="red">{recipe.title}</span>
        </h2>
        <form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <div>
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  value={recipe.title}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="summary">
                  Short Summary
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="summary"
                  name="summary"
                  value={recipe.summary}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label
                  className="form-label mx-2"
                  htmlFor="category"
                  defaultValue={recipe.category}>
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="my-3"
                  value={recipe.category}
                  onChange={onChangeHandler}>
                  <option value={""}>Select category</option>
                  <option value={"chicken"}>Chicken</option>
                  <option value={"meat"}>Meat</option>
                  <option value={"seafood"}>Sea Food</option>
                  <option value={"lowcarbs"}>Low Carbs</option>
                  <option value={"salad"}>Salad</option>
                  <option value={"vegetarian"}>Vegetarian</option>
                </select>
              </div>
              <h4 style={{ color: "#aaa", margin: "20px 0px" }}>Details:</h4>
              <div>
                <label className="form-label" htmlFor="calories">
                  Calories
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="calories"
                  name="calories"
                  value={recipe.calories}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="protein">
                  Protein
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="protein"
                  name="protein"
                  value={recipe.protein}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="fats">
                  Fats
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="fats"
                  name="fats"
                  value={recipe.fats}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="carbs">
                  Carbs
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="carbs"
                  name="carbs"
                  value={recipe.carbs}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="fiber">
                  Fiber
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="fiber"
                  name="fiber"
                  value={recipe.fiber}
                  onChange={onChangeHandler}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="sugar">
                  Sugar
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="sugar"
                  name="sugar"
                  value={recipe.sugar}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="my-2">
                <label className="form-label mx-2" htmlFor="author">
                  Authors name
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={recipe.author}
                  className="form-control"
                  onChange={onChangeHandler}
                />
              </div>
            </Col>
            <Col md={6}>
              <div>
                <label className="form-label" htmlFor="ingredients">
                  Ingredients
                </label>
                <RichTextEditor
                  value={recipe.ingredients}
                  onChange={(newValue) => {
                    setRecipe((prevState) => ({
                      ...prevState,
                      ingredients: newValue,
                    }));
                  }}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="instructions">
                  Instructions
                </label>
                <RichTextEditor
                  value={recipe.instructions}
                  onChange={(newValue) => {
                    setRecipe((prevState) => ({
                      ...prevState,
                      instructions: newValue,
                    }));
                  }}
                />
              </div>
            </Col>
          </Row>
          <button type="submit " className="btn btn-dark mt-2">
            Submit
          </button>
        </form>
      </Container>
    </>
  );
};

export default EditRecipe;
