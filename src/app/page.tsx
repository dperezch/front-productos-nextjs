"use client";

import { useSession } from "next-auth/react";
import LoginPage from "./login/page";

const HomePage = () => {

  const { data: session, status } = useSession();

  /* if (status === "loading") {
    return <p>Loading...</p>;
  } */

  if (session) {
    return (
      <>
        AQUI VA EL CODIGO NORMAL
      </>
    );
  }

  return (
      <LoginPage />
  )
}

export default HomePage