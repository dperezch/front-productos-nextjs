"use client";

import Loading from "@/components/Loading";
import Filtrador from "@/components/productos/Filtrador";
import { useSession } from "next-auth/react";

const Products = () => {
  const { status } = useSession();
 
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-10 ">
        <Filtrador/>
      </div>
    </>
  );
};

export default Products;
