import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function postProducto(producto: PendingProduct) {
  const { data: session, status } = useSession();
  const [error, setError] = useState<any>();
  const [product, setproduct] = useState<Producto>();
  
  useEffect(() => {
    async function fetchData(){
        try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/productos`,
              {
                method: "POST",
                body: JSON.stringify(producto),
                headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session?.user?.token}`,
                },
              }
            );
            const newProducto = await res.json();
            setproduct(newProducto);
          } catch (e) {
            setError(e);
            console.log("ocurrio un error: ", error);   
          }
    }
    if (status === "authenticated") {
        fetchData();
        console.log("nuevo producto desde database: ", product); 
      }
  }, [])
  

  return { error, product };
}
