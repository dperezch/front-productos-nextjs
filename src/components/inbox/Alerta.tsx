"use client";
import { useProductosPorVencer } from "@/app/hooks/useProductosPorVencer";
import MiniLoading from "../MiniLoading";
import SinAlerta from "../SinAlerta";

export type ProductoVencido = Producto & {
  diasFaltantes: number;
  descuento: number;
  descuento2: number;
};

const Alerta = () => {
  const { error, data, isLoading, productosPorVencer } =
    useProductosPorVencer();

  return (
    <>
      {isLoading ? (
        <MiniLoading />
      ) : productosPorVencer.length > 0 ? (
        productosPorVencer.map((producto: ProductoVencido) => {
          if (producto.diasFaltantes <= 15) {
            return (
              <div
                className=" mx-5 flex items-center p-4 mb-4 text-sm  text-red-800 rounded-lg bg-red-100 dark:bg-red-500 border-red-500 border dark:border-red-900 dark:text-slate-100"
                role="alert"
                key={producto.id}
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-semibold">Alerta de vencimiento! </span>
                  Tienes {producto.cantidad} productos de "{producto.nombre}"
                  sku: {producto.sku} que vencen en{" "}
                  {producto.diasFaltantes.toFixed(0)} días! , se recomienda
                  vender a ${producto.descuento} como precio oferta.
                </div>
              </div>
            );
          } else if (
            producto.diasFaltantes > 15 &&
            producto.diasFaltantes <= 30
          ) {
            return (
              <div
                className=" mx-5 flex items-center p-4 mb-4 text-sm  text-yellow-800 rounded-lg bg-yellow-100 dark:bg-yellow-300 border-yellow-500 border dark:border-yellow-900 dark:text-slate-900"
                role="alert"
                key={producto.id}
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-semibold">Alerta de precaución! </span>
                  Al producto "{producto.nombre}", sku: {producto.sku}, le
                  quedan {producto.diasFaltantes.toFixed(0)} días para vencer!,
                  se recomienda vender a ${producto.descuento2} como precio
                  oferta.
                </div>
              </div>
            );
          }
        })
      ) : (
        <SinAlerta texto="no hay productos con vencimiento"/>
      )}
    </>
  );
};

export default Alerta;
