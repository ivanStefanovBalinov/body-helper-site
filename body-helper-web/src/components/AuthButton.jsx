"use client";
import { Session } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "react-bootstrap";

import React from "react";

const AuthButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />{" "}
        <Button variant="dark" size="md" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <Button variant="dark" size="md" onClick={() => signIn()}>
      Sign IN
    </Button>
  );
};

export default AuthButton;
