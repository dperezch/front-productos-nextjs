"use client";
import { useState, ChangeEvent, Dispatch, SetStateAction} from "react";
import SvgTabla from "./SvgTabla";
import MiniLoading from "../MiniLoading";

interface Opciones {
  id: number;
  nombre: string;
}

interface ListaProps {
  data: Producto[];
  isLoading: boolean;
  error: any;
  arrayFiltrado: Producto[];
  arrayOrdenado: Producto[];
  setArrayFiltrado: Dispatch<SetStateAction<Producto[]>>
  setArrayOrdenado: Dispatch<SetStateAction<Producto[]>>
}

const options: Opciones[] = [
  { id: 1, nombre: "Nombre" },
  { id: 2, nombre: "SKU" },
  { id: 3, nombre: "Categoría" },
  { id: 4, nombre: "Marca" },
  { id: 5, nombre: "Proveedor" },
];

const Lista = ({error, data, isLoading, arrayFiltrado, setArrayFiltrado, arrayOrdenado, setArrayOrdenado}: ListaProps) => {
  
  const [filtro, setFiltro] = useState<string>("");

  const [selectedOption, setSelectedOption] = useState<number>(1);


  const handleChangeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    setFiltro(inputValue);

    let filteredData = data;

    switch (selectedOption) {
      case 1:
        filteredData = data.filter((item: Producto) =>
          item.nombre.includes(inputValue)
        );
        break;
      case 2:
        filteredData = data.filter((item: Producto) =>
          item.sku.toString().includes(inputValue)
        );
        break;
      case 3:
        filteredData = data.filter((item: Producto) =>
          item.categoria.nombre.includes(inputValue)
        );
        break;
      case 4:
        filteredData = data.filter((item: Producto) =>
          item.marca.nombre.includes(inputValue)
        );
        break;
      case 5:
        filteredData = data.filter((item: Producto) =>
          item.proveedor.nombre.includes(inputValue)
        );
        break;
      default:
        break;
    }

    setArrayFiltrado(filteredData);
    setArrayOrdenado(filteredData);
    console.log(
      `filtrado por ${
        options.find((opt) => opt.id === selectedOption)?.nombre
      }: `,
      filteredData
    );
  };

  const handleSorting = (
    event: React.MouseEvent<HTMLTableCellElement>,
    sortKey: keyof Producto
  ) => {
    console.log(`estoy apretando la tabla ${sortKey}`);
    const sortedArray = [...(arrayOrdenado.length > 0 ? arrayOrdenado : data)];

    switch (sortKey) {
      case "nombre":
        sortedArray.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
        break;
      case "cantidad":
        sortedArray.sort((a, b) => a[sortKey] - b[sortKey]);
        break;
      case "sku":
        sortedArray.sort((a, b) => a[sortKey] - b[sortKey]);
        break;
      case "precio_venta":
        sortedArray.sort((a, b) => a[sortKey] - b[sortKey]);
        break;
      case "precio_compra":
        sortedArray.sort((a, b) => a[sortKey] - b[sortKey]);
        break;
      case "fecha_vencimiento":
        sortedArray.sort((a, b) => {
          const dateA = a[sortKey] ? new Date(a[sortKey]) : null;
          const dateB = b[sortKey] ? new Date(b[sortKey]) : null;

          if (!dateA && !dateB) return 0; // Ambas fechas son nulas
          if (!dateA) return 1; // fechaA es nula, colocar al final
          if (!dateB) return -1; // fechaB es nula, colocar al final

          return dateA.getTime() - dateB.getTime();
        });
        break;
      case "categoria":
        sortedArray.sort((a, b) =>
          a[sortKey].nombre.localeCompare(b[sortKey].nombre)
        );
        break;
      case "marca":
        sortedArray.sort((a, b) =>
          a[sortKey].nombre.localeCompare(b[sortKey].nombre)
        );
        break;
      case "proveedor":
        sortedArray.sort((a, b) =>
          a[sortKey].nombre.localeCompare(b[sortKey].nombre)
        );
        break;
      default:
        break;
    }

    setArrayFiltrado(sortedArray);
  };

  const renderTableRow = (producto: Producto) => (
    <tr
      key={producto.id}
      data-item={producto}
      className="bg-white border-b dark:bg-gray-700 dark:border-gray-800"
    >
      <td className="px-6 py-4 dark:text-white" data-title="sku">
        {producto.sku}
      </td>
      <td className="px-6 py-4 dark:text-white" data-title="nombre">
        {producto.nombre}
      </td>
      <td className="px-6 py-4 dark:text-white" data-title="cantidad">
        {producto.cantidad}
      </td>
      <td className="px-6 py-4 dark:text-white" data-title="precio_venta">
        {producto.precio_venta}
      </td>
      <td className="px-6 py-4 dark:text-white" data-title="precio_compra">
        {producto.precio_compra}
      </td>
      <td className="px-6 py-4 dark:text-white" data-title="fecha_vencimiento">
        {producto.fecha_vencimiento
          ? new Date(producto.fecha_vencimiento).toLocaleDateString()
          : "Sin fecha registrada"}
      </td>
      <td className="px-6 py-4 dark:text-white" data-title="categoria">
        {producto.categoria.nombre}
      </td>
      <td className="px-6 py-4 dark:text-white" data-title="marca">
        {producto.marca.nombre}
      </td>
      <td className="px-6 py-4 dark:text-white" data-title="proveedor">
        {producto.proveedor.nombre}
      </td>
    </tr>
  );

  return (
    <div>
      <div className=" px-5">
        <form onSubmit={(e) => e.preventDefault()}>
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
        <MiniLoading />
      ) : (
        <div className="mt-3 ">
          <div className=" h-screen dark:bg-gray-800 dark:text-gray-400">
            <div className="p-5">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 "
                      onClick={(e) => handleSorting(e, "sku")}
                    >
                      <div className="flex row">
                        SKU
                        <SvgTabla />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={(e) => handleSorting(e, "nombre")}
                    >
                      <div className="flex row">
                        Nombre
                        <SvgTabla />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={(e) => handleSorting(e, "cantidad")}
                    >
                      <div className="flex row">
                        Stock
                        <SvgTabla />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={(e) => handleSorting(e, "precio_venta")}
                    >
                      <div className="flex row">
                        Precio
                        <SvgTabla />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={(e) => handleSorting(e, "precio_compra")}
                    >
                      <div className="flex row">
                        Precio Neto
                        <SvgTabla />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={(e) => handleSorting(e, "fecha_vencimiento")}
                    >
                      <div className="flex row">
                        Vencimiento
                        <SvgTabla />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={(e) => handleSorting(e, "categoria")}
                    >
                      <div className="flex row">
                        Categoria
                        <SvgTabla />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={(e) => handleSorting(e, "marca")}
                    >
                      <div className="flex row">
                        Marca
                        <SvgTabla />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3"
                      onClick={(e) => handleSorting(e, "proveedor")}
                    >
                      <div className="flex row">
                        Proveedor
                        <SvgTabla />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arrayFiltrado.length > 0
                    ? arrayFiltrado.map(renderTableRow)
                    : arrayOrdenado.length > 0
                    ? arrayOrdenado.map(renderTableRow)
                    : data?.map(renderTableRow)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lista;
