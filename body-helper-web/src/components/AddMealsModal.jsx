"use client";
import React from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const AddMealsModal = ({ onClick }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <h2>Add Meals</h2>
        <Button variant="dark" onClick={onClick}>
          X
        </Button>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default AddMealsModal;
