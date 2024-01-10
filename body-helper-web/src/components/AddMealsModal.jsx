"use client";

import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsCalculator } from "react-icons/bs";
import NutrientCalculator from "./Nutrient Calculator/NutrientCalculator";
import { IoMdClose } from "react-icons/io";

const AddMealsModal = ({
  onClick,
  email,
  closeModal,
  data,
  isUpdate,
  showError,
}) => {
  const [formData, setFormData] = useState({
    date: data?.date || "",
    breakfastCalories: data?.breakfastCalories || "",
    lunchCalories: data?.lunchCalories || "",
    snackCalories: data?.snackCalories || "",
    dinnerCalories: data?.dinnerCalories || "",
    id: data?._id || "",
  });
  const [showCalculator, setShowCalculator] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { ...formData, email: email };

    await fetch("http://localhost:3000/api/users/addmeals", {
      method: `${isUpdate ? "PUT" : "POST"}`,
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status === 403) {
        showError();
      }
    });
    setFormData({
      date: "",
      breakfastCalories: 0,
      lunchCalories: 0,
      snackCalories: 0,
      dinnerCalories: 0,
    });
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
              value={formData.date}
              name="date"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Breakfast</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Breakfast Calories"
              value={formData.breakfastCalories}
              name="breakfastCalories"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lunch</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Lunch Calories"
              value={formData.lunchCalories}
              name="lunchCalories"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Snack</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Snack Calories"
              value={formData.snackCalories}
              name="snackCalories"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Dinner</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your Dinner Calories"
              value={formData.dinnerCalories}
              name="dinnerCalories"
              onChange={onChangeHandler}
            />
          </Form.Group>
          <Button className="my-3" type="submit" variant="dark">
            {isUpdate ? "Update" : "Add"}
          </Button>
          <Button
            className="my-3 mx-3"
            type="button"
            variant="dark"
            onClick={() => setShowCalculator(true)}>
            <BsCalculator /> Calculator
          </Button>
        </Form>
      </div>
      {showCalculator && (
        <div className="calculator-modal">
          <NutrientCalculator />
          <div className="close-calculator-modal">
            <Button variant="dark" onClick={() => setShowCalculator(false)}>
              <IoMdClose />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMealsModal;
