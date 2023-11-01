"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface producto {
  id: number;
  sku: number;
  nombre: string;
  cantidad: number;
  precio_venta: number;
  precio_compra: number;
  fecha_compra: Date;
  fecha_vencimiento: Date;
  marca: object;
  proveedor: object;
  categoria: object;
}

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [arrayProductos, setarrayProductos] = useState([])

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(session);

  const getProductos = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/productos`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
        }
    })
    const data = await res.json();
    console.log(data);
    setarrayProductos(data)
    
  }

  return (
    <div className="sm:ml-64">
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
        <button
            onClick={getProductos}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        >
            Get productos
        </button>

        {
          arrayProductos.map((producto:producto)=>(
            <p key={producto.id}>{producto.nombre}</p>
          ))
        }
    </div>
  );
};
export default Dashboard;
