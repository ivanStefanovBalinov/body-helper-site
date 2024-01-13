"use client";
import { useEffect, useState } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";

const AdminTabs = () => {
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

  useEffect(() => {
    const fetchRecipes = async () => {
      await fetch("http://localhost:3000/api/recipes", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((recipes) => setRecipes(recipes.data))
        .catch((err) => console.log("Error:", err));
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="articles"
        id="uncontrolled-tab-example"
        className="mb-3">
        <Tab eventKey="articles" title="Articles">
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
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe, index) => (
                <tr key={recipe._id.toString()}>
                  <th scope="row">{index + 1} </th>
                  <td>{recipe.title}</td>
                  <td>{recipe.author}</td>
                  <td>{recipe.category}</td>

                  <td>
                    <MdDelete className="table-del-btn" />{" "}
                    <MdEdit className="table-edit-btn" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>
    </>
  );
};

export default AdminTabs;
