"use client";

import { useSession } from "next-auth/react";
import LoginPage from "./login/page";
import { useProductosPorVencer } from "./hooks/useProductosPorVencer";

const HomePage = () => {

  const { data: session, status } = useSession();
  const {error, data, isLoading, productosPorVencer} = useProductosPorVencer();
  
  if (session && productosPorVencer) {
    return (
      <div className="sm:ml-64">AQUI VA EL CODIGO</div>
    );
  }

  return (
      <LoginPage />
  )
}

export default HomePage