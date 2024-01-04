"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import defaultAvatar from "../../../public/images/default-user-avatar.png";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import AddMealsModal from "@/components/addMealsModal";

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

// const totalCalories =
//   userInfo.historyOfMeals.breakfastCalories +
//   userInfo.historyOfMeals.snackCalories +
//   userInfo.historyOfMeals.lunchCalories +
//   userInfo.historyOfMeals.dinner;

// const addMeal = async () => {
//   const data = {
//     breakfastCalories: 550,
//     lunchCalories: 700,
//     snackCalories: 120,
//     dinnerCalories: 900,
//     email: "ivan@email.com",
//   };

//   await addMealToTable(data);
// };

const ProfileScreen = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (status === "authenticated" && session) {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:3000/api/users/getusersmeals",
          {
            method: "POST",
            body: JSON.stringify({ email: session.user.email }),
          }
        );
        const meals = await response.json();
        setUserData(meals.data);
      };
      fetchData();
    }
  }, [status, session]);

  const hideModal = () => setShowModal(false);
  return (
    <Container>
      <Row>
        <div className="profile-avatar">
          <Image src={userInfo.image || defaultAvatar} alt="user photo" fill />
        </div>
        <h3 style={{ textAlign: "center" }}>Hi {session?.user.name}</h3>
      </Row>
      <Row className="my-3">
        <h2>History of meals </h2>
        <Button variant="dark" onClick={() => setShowModal(true)}>
          Add
        </Button>
        <Col md={9}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Breakfast </th>
                <th scope="col">Snack </th>
                <th scope="col">Lunch </th>
                <th scope="col">Dinner </th>
                <th scope="col">Total </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userData.map((mealsCalories, index) => (
                <tr key={index + 1}>
                  <th scope="row">{mealsCalories.date} </th>
                  <td>{mealsCalories.breakfastCalories} cal</td>
                  <td>{mealsCalories.snackCalories} cal</td>
                  <td>{mealsCalories.lunchCalories} cal</td>
                  <td>{mealsCalories.dinnerCalories} cal</td>
                  <td
                    className={
                      userInfo.dailyCalories >= mealsCalories.total
                        ? "calories-ok"
                        : "calories-bad"
                    }>
                    {mealsCalories.total}
                    cal
                  </td>
                  <td>
                    <MdDelete className="table-del-btn" />{" "}
                    <MdEdit className="table-edit-btn" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
      {showModal && (
        <AddMealsModal
          email={session.user.email}
          onClick={hideModal}
          closeModal={hideModal}
        />
      )}
    </Container>
  );
};

export default ProfileScreen;
