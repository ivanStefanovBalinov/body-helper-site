import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const UpdateUserCharacteristicForm = ({ onClick, email, closeModal }) => {
  const [formData, setFormData] = useState({
    height: 0,
    weight: 0,
    ages: 0,
    desireWight: 0,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

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
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your weight"
              name="weight"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ages</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your ages"
              name="ages"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Desire Weight</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your desire weight"
              name="desireWight"
              onChange={onChangeHandler}
            />
          </Form.Group>

          <Button className="my-3" type="submit" variant="dark">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUserCharacteristicForm;
