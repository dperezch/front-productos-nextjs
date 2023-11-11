"use client";

import Loading from "@/components/Loading";
import AddProduct from "@/components/productos/AddProduct";
import Lista from "@/components/productos/Lista";
import { useSession } from "next-auth/react";

const Products = () => {
  const { status } = useSession();
 
  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="sm:ml-64 mt-14 ">
        <AddProduct/>
        <Lista/>
      </div>
    </>
  );
};

export default Products;
