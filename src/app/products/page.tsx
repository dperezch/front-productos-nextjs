"use client";

import Loading from "@/components/Loading";
import AddProduct from "@/components/productos/AddProduct";
import Lista from "@/components/productos/Lista";
import { useSession } from "next-auth/react";
import useFetchDatos from "../hooks/useFetchDatos";
import { useState } from "react";

const Products = () => {
  const { status } = useSession();
  const { isLoading, error, data } = useFetchDatos("/productos");
  const [arrayFiltrado, setArrayFiltrado] = useState<Producto[]>([]);
  const [arrayOrdenado, setArrayOrdenado] = useState<Producto[]>([]);

  const addNewProduct = (newProduct: Producto) => {
    const indice = data.findIndex((item: Producto) => {
      if(item.id === newProduct.id)
      {return true}
    })
    if(indice){
      data.splice(indice,1,newProduct);
      setArrayFiltrado(data);
      return
    }
    setArrayFiltrado([...data, newProduct]);
  };

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="sm:ml-64 mt-14 ">
        <AddProduct addNewProduct={addNewProduct} data={data} />
        <Lista
          error={error}
          data={data}
          isLoading={isLoading}
          arrayFiltrado={arrayFiltrado}
          setArrayFiltrado={setArrayFiltrado}
          arrayOrdenado={arrayOrdenado}
          setArrayOrdenado={setArrayOrdenado}
        />
      </div>
    </>
  );
};

export default Products;
