"use client";
import useFetchDatos from "@/app/hooks/useFetchDatos";
import { useState, ChangeEvent } from "react";


interface Opciones {
  id: number;
  nombre: string;
}

const options: Opciones[] = [
  { id: 1, nombre: "Nombre" },
  { id: 2, nombre: "SKU" },
  { id: 3, nombre: "Categoría" },
  { id: 4, nombre: "Marca" },
  { id: 5, nombre: "Proveedor" },
];

const Filtrador = () => {
  const { isLoading, error, data } = useFetchDatos("/productos");

  const [filtro, setFiltro] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<number>(1);

  const [arrayFiltrado, setArrayFiltrado] = useState<Producto[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value.trim());
    if (selectedOption === 1) {
      setArrayFiltrado(
        data.filter((item: Producto) => item.nombre.includes(filtro))
      );
      console.log("filtrado por nombre: ", arrayFiltrado);
    }
    if (selectedOption === 2) {
      const filtroNumber = parseInt(filtro);
      setArrayFiltrado(
        data.filter((item: Producto) => item.sku.toString().includes(filtro))
      );
      console.log("filtrado por sku: ", arrayFiltrado);
    }
    if(selectedOption === 3){
      setArrayFiltrado(
        data.filter((item: Producto) => item.categoria.nombre.includes(filtro))
      );
      console.log("filtrado por categoria: ", arrayFiltrado);
    }
    if(selectedOption === 4){
      setArrayFiltrado(
        data.filter((item: Producto) => item.marca.nombre.includes(filtro))
      );
      console.log("filtrado por marca: ", arrayFiltrado);
    }
    if(selectedOption === 5){
      setArrayFiltrado(
        data.filter((item: Producto) => item.proveedor.nombre.includes(filtro))
      );
      console.log("filtrado por proveedor: ", arrayFiltrado);
    }
  };

  const handleChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  return (
    <div>
      <div className="sm:ml-64 p-5">
        <form>
          <div className="flex ">
            <select
              value={selectedOption}
              onChange={handleChangeOption}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-l-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {options.map((opcion) => (
                <option
                  key={opcion.id}
                  value={opcion.id}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white bg-slate-500"
                >
                  {opcion.nombre}
                </option>
              ))}
            </select>

            <div className="relative w-full">
              <input
                type="text"
                value={filtro}
                placeholder="Filtrar por productos, marcas, categorias, proveedor..."
                onChange={handleChange}
                className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              />
            </div>
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="sm:ml-64">
          <div className="ml-8 mt-8  flex flex-row items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <p>Cargando Lista ...</p>
          </div>
          
        </div>
      ) : (
        <div className="mt-10 ">
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
                      Stock
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
                  {arrayFiltrado.length > 0
                    ? arrayFiltrado.map((producto: Producto) => (
                        <tr
                          key={producto.id}
                          className="bg-white border-b dark:bg-gray-700 dark:border-gray-800"
                        >
                          <td className="px-6 py-4 dark:text-white">
                            {producto.sku}
                          </td>
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
                      ))
                    : data &&
                      data.map((producto: Producto) => (
                        <tr
                          key={producto.id}
                          className="bg-white border-b dark:bg-gray-700 dark:border-gray-800"
                        >
                          <td className="px-6 py-4 dark:text-white">
                            {producto.sku}
                          </td>
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
        </div>
      )}
    </div>
  );
};

export default Filtrador;
