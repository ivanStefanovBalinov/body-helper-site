"use client";
import { Tab, Table, Tabs } from "react-bootstrap";

const AdminTabs = ({ recipesData, articlesData, usersData }) => {
  return (
    <>
      <Tabs
        defaultActiveKey="profile"
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
              {articlesData.map((article, index) => (
                <tr key={article.id}>
                  <th scope="row">{index + 1} </th>
                  <td>{article.title}</td>
                  <td>{article.author}</td>
                  <td>{article.rating}</td>
                  <td>{article.comments}</td>
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
          Tab content for Profile
        </Tab>
        <Tab eventKey="recipes" title="Recipes">
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
};

export default AdminTabs;
