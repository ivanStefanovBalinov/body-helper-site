"use client";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ChangePasswordForm = ({ email }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const onChangeHandler = (e) =>
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New Password doesn't match.");
      return;
    }

    const data = {
      email: email,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
    };

    await fetch("https://body-helper.vercel.app/api/users/changepassword", {
      method: "PUT",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        toast.success("Password Changed!");
      } else {
        toast.error("Password Changing Failed!");
      }
    });

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Form className="user-characteristics my-4" onSubmit={submitHandler}>
      <h4>Change Password</h4>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          value={formData.currentPassword}
          placeholder="Enter your current password"
          name="currentPassword"
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Enter your new password"
          value={formData.newPassword}
          name="newPassword"
          onChange={onChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Confirm new password"
          value={formData.confirmPassword}
          name="confirmPassword"
          onChange={onChangeHandler}
        />
      </Form.Group>

      <Button variant="dark" type="submit">
        Change
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
