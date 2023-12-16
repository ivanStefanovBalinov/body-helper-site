"use client";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { FaDeleteLeft } from "react-icons/fa6";

const NutrientCalculator = () => {
  const [foodList, setFoodList] = useState([]);
  const [foodWeight, setFoodWeight] = useState(0);
  const [food, setFood] = useState("");
  const [isFoodItemExist, setIsFoodItemExist] = useState(true);
  const [mealNutrients, setMealNutrients] = useState({});
  const [datalist, setDataList] = useState([]);
  const [isQuantity, setIsQuantity] = useState(true);
  const [newFood, setNewFood] = useState({
    value: "",
    calories: "",
    protein: "",
    fat: "",
    carbs: "",
  });
  const [reload, setReload] = useState(false);

  const sumMealNutrition = (arr) =>
    arr.reduce(
      (acc, object) => {
        acc.calories += object.calories;
        acc.protein += object.protein;
        acc.carbs += object.carbs;
        acc.fat += object.fat;
        acc.weight += object.weight;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, weight: 0 }
    );

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/foods`, {
        method: "GET",
      });
      const data = await response.json();

      setDataList(data.foods);
    };
    fetchData();
  }, [reload]);

  useEffect(() => {
    const storedFoodList = JSON.parse(localStorage.getItem("foodList"));
    if (storedFoodList !== null) {
      setFoodList(storedFoodList);
    }
  }, []);

  useEffect(() => {
    const calculatedMealNutrients = sumMealNutrition(foodList);
    setMealNutrients(calculatedMealNutrients);

    if (foodList.length !== 0) {
      localStorage.setItem("foodList", JSON.stringify(foodList));
    }
  }, [foodList]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (food.length === 0 || !food) {
      return;
    }
    const wantedFood = datalist.find((item) => item.value === food);

    if (!wantedFood) {
      setIsFoodItemExist(false);
      return;
    }

    if (foodWeight === 0) {
      setIsQuantity(false);
      return;
    }

    setIsQuantity(true);
    setIsFoodItemExist(true);

    const newFood = {
      value: wantedFood.value,
      calories: Math.ceil(wantedFood.calories * (foodWeight / 100)),
      protein: Math.ceil(wantedFood.protein * (foodWeight / 100)),
      fat: Math.ceil(wantedFood.fat * (foodWeight / 100)),
      carbs: Math.ceil(wantedFood.carbs * (foodWeight / 100)),
      weight: Number(foodWeight),
    };

    setFoodList((prevState) => [...prevState, newFood]);
    setFood("");
  };

  const onChangeValuesAddFoodForm = (e) => {
    if (e.target.type === "number") {
      setNewFood((prevState) => ({
        ...prevState,
        [e.target.name]: parseFloat(e.target.value),
      }));
    } else {
      setNewFood((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const addNewFood = async (e) => {
    e.preventDefault();

    if (
      newFood.calories.length === 0 ||
      newFood.value.length === 0 ||
      newFood.protein.length === 0 ||
      newFood.fat.length === 0 ||
      newFood.carbs.length === 0
    ) {
      return;
    }
    await fetch("http://localhost:3000/api/foods", {
      method: "POST",
      body: JSON.stringify(newFood),
    });
    const newFoodForList = { ...newFood, weight: 100 };
    setFoodList((prevState) => [...prevState, newFoodForList]);
    setIsFoodItemExist(true);
    setReload(!reload);
    setNewFood({
      value: "",
      calories: "",
      protein: "",
      fat: "",
      carbs: "",
    });
  };

  const removeFoodFromListHandler = (title) => {
    const filteredFoodList = foodList.filter((food) => food.value !== title);
    setFoodList(filteredFoodList);
    if (foodList.length === 1) {
      localStorage.removeItem("foodList");
    }
  };
  return (
    <>
      <h2>Nutrient Calculator</h2>
      <Row>
        <Form onSubmit={submitHandler}>
          <p>*Enter your food name and weight</p>
          <Row>
            <Form.Group as={Col} md={4}>
              <Form.Control
                required
                list="food-type"
                type="text"
                value={food}
                placeholder="Chicken Breast"
                onChange={(e) => setFood(e.target.value)}
              />
              <datalist id="food-type">
                {datalist.map((item, index) => (
                  <option key={index + 1} value={item.value}></option>
                ))}
              </datalist>
            </Form.Group>
            <Form.Group as={Col} md={2}>
              <Form.Select onChange={(e) => setFoodWeight(e.target.value)}>
                <option value={0}>Select quantity</option>
                <option value={100}>100 g</option>
                <option value={200}>200 g</option>
                <option value={300}>300 g</option>
                <option value={400}>400 g</option>
                <option value={500}>500 g</option>
              </Form.Select>
            </Form.Group>
            <Col md={3}>
              {" "}
              <Button type="submit" variant="dark">
                Add
              </Button>
              <Button
                variant="dark"
                className="mx-2"
                onClick={() => {
                  setFoodList([]);
                  setMealNutrients({});
                  localStorage.removeItem("foodList");
                }}>
                Clear
              </Button>
            </Col>
            {!isQuantity && (
              <p className="comment-warning red">Please select quantity.</p>
            )}
          </Row>
        </Form>
        {!isFoodItemExist && (
          <div>
            <p className="comment-warning red">
              *We do not find this food. You could add it to our food list easy.{" "}
            </p>
            <Form onSubmit={addNewFood}>
              <Form.Group as={Col} md={4} className="my-2">
                <Form.Control
                  required
                  type="text"
                  value={newFood.value}
                  name="value"
                  placeholder="Food name"
                  onChange={onChangeValuesAddFoodForm}
                />
              </Form.Group>
              <Row>
                <Form.Group as={Col} md={4} className="my-2">
                  <Form.Control
                    required
                    type="number"
                    value={newFood.calories}
                    name="calories"
                    placeholder="Calories per 100g"
                    onChange={onChangeValuesAddFoodForm}
                  />
                  <Form.Control
                    className="my-2"
                    required
                    type="number"
                    name="protein"
                    value={newFood.protein}
                    placeholder="Proteins per 100g"
                    onChange={onChangeValuesAddFoodForm}
                  />
                </Form.Group>
                <Form.Group as={Col} md={4} className="my-2">
                  <Form.Control
                    required
                    type="number"
                    name="fat"
                    value={newFood.fat}
                    placeholder="Fats per 100g"
                    onChange={onChangeValuesAddFoodForm}
                  />
                  <Form.Control
                    className="my-2"
                    required
                    type="number"
                    name="carbs"
                    value={newFood.carbs}
                    placeholder="Carbs per 100g"
                    onChange={onChangeValuesAddFoodForm}
                  />
                </Form.Group>
              </Row>
              <Button
                type="submit"
                variant="dark"
                disabled={
                  newFood.calories.length === 0 ||
                  newFood.value.length === 0 ||
                  newFood.protein.length === 0 ||
                  newFood.fat.length === 0 ||
                  newFood.carbs.length === 0
                }>
                Add Food
              </Button>
            </Form>
          </div>
        )}
        <Row className="my-5">
          <Col md={6}>
            <ListGroup variant="flush" className="food-list">
              {foodList.length === 0 && (
                <>
                  <h2 className="food-list-h2">*Your food list is empty</h2>
                  <h5 className="food-list-h2">
                    *Add food via the inputs above
                  </h5>
                </>
              )}
              {foodList.map((item) => {
                return (
                  <ListGroup.Item key={item.value + Math.random() * 10051312}>
                    <div>
                      <h5>
                        {item.value}{" "}
                        <button
                          className="del-btn"
                          onClick={() => removeFoodFromListHandler(item.value)}>
                          <FaDeleteLeft
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </button>
                      </h5>
                      <h6>per {item.weight}g</h6>
                    </div>
                    <div className="calc-nutrients-wrapper">{`Calories:${item.calories} Protein:${item.protein} Carbs:${item.carbs} Fats:${item.fat}`}</div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col md={6}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Meal Nutrition Details</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Serving weight: {mealNutrients.weight || 0}g
                </Card.Subtitle>
                <Card.Text>Calories: {mealNutrients.calories || 0}</Card.Text>
                <Card.Text>Protein: {mealNutrients.protein || 0}</Card.Text>
                <Card.Text>Cabs: {mealNutrients.carbs || 0}</Card.Text>
                <Card.Text>Fat: {mealNutrients.fat || 0}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default NutrientCalculator;
