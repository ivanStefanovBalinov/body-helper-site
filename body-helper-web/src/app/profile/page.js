import Image from "next/image";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import defaultAvatar from "../../../public/images/default-user-avatar.png";
import NutrientCalculator from "@/components/Nutrient Calculator/NutrientCalculator";

const userInfo = {
  name: "John Doe",
  image: undefined,
  height: 187,
  weight: 100,
  ages: 33,
  targetWeight: 90,
  dailyCalories: 1900,
  historyOfMeals: [
    {
      date: "18.12.23",
      breakfastCalories: 650,
      lunchCalories: 720,
      snackCalories: 160,
      dinner: 850,
    },
    {
      date: "19.12.23",
      breakfastCalories: 790,
      lunchCalories: 620,
      snackCalories: 300,
      dinner: 650,
    },
  ],
};

const totalCalories =
  userInfo.historyOfMeals.breakfastCalories +
  userInfo.historyOfMeals.snackCalories +
  userInfo.historyOfMeals.lunchCalories +
  userInfo.historyOfMeals.dinner;

// const addMeal = async () => {
//   const data = {
//     breakfastCalories: 550,
//     lunchCalories: 700,
//     snackCalories: 120,
//     dinnerCalories: 900,
//     email: session.user.email,
//   };

//   // await addMealToTable(data);
// };

const ProfileScreen = () => {
  return (
    <Container>
      <Row>
        <div className="profile-avatar">
          <Image src={userInfo.image || defaultAvatar} fill />
        </div>
        <h3 style={{ textAlign: "center" }}>Hi {userInfo.name}</h3>
      </Row>
      <Row className="my-3">
        <h2>History of meals </h2>
        <Col md={9}>
          {/* <Button variant="dark">Add</Button> */}
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Breakfast </th>
                <th scope="col">Snack </th>
                <th scope="col">Lunch </th>
                <th scope="col">Dinner </th>
                <th scope="col">Total </th>
              </tr>
            </thead>
            <tbody>
              {userInfo.historyOfMeals.map((mealsCalories, index) => (
                <tr key={index + 1}>
                  <th scope="row">{mealsCalories.date} </th>
                  <td>{mealsCalories.breakfastCalories} cal</td>
                  <td>{mealsCalories.snackCalories} cal</td>
                  <td>{mealsCalories.lunchCalories} cal</td>
                  <td>{mealsCalories.dinner} cal</td>
                  <td
                    className={
                      userInfo.dailyCalories >=
                      mealsCalories.breakfastCalories +
                        mealsCalories.snackCalories +
                        mealsCalories.lunchCalories +
                        mealsCalories.dinner
                        ? "calories-ok"
                        : "calories-bad"
                    }>
                    {mealsCalories.breakfastCalories +
                      mealsCalories.snackCalories +
                      mealsCalories.lunchCalories +
                      mealsCalories.dinner}
                    cal
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
