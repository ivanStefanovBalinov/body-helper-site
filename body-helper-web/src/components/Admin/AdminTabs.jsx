"use client";
import EditArticle from "@/app/admin/articles/[slug]/page";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tab, Table, Tabs } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const AdminTabs = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [reload, setReload] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      await fetch("https://body-helper.vercel.app/api/articles", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((articles) => setArticles(articles.data))
        .catch((err) => console.log("Error:", err));
    };
    fetchArticles();
  }, [reload]);

  useEffect(() => {
    const fetchUsers = async () => {
      await fetch("https://body-helper.vercel.app/api/users", {
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
      await fetch("https://body-helper.vercel.app/api/recipes", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((recipes) => setRecipes(recipes.data))
        .catch((err) => console.log("Error:", err));
    };
    fetchRecipes();
  }, [reload]);

  const editHandler = (slug, subdirectory) => {
    router.push(`/admin/${subdirectory}/${slug}`);
  };

  const capitalizeFirstLetter = (word) => {
    if (typeof word !== "string") {
      return null;
    }

    return word.charAt(0).toUpperCase() + word.slice(1, -1);
  };

  const deleteHandler = async (slug, subdirectory) => {
    await fetch(`https://body-helper.vercel.app/api/${subdirectory}/${slug}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        toast.success(
          `${capitalizeFirstLetter(subdirectory)} was deleted successfully!`
        );
        setReload(!reload);
      } else {
        toast.error("Deletion Failed!");
      }
    });
  };

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
                    <MdDelete
                      className="table-del-btn"
                      onClick={() => deleteHandler(article.slug, "articles")}
                    />{" "}
                    <MdEdit
                      className="table-edit-btn"
                      onClick={() => editHandler(article.slug, "articles")}
                    />
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
                    <MdEdit
                      className="table-edit-btn"
                      onClick={() => editHandler(user._id)}
                    />
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
                    <MdDelete
                      className="table-del-btn"
                      onClick={() => deleteHandler(recipe.slug, "recipes")}
                    />{" "}
                    <MdEdit
                      className="table-edit-btn"
                      onClick={() => editHandler(recipe.slug, "recipes")}
                    />
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
