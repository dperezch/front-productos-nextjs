"use client";
import useFetchDatos from "@/app/hooks/useFetchDatos";
import MiniLoading from "../MiniLoading";

const Alerta = () => {
  const { error, data, isLoading } = useFetchDatos("/productos");
  const today = new Date();

  return (
    <>
      {isLoading ? (
        <MiniLoading />
      ) : (
        data?.map((producto: Producto) => {
          if (producto.fecha_vencimiento) {
            const fechaVencimiento = new Date(producto.fecha_vencimiento);
            const diferencia = fechaVencimiento.getTime() - today.getTime();
            const mseg_dia = 1000 * 60 * 60 * 24;
            const diasFaltantes = diferencia / mseg_dia;
            let descuento = producto.precio_venta * 0.8;
            if (diasFaltantes <= 30) {
              return (
                <div
                  className=" mx-5 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-300 dark:bg-red-500 dark:text-slate-100"
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
                    <span className="font-semibold">Alerta de vencimiento!   </span>
                      Al producto "{producto.nombre}" le quedan {diasFaltantes.toFixed(0)} días para vencer!, se recomienda vender a ${descuento} como precio oferta
                  </div>
                </div>
              );
            }
          }
        })
      )}
    </>
  );
};

export default Alerta;
