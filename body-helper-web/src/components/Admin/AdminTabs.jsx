"use client";
import { useEffect, useState } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";

const AdminTabs = ({ recipesData, usersData }) => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      await fetch("http://localhost:3000/api/articles", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((articles) => setArticles(articles.data))
        .catch((err) => console.log("Error:", err));
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      await fetch("http://localhost:3000/api/users", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((users) => setUsers(users.data))
        .catch((err) => console.log("Error:", err));
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="articles"
        id="uncontrolled-tab-example"
        className="mb-3">
        <Tab eventKey="articles" title="Articles" active>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Rating</th>
                <th>Comments</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={article._id.toString()}>
                  <th scope="row">{index + 1} </th>
                  <td>{article.title}</td>
                  <td>{article.author}</td>
                  <td>{article.rating}</td>
                  <td>{article.numComments}</td>
                  <td>
                    <MdDelete className="table-del-btn" />{" "}
                    <MdEdit className="table-edit-btn" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="users" title="Users">
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>User name</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id.toString()}>
                  <th scope="row">{index + 1} </th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.isAdmin ? "admin" : "user"}</td>
                  <td>
                    <MdDelete className="table-del-btn" />{" "}
                    <MdEdit className="table-edit-btn" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="recipes" title="Recipes">
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
};

export default AdminTabs;
