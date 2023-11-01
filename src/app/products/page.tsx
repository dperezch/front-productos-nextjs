"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Producto {
  id: number;
  sku: number;
  nombre: string;
  cantidad: number;
  precio_venta: number;
  precio_compra: number;
  fecha_compra: Date;
  fecha_vencimiento: Date;
  marca: Marca;
  proveedor: Proveedor;
  categoria: Categoria;
}

interface Marca {
  id: number;
  nombre: string;
}

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  telefono: number;
  email: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

const Products = () => {
  const { data: session, status } = useSession();
  const [arrayProductos, setArrayProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/productos`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${session?.user?.token}`,
            },
          }
        );
        const data = await res.json();
        setArrayProductos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="sm:ml-64 h-screen dark:bg-gray-800 dark:text-gray-400">
        <div className="p-5">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SKU
                </th>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio Neto
                </th>
                <th scope="col" className="px-6 py-3">
                  Vencimiento
                </th>
                <th scope="col" className="px-6 py-3">
                  Categoria
                </th>
                <th scope="col" className="px-6 py-3">
                  Marca
                </th>
                <th scope="col" className="px-6 py-3">
                  Proveedor
                </th>
              </tr>
            </thead>
            <tbody>
              {arrayProductos.map((producto: Producto) => (
                <tr
                  key={producto.id}
                  className="bg-white border-b dark:bg-gray-700 dark:border-gray-800"
                >
                  <td className="px-6 py-4 dark:text-white">{producto.sku}</td>
                  <td className="px-6 py-4 dark:text-white">
                    {producto.nombre}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {producto.cantidad}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {producto.precio_venta}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {producto.precio_compra}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {producto.fecha_vencimiento
                      ? new Date(
                          producto.fecha_vencimiento
                        ).toLocaleDateString()
                      : "Sin fecha registrada"}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {producto.categoria.nombre}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {producto.marca.nombre}
                  </td>
                  <td className="px-6 py-4 dark:text-white">
                    {producto.proveedor.nombre}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
