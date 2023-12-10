"use client";
import { useFormState } from "react-dom";
import { createArticle } from "../../../../../lib/articles";
import classes from "./page.module.css";
import { Container } from "react-bootstrap";
import ImagePicker from "@/components/ImagePicker";
const CreateArticle = () => {
  const [state, formAction] = useFormState(createArticle, { message: null });

  return (
    <>
      <Container>
        <header>
          <h1>Create new article</h1>
        </header>
        <main>
          <form className={classes.form} action={formAction}>
            <div>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div>
              <label htmlFor="summary">Short Summary</label>
              <input type="text" id="summary" name="summary" required />
            </div>
            <div>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                rows="10"
                required></textarea>
            </div>
            <div className={classes.row}>
              <div>
                <label htmlFor="author">Authors name</label>
                <input type="text" id="author" name="author" required />
              </div>
              <div>
                <label htmlFor="sources">Your sources</label>
                <input type="text" id="sources" name="sources" required />
              </div>
            </div>
            <ImagePicker label="Your image" name="image" />
            {/* {state.message && <div>{state.message}</div>} */}
            <div className={classes.actions}>
              <button>Submit</button>
              {/* <MealsFormSubmitButton /> */}
            </div>
          </form>
        </main>
      </Container>
    </>
  );
};

export default CreateArticle;
