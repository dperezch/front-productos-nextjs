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
      <div className="sm:ml-64">AQUI VA EL CODIGO</div>
    );
  }

  return (
      <LoginPage />
  )
}

export default HomePage