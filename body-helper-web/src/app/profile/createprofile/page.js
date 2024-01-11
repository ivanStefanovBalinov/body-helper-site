"use server";
import ImagePicker from "@/components/ImagePicker";
import { Col, Row } from "react-bootstrap";

const CreateProfile = () => {
  const submitForm = (formData) => {
    console.log(FormData);
  };

  return (
    <div className="register-screen">
      <form action={submitForm}>
        <Row>
          <Col>
            <label for="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="John"
            />
          </Col>
          <Col>
            <label for="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="JJ"
            />
          </Col>
        </Row>
        <div className="mb-2">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="john@gmail.com"
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <ImagePicker label="Your avatar" name="image" />
        </div>
        <Row>
          <Col>
            <label for="weight" className="form-label">
              Your Weight
            </label>
            <input type="number" className="form-control" id="weight" />
          </Col>
          <Col>
            <label for="height" className="form-label">
              Your Height
            </label>
            <input type="number" className="form-control" id="height" />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <label for="ages" className="form-label">
              Your Ages
            </label>
            <input type="number" className="form-control" id="ages" />
          </Col>
          <Col>
            <label for="desireWeight" className="form-label">
              Desired Weight
            </label>
            <input type="number" className="form-control" id="desireWeight" />
          </Col>
        </Row>
        <div className="checkbox-container">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="male"
              id="male"
            />
            <label className="form-check-label" for="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="male"
              id="female"
            />
            <label className="form-check-label" for="female">
              Female
            </label>
          </div>
        </div>
        <select
          className="form-select mt-3"
          aria-label="Default select example">
          <option selected>Select your activity type...</option>
          <option value="1.2">Sedentary - little or no exercise</option>
          <option value="1.375">
            Lightly active light - exercise/sports 1-3 days/week
          </option>
          <option value="1.55">
            Moderately active - moderate exercise/sports 3-5 days/week
          </option>
          <option value="1.725">
            Very active hard exercise/sports 6-7 days a week
          </option>
          <option value="1.9">
            Extra active very hard exercise/sports & physical job or 2x training
          </option>
        </select>

        <button type="submit" className="btn btn-dark mt-3 w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
