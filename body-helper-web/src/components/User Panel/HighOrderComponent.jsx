import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";

const HighOrderComponent = (WrappedPage) => {
  return (props) => {
    const [isSession, setIsSession] = useState(undefined);
    const router = useRouter();
    useEffect(() => {
      const checkSession = async () => {
        try {
          const session = await getSession();
          setIsSession(session ? true : false);
        } catch (error) {
          console.error("Error checking session:", error);
          setIsSession(false);
        }
      };

      checkSession();
    }, []);

    if (isSession === undefined) {
      return <Loader />;
    }

    if (!isSession) {
      const router = useRouter();
      setTimeout(() => {
        router.push("/");
      }, 500);
      return null;
    }

    return <WrappedPage {...props} />;
  };
};

export default HighOrderComponent;
