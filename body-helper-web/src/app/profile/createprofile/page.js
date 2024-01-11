"use client";
import ImagePicker from "@/components/ImagePicker";
import { Col, Row } from "react-bootstrap";
import { registerAccount } from "../../../../lib/users";

const CreateProfile = () => {
  const submitForm = (formData) => {
    registerAccount(formData);
  };

  return (
    <div className="register-screen">
      <form action={submitForm}>
        <Row>
          <Col>
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="John"
              name="name"
            />
          </Col>
          <Col>
            <label htmlFor="username" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="JJ"
              name="username"
            />
          </Col>
        </Row>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="john@gmail.com"
            name="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>
        <div className="mb-3">
          <ImagePicker label="Your avatar" name="image" />
        </div>
        <Row>
          <Col>
            <label htmlFor="weight" className="form-label">
              Your Weight
            </label>
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
            />
          </Col>
          <Col>
            <label htmlFor="height" className="form-label">
              Your Height
            </label>
            <input
              type="number"
              className="form-control"
              id="height"
              name="height"
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col>
            <label htmlFor="ages" className="form-label">
              Your Ages
            </label>
            <input
              type="number"
              className="form-control"
              id="ages"
              name="ages"
            />
          </Col>
          <Col>
            <label htmlFor="desireWeight" className="form-label">
              Desired Weight
            </label>
            <input
              type="number"
              className="form-control"
              id="desireWeight"
              name="desireWeight"
            />
          </Col>
        </Row>
        <div className="checkbox-container">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="male"
              id="male"
              name="gender"
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="female"
              id="female"
              name="gender"
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
        </div>
        <select
          className="form-select mt-3"
          name="activity"
          defaultValue={"Select your activity type..."}>
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
