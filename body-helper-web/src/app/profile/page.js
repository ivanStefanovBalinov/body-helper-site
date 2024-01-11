"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  ListGroup,
  Pagination,
  Row,
} from "react-bootstrap";

import defaultAvatar from "../../../public/images/default-user-avatar.png";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import AddMealsModal from "@/components/User Panel/AddMealsModal";
import Loader from "@/components/Loader";
import { IoSettingsSharp } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import UpdateUserCharacteristicForm from "@/components/User Panel/UpdateUserCharacteristicForm";
import ChangePasswordForm from "@/components/User Panel/ChangePasswordForm";
import { toast } from "react-toastify";
import UserCaloriesChartBar from "@/components/User Panel/UserCaloriesChartBar";

const ProfileScreen = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [userMealsData, setUserMealsData] = useState([]);
  const [reload, setReload] = useState(false);
  const [tableRowData, setTableRowData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState();
  const [fullHistory, setFullHistory] = useState([]);
  const [userInfo, setUserInfo] = useState({
    height: 0,
    weight: 0,
    ages: 0,
    desireWeight: 0,
    dailyCalories: 0,
    gender: "",
    image: undefined,
  });

  useEffect(() => {
    if (status === "authenticated" && session) {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:3000/api/users/getusersmeals",
          {
            method: "POST",
            body: JSON.stringify({
              email: session.user.email,
              pageNumber: currentPage,
            }),
          }
        );
        const data = await response.json();

        const userData = data.user;
        const paginationData = data.pagination;
        const userCharacteristics = {
          height: userData.height,
          weight: userData.weight,
          ages: userData.ages,
          desireWeight: userData.desireWeight,
          dailyCalories: 0,
          image: undefined,
          gender: userData.gender,
          dailyCalories: userData.dailyCalories,
        };

        setFullHistory(userData.historyOfMeals);
        setUserMealsData(paginationData.data);
        setUserInfo(userCharacteristics);
        setTotalPages(paginationData.totalPages);
        setTotalRecords(paginationData.totalRecords);
      };
      fetchData();
    }
  }, [status, currentPage, session, reload]);

  useEffect(() => {
    if (showModal || showUpdateModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal, showUpdateModal]);

  const hideModal = () => {
    setReload(!reload);
    setShowModal(false);
  };
  const hideUpdateModal = () => {
    setShowUpdateModal(false);
    setReload(!reload);
  };

  const updateRowHandler = (rowData) => {
    setShowModal(true);
    setTableRowData(rowData);
  };

  const sortDates = () => {
    const sortedData = [...userMealsData].sort((prev, curr) => {
      if (!isAscending) {
        return new Date(prev.date) - new Date(curr.date);
      } else {
        return new Date(curr.date) - new Date(prev.date);
      }
    });
    setUserMealsData(sortedData);
    setIsAscending(!isAscending);
  };

  const deleteRowHandler = async (id) => {
    const data = { email: session.user.email, id: id };

    await fetch("http://localhost:3000/api/users/deletemeals", {
      method: "DELETE",
      body: JSON.stringify(data),
    });
    toast.success("Data was deleted successfully.");
    setReload(!reload);
  };

  if (status === "loading") {
    return <Loader />;
  }

  const paginationButtons = [];

  for (let index = 1; index <= totalPages; index++) {
    paginationButtons.push(index);
  }

  return (
    <Container>
      <Row>
        <div className="profile-avatar">
          <Image
            src={userInfo.image || session.user.image || defaultAvatar}
            alt="user photo"
            fill
          />
        </div>
        <h3 style={{ textAlign: "center" }}>Hi {session?.user.name}</h3>
      </Row>
      <Row className="my-3">
        <Col md={9} className="table-header">
          <h2>History of meals </h2>
          <Button
            variant="dark"
            onClick={() => {
              setShowModal(true);
              setTableRowData({});
              setIsUpdate(false);
            }}>
            Add
          </Button>
        </Col>

        <Col md={9}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">
                  Date{" "}
                  {isAscending ? (
                    <IoChevronDown className="data-sort" onClick={sortDates} />
                  ) : (
                    <IoChevronUp className="data-sort" onClick={sortDates} />
                  )}
                </th>
                <th scope="col">Breakfast </th>
                <th scope="col">Snack </th>
                <th scope="col">Lunch </th>
                <th scope="col">Dinner </th>
                <th scope="col">Total </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userMealsData.map((mealsCalories, index) => (
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
                    <MdDelete
                      className="table-del-btn"
                      onClick={() => deleteRowHandler(mealsCalories._id)}
                    />{" "}
                    <MdEdit
                      className="table-edit-btn"
                      onClick={() => {
                        updateRowHandler(mealsCalories);
                        setIsUpdate(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="red italic">
            *If your total calories are coloured red it means you have taken
            more than the recommended daily calories.
          </p>
          {totalRecords > 10 && (
            <div className="pagination-wrapper">
              <Pagination>
                {" "}
                <Pagination.First
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prevState) => prevState - 1)}
                />
                {paginationButtons.map((num, index) => (
                  <Pagination.Item
                    key={num}
                    active={currentPage === num}
                    disabled={currentPage === num}
                    onClick={() => setCurrentPage(num)}>
                    {num}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={currentPage === paginationButtons.length}
                  onClick={() => setCurrentPage((prevState) => prevState + 1)}
                />
                <Pagination.Last
                  onClick={() => setCurrentPage(paginationButtons.length)}
                />
              </Pagination>
              <p>Total Records: {totalRecords}</p>
            </div>
          )}
        </Col>
        <Col md={3}>
          <ListGroup variant="flush" className="user-characteristics">
            <div className="user-characteristics-h-wrapper">
              <h4>{session.user.name} characteristics</h4>
              <IoSettingsSharp
                className="table-edit-btn"
                onClick={() => setShowUpdateModal(true)}
              />
            </div>
            <ListGroup.Item>Height: {userInfo.height} cm</ListGroup.Item>
            <ListGroup.Item>Weight: {userInfo.weight} kg</ListGroup.Item>
            <ListGroup.Item>Ages: {userInfo.ages} y.o.</ListGroup.Item>
            <ListGroup.Item>Gender: {userInfo.gender} </ListGroup.Item>
            <ListGroup.Item>
              Desired Weight: {userInfo.desireWeight} kg{" "}
            </ListGroup.Item>
            <ListGroup.Item>
              Daily Calories: {userInfo.dailyCalories} cal
            </ListGroup.Item>
          </ListGroup>
          <ChangePasswordForm email={session.user.email} />
        </Col>
      </Row>
      <UserCaloriesChartBar data={fullHistory} />
      {showModal && (
        <AddMealsModal
          email={session.user.email}
          onClick={hideModal}
          closeModal={hideModal}
          data={tableRowData}
          isUpdate={isUpdate}
        />
      )}
      {showUpdateModal && (
        <UpdateUserCharacteristicForm
          email={session.user.email}
          onClick={hideUpdateModal}
          closeModal={hideUpdateModal}
        />
      )}
    </Container>
  );
};

export default ProfileScreen;
