"use client";
import React, { useState } from "react";
import { Form, Row, Col, ListGroup, Button, Card } from "react-bootstrap";

const NutrientCalculator = () => {
  const datalist = [
    { value: "Chicken Breast", calories: 165, protein: 31, fat: 3.6, carbs: 0 },
    { value: "Salmon", calories: 206, protein: 25, fat: 13.4, carbs: 0 },
    { value: "Broccoli", calories: 55, protein: 3.7, fat: 0.6, carbs: 11.2 },
    {
      value: "Sweet Potato",
      calories: 86,
      protein: 1.6,
      fat: 0.1,
      carbs: 20.1,
    },
    { value: "Quinoa", calories: 120, protein: 4.1, fat: 1.9, carbs: 21.3 },
    { value: "Eggs", calories: 155, protein: 13, fat: 11, carbs: 1 },
    { value: "Spinach", calories: 23, protein: 2.9, fat: 0.4, carbs: 3.6 },
    { value: "Turkey Breast", calories: 135, protein: 30, fat: 1, carbs: 0 },
    { value: "Greek Yogurt", calories: 59, protein: 10, fat: 0.4, carbs: 3.6 },
    { value: "Brown Rice", calories: 111, protein: 2.6, fat: 0.9, carbs: 23.5 },
    { value: "Almonds", calories: 576, protein: 21, fat: 49, carbs: 22 },
    { value: "Oats", calories: 68, protein: 2.5, fat: 1.4, carbs: 12 },
    { value: "Chicken Thigh", calories: 209, protein: 26, fat: 13, carbs: 0 },
    { value: "Cottage Cheese", calories: 98, protein: 11, fat: 4, carbs: 3 },
    {
      value: "Black Beans",
      calories: 132,
      protein: 8.9,
      fat: 0.5,
      carbs: 23.7,
    },
    { value: "Tilapia", calories: 96, protein: 20, fat: 2, carbs: 0 },
    { value: "Avocado", calories: 160, protein: 2, fat: 15, carbs: 9 },
    { value: "Asparagus", calories: 20, protein: 2.2, fat: 0.2, carbs: 3.7 },
    { value: "Beef (lean)", calories: 250, protein: 26, fat: 17, carbs: 0 },
    { value: "Lentils", calories: 116, protein: 9, fat: 0.4, carbs: 20 },
    { value: "Peanut Butter", calories: 588, protein: 25, fat: 50, carbs: 20 },
    {
      value: "Whole Wheat Bread",
      calories: 247,
      protein: 10,
      fat: 2,
      carbs: 49,
    },
    { value: "Cauliflower", calories: 25, protein: 2, fat: 0.3, carbs: 5 },
    { value: "Ground Turkey", calories: 258, protein: 26, fat: 17, carbs: 0 },
    { value: "Chickpeas", calories: 164, protein: 8.9, fat: 2.6, carbs: 27 },
    { value: "Milk (low-fat)", calories: 42, protein: 3.4, fat: 1, carbs: 5 },
    { value: "Cucumber", calories: 16, protein: 0.7, fat: 0.2, carbs: 3.6 },
    { value: "Pork Chops", calories: 143, protein: 22, fat: 6, carbs: 0 },
    { value: "Shrimp", calories: 99, protein: 24, fat: 1.7, carbs: 0 },
    {
      value: "Brussels Sprouts",
      calories: 43,
      protein: 3.4,
      fat: 0.3,
      carbs: 9,
    },
    {
      value: "Yogurt (plain)",
      calories: 59,
      protein: 10,
      fat: 0.4,
      carbs: 3.6,
    },
    {
      value: "Tuna (canned in water)",
      calories: 94,
      protein: 20,
      fat: 1,
      carbs: 0,
    },
    {
      value: "Ground Beef (lean)",
      calories: 250,
      protein: 26,
      fat: 17,
      carbs: 0,
    },
    { value: "Halibut", calories: 140, protein: 23, fat: 3, carbs: 0 },
    { value: "Green Beans", calories: 31, protein: 1.8, fat: 0.2, carbs: 7 },
    { value: "Pineapple", calories: 50, protein: 0.5, fat: 0.1, carbs: 13 },
    { value: "Carrots", calories: 41, protein: 0.9, fat: 0.2, carbs: 10 },
    { value: "Blueberries", calories: 57, protein: 0.7, fat: 0.3, carbs: 14 },
    { value: "Ezekiel Bread", calories: 80, protein: 4, fat: 0.5, carbs: 15 },
    { value: "Cantaloupe", calories: 34, protein: 0.8, fat: 0.2, carbs: 8 },
    { value: "Turkey Bacon", calories: 42, protein: 3, fat: 3, carbs: 0 },
    { value: "Pumpkin Seeds", calories: 559, protein: 30, fat: 49, carbs: 11 },
    { value: "Chia Seeds", calories: 486, protein: 16, fat: 31, carbs: 42 },
    {
      value: "Cottage Cheese (low-fat)",
      calories: 72,
      protein: 12,
      fat: 1.6,
      carbs: 3.4,
    },
    { value: "Beets", calories: 43, protein: 1.6, fat: 0.2, carbs: 9.6 },
    { value: "Artichoke", calories: 47, protein: 3.3, fat: 0.2, carbs: 10 },
    { value: "Zucchini", calories: 17, protein: 1.2, fat: 0.3, carbs: 3.1 },
    { value: "Peanuts", calories: 567, protein: 25, fat: 49, carbs: 16 },
    { value: "Celery", calories: 16, protein: 0.7, fat: 0.2, carbs: 3 },
    { value: "Kiwi", calories: 61, protein: 1.1, fat: 0.5, carbs: 15 },
    { value: "Mango", calories: 60, protein: 0.8, fat: 0.4, carbs: 15 },
    { value: "Lamb", calories: 294, protein: 25, fat: 20, carbs: 0 },
    { value: "Peaches", calories: 39, protein: 0.9, fat: 0.3, carbs: 10 },
    { value: "Cabbage", calories: 25, protein: 1.3, fat: 0.1, carbs: 6 },
    { value: "Cranberries", calories: 46, protein: 0.4, fat: 0.1, carbs: 12 },
    { value: "Plums", calories: 46, protein: 0.7, fat: 0.2, carbs: 11 },
    { value: "Lentil Soup", calories: 100, protein: 5, fat: 0.4, carbs: 18 },
    { value: "Raspberries", calories: 52, protein: 1.2, fat: 0.7, carbs: 11 },
    {
      value: "Cottage Cheese (full-fat)",
      calories: 206,
      protein: 11,
      fat: 17,
      carbs: 4,
    },
    {
      value: "Soy Milk (unsweetened)",
      calories: 33,
      protein: 3.3,
      fat: 1.8,
      carbs: 1,
    },
    { value: "Lima Beans", calories: 115, protein: 7.8, fat: 0.4, carbs: 20 },
    {
      value: "Cantaloupe Melon",
      calories: 34,
      protein: 0.8,
      fat: 0.2,
      carbs: 8,
    },
    { value: "Apricots", calories: 48, protein: 1.4, fat: 0.4, carbs: 11 },
    { value: "Oranges", calories: 43, protein: 1, fat: 0.2, carbs: 9 },
    {
      value: "Sardines (canned in oil)",
      calories: 208,
      protein: 25,
      fat: 11,
      carbs: 0,
    },
    { value: "Blackberries", calories: 43, protein: 2, fat: 0.5, carbs: 10 },
    { value: "Beef Liver", calories: 135, protein: 21, fat: 4.6, carbs: 0 },
    {
      value: "Cottage Cheese (fat-free)",
      calories: 72,
      protein: 14,
      fat: 0.4,
      carbs: 4,
    },
    { value: "Swiss Chard", calories: 19, protein: 1.6, fat: 0.2, carbs: 3.7 },
    { value: "Pears", calories: 57, protein: 0.4, fat: 0.1, carbs: 15 },
    { value: "Grapes", calories: 69, protein: 0.6, fat: 0.2, carbs: 18 },
    { value: "Beef Jerky", calories: 410, protein: 65, fat: 13, carbs: 0 },
    { value: "Pecans", calories: 690, protein: 9.2, fat: 71, carbs: 14 },
    {
      value: "Butternut Squash",
      calories: 45,
      protein: 1,
      fat: 0.1,
      carbs: 12,
    },
    { value: "Venison", calories: 158, protein: 30, fat: 3.4, carbs: 0 },
    { value: "Honey", calories: 304, protein: 0.3, fat: 0, carbs: 82 },
    { value: "Pistachios", calories: 562, protein: 20, fat: 45, carbs: 28 },
    {
      value: "Cucumber (with peel)",
      calories: 16,
      protein: 0.7,
      fat: 0.2,
      carbs: 3.6,
    },
    { value: "Tomatoes", calories: 18, protein: 0.9, fat: 0.2, carbs: 4 },
    { value: "Hazelnuts", calories: 628, protein: 15, fat: 61, carbs: 17 },
    { value: "Walnuts", calories: 654, protein: 15, fat: 65, carbs: 14 },
    { value: "Raisins", calories: 299, protein: 3.1, fat: 0.5, carbs: 79 },
    { value: "Pomegranate", calories: 83, protein: 1.7, fat: 1.2, carbs: 18 },
    {
      value: "Sunflower Seeds",
      calories: 584,
      protein: 20,
      fat: 51,
      carbs: 20,
    },
    { value: "Apples", calories: 52, protein: 0.3, fat: 0.2, carbs: 14 },
    {
      value: "Beef (ground, lean)",
      calories: 250,
      protein: 26,
      fat: 17,
      carbs: 0,
    },
    {
      value: "Cottage Cheese (2% fat)",
      calories: 92,
      protein: 11,
      fat: 4,
      carbs: 3,
    },
    { value: "Almond Butter", calories: 614, protein: 21, fat: 55, carbs: 22 },
    { value: "Green Peas", calories: 81, protein: 5, fat: 0.4, carbs: 14 },
    { value: "Coconut Oil", calories: 862, protein: 0, fat: 100, carbs: 0 },
    {
      value: "Beef (ribeye, lean)",
      calories: 250,
      protein: 26,
      fat: 17,
      carbs: 0,
    },
    { value: "Cashews", calories: 553, protein: 18, fat: 44, carbs: 30 },
    { value: "Dates", calories: 282, protein: 2.5, fat: 0.4, carbs: 75 },
  ];
  const [foodList, setFoodList] = useState([]);
  const [foodWeight, setFoodWeight] = useState(0);
  const [food, setFood] = useState("");
  const [isFoodItemExist, setIsFoodItemExist] = useState(true);
  const [mealNutrients, setMealNutrients] = useState({});

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
    setIsFoodItemExist(true);
    const newFood = {
      value: wantedFood.value,
      calories: Math.ceil(wantedFood.calories * (foodWeight / 100)),
      protein: Math.ceil(wantedFood.protein * (foodWeight / 100)),
      fat: Math.ceil(wantedFood.fat * (foodWeight / 100)),
      carbs: Math.ceil(wantedFood.carbs * (foodWeight / 100)),
      weight: foodWeight,
    };

    setFoodList((prevState) => [...prevState, newFood]);
    setMealNutrients((prevState) =>
      Object.assign(prevState, sumMealNutrition(foodList))
    );

    console.log("MEAL NUTRITION:", mealNutrients);
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
              </Form.Select>
            </Form.Group>
            <Col md={2}>
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
                }}>
                Clear
              </Button>
            </Col>
            {!isFoodItemExist && (
              <div>
                <p className="comment-warning red">
                  *We do not find this food. You could add it to our food list
                  easy.{" "}
                </p>
                <Button variant="dark">Add Food</Button>
              </div>
            )}
          </Row>
        </Form>
        <Row className="my-5">
          <Col md={6}>
            <p className="my-3">*Your food list</p>
            <ListGroup variant="flush">
              {foodList.map((item) => {
                return (
                  <ListGroup.Item key={item.value}>
                    <div>
                      <h5>{item.value}</h5>
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
