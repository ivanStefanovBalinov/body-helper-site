"use client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const AddMealsModal = ({ onClick }) => {
  const [formData, setFormData] = useState({
    date: "",
    breakfastCalories: 0,
    lunchCalories: 0,
    snackCalories: 0,
    dinnerCalories: 0,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);

    // setFormData({
    //   date: "",
    //   breakfastCalories: 0,
    //   lunchCalories: 0,
    //   snackCalories: 0,
    //   dinnerCalories: 0,
    // });
  };

  const onChangeHandler = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h2>Add Meals</h2>
        <Button variant="dark" onClick={onClick} className="close-modal-btn">
          X
        </Button>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date"
              name="date"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Breakfast</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Breakfast Calories"
              name="breakfastCalories"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lunch</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Lunch Calories"
              name="lunchCalories"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Snack</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Snack Calories"
              name="snackCalories"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dinner</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Dinner Calories"
              name="dinnerCalories"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Button className="my-3" type="submit" variant="dark">
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddMealsModal;
