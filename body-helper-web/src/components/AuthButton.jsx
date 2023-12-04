"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "react-bootstrap";

import React from "react";

const AuthButton = () => {
  return (
    <Button variant="dark" size="md" onClick={() => signIn()}>
      Sign IN
    </Button>
  );
};

export default AuthButton;
