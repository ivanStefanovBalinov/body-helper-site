import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const UpdateUserCharacteristicForm = ({ onClick, email, closeModal }) => {
  const [formData, setFormData] = useState({
    height: 0,
    weight: 0,
    ages: 0,
    desireWeight: 0,
    gender: "",
    activity: "",
  });
  const [isError, setIsError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { ...formData, email: email };
    if (
      formData.height > 240 ||
      formData.height < 120 ||
      formData.weight < 30 ||
      formData.weight > 300 ||
      formData.ages < 10 ||
      formData.ages > 90 ||
      formData.desireWeight < 40 ||
      formData.desireWeight > 100
    ) {
      setIsError(true);
    }

    await fetch("http://localhost:3000/api/users", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    setFormData({
      height: 0,
      weight: 0,
      ages: 0,
      desireWeight: 0,
      gender: "",
    });

    setIsError(false);
    closeModal();
  };

  const onChangeHandler = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h2>Update Your Characteristics</h2>
        <Button variant="dark" onClick={onClick} className="close-modal-btn">
          X
        </Button>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your height"
              name="height"
              onChange={onChangeHandler}
              min={120}
              max={240}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your weight"
              name="weight"
              onChange={onChangeHandler}
              min={30}
              max={300}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ages</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your ages"
              name="ages"
              onChange={onChangeHandler}
              min={10}
              max={90}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Desire Weight</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your desire weight"
              name="desireWeight"
              onChange={onChangeHandler}
              min={40}
              max={100}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Activity</Form.Label>
            <Form.Control
              as="select"
              name="activity"
              onChange={onChangeHandler}>
              <option value="">Select your activity type...</option>
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
                Extra active very hard exercise/sports & physical job or 2x
                training
              </option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="checkbox-container">
            <Form.Label>Gender</Form.Label>
            <Form.Check
              type="checkbox"
              label="Male"
              name="gender"
              onChange={onChangeHandler}
              value={"male"}
            />
            <Form.Check
              type="checkbox"
              label="Female"
              name="gender"
              onChange={onChangeHandler}
              value={"female"}
            />
          </Form.Group>
          {isError && (
            <p className="red">Invalid fields data. Please try again!</p>
          )}
          <Button className="my-3" type="submit" variant="dark">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserCharacteristicForm;
