"use client";
import classes from "../../articles/create/page.module.css";
import { Col, Container, Row } from "react-bootstrap";
import ImagePicker from "@/components/ImagePicker";
import { createRecipe } from "../../../../../lib/recipes";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const CreateRecipe = () => {
  const [instructions, setInstructions] = useState();
  const [ingredients, setIngredients] = useState();

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

  const submitHandler = (formData) => {
    formData.set("instructions", instructions);
    formData.set("ingredients", ingredients);
    createRecipe(formData);
  };

  return (
    <>
      <Container>
        <header>
          <h1>Create new article</h1>
        </header>

        <form className={classes.form} action={submitHandler}>
          <Row>
            <Col md={6}>
              <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
              </div>
              <div>
                <label htmlFor="summary">Short Summary</label>
                <input type="text" id="summary" name="summary" required />
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <select id="category" name="category" required>
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
                <label htmlFor="calories">Calories</label>
                <input type="text" id="calories" name="calories" required />
              </div>
              <div>
                <label htmlFor="protein">Protein</label>
                <input type="text" id="protein" name="protein" required />
              </div>
              <div>
                <label htmlFor="fats">Fats</label>
                <input type="text" id="fats" name="fats" required />
              </div>
              <div>
                <label htmlFor="carbs">Carbs</label>
                <input type="text" id="carbs" name="carbs" required />
              </div>
              <div>
                <label htmlFor="fiber">Fiber</label>
                <input type="text" id="fiber" name="fiber" required />
              </div>
              <div>
                <label htmlFor="sugar">Sugar</label>
                <input type="text" id="sugar" name="sugar" required />
              </div>
              <div>
                <label htmlFor="author">Authors name</label>
                <input type="text" id="author" name="author" required />
              </div>
            </Col>
            <Col md={6}>
              <div>
                <label htmlFor="ingredients">Ingredients</label>
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={ingredients}
                  onChange={(newValue) => {
                    setIngredients(newValue);
                  }}
                />
              </div>
              <div>
                <label htmlFor="instructions">Instructions</label>
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={instructions}
                  onChange={(newValue) => {
                    setInstructions(newValue);
                  }}
                />
              </div>
              <div className={classes.actions}>
                <button>Submit</button>
              </div>
            </Col>
          </Row>
          <div className={classes.row}></div>
          <ImagePicker label="Your image" name="image" />
          {/* {state.message && <div>{state.message}</div>} */}
        </form>
      </Container>
    </>
  );
};

export default CreateRecipe;
