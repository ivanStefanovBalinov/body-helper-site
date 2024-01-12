import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";

const HighOrderComponent = (WrappedPage) => {
  return (props) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
      if (!session && status !== "authenticated") {
        router.push(
          "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
        );
      }
    }, [session, status]);

    return session ? (
      <WrappedPage {...props} />
    ) : (
      <Container className="loader">
        <div>
          <Spinner animation="border" role="status" variant="dark" />
        </div>
      </Container>
    );
  };
};

export default HighOrderComponent;
