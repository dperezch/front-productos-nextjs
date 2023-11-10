"use client";

import Loading from "@/components/Loading";
import Lista from "@/components/productos/Lista";
import { useSession } from "next-auth/react";

const Products = () => {
  const { status } = useSession();
 
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="mt-10 ">
        <Lista/>
      </div>
    </>
  );
};

export default Products;
