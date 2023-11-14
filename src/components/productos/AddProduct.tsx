"use client";

import useFetchDatos from "@/app/hooks/useFetchDatos";
import {
  Button,
  Label,
  Modal,
  TextInput,
  Dropdown,
  Datepicker,
} from "flowbite-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const AddProduct = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<any>();
  const [product, setproduct] = useState<PendingProduct>();
  const { data: dataMarcas, error: errorMarcas } = useFetchDatos("/marcas");
  const { data: dataCategorias, error: errorCategorias } =
    useFetchDatos("/categorias");
  const { data: dataProveedores, error: errorProveedores } =
    useFetchDatos("/proveedores");
  const [openModal, setOpenModal] = useState(false);
  const [sku, setSku] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [cantidad, setCantidad] = useState<string>("");
  const [precio_venta, setPrecio_venta] = useState<string>("");
  const [precio_compra, setPrecio_compra] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [marca, setMarca] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  const [proveedor, setProveedor] = useState<string>("");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleSelectMarca = (e: string) => {
    console.log(e);
    setMarca(e);
  };

  const handleSelectCategoria = (e: string) => {
    console.log(e);
    setCategoria(e);
  };

  const handleSelectProveedor = (e: string) => {
    console.log(e);
    setProveedor(e);
  };

  function onCloseModal() {
    setOpenModal(false);
    setSku("");
  }

  const enviarProducto = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productoPendiente = {
      sku: parseInt(sku),
      nombre: nombre,
      cantidad: parseInt(cantidad),
      precio_venta: parseInt(precio_venta),
      precio_compra: parseInt(precio_compra),
      fecha_vencimiento: selectedDate ? selectedDate : null,
      marca: marca === "" ? null : marca,
      proveedor: proveedor === "" ? null : proveedor,
      categoria: categoria === "" ? null : categoria,
    };

    async function fetchData(){
        try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/productos`,
              {
                method: "POST",
                body: JSON.stringify(productoPendiente),
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
  };

  return (
    <div className="p-5">
      <Button onClick={() => setOpenModal(true)}>Agregar Producto</Button>
      <Modal show={openModal} size="lg" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-5" onSubmit={enviarProducto}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Agregar producto
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="sku" value="SKU" />
              </div>
              <TextInput
                id="sku"
                placeholder="123456789"
                value={sku}
                type="number"
                onChange={(event) => setSku(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nombre" value="Nombre producto" />
              </div>
              <TextInput
                id="nombre"
                placeholder="nombre"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="cantidad" value="Cantidad" />
              </div>
              <TextInput
                id="cantidad"
                placeholder="12.."
                required
                type="number"
                value={cantidad}
                onChange={(event) => setCantidad(event.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="precio" value="Precio de venta" />
              </div>
              <TextInput
                id="precio"
                placeholder="123.."
                required
                type="number"
                value={precio_venta}
                onChange={(event) => setPrecio_venta(event.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="compra" value="Precio neto" />
              </div>
              <TextInput
                id="compra"
                placeholder="123.."
                required
                type="number"
                value={precio_compra}
                onChange={(event) => setPrecio_compra(event.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="Fecha de vencimiento" />
              </div>
              <Datepicker
                language="es-CL"
                onSelectedDateChanged={handleDateChange}
              />
              {/* {selectedDate && (
                <p>Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>
              )} */}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="marca" value="Marca" />
              </div>
              <div className="flex row justify-between">
                <Dropdown label="Marcas">
                  {dataMarcas ? (
                    dataMarcas.map((marca: Marca) => (
                      <Dropdown.Item
                        onClick={() => handleSelectMarca(`${marca.nombre}`)}
                        key={marca.id}
                      >
                        {marca.nombre}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <p>{errorMarcas}</p>
                  )}
                </Dropdown>
                <TextInput
                  id="marca"
                  placeholder="..."
                  readOnly
                  value={marca}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="categoria" value="Categoria" />
              </div>
              <div className="flex row justify-between">
                <Dropdown label="Categorías">
                  {dataCategorias ? (
                    dataCategorias.map((categoria: Categoria) => (
                      <Dropdown.Item
                        onClick={() =>
                          handleSelectCategoria(`${categoria.nombre}`)
                        }
                        key={categoria.id}
                      >
                        {categoria.nombre}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <p>{errorCategorias}</p>
                  )}
                </Dropdown>
                <TextInput
                  id="categoria"
                  placeholder="..."
                  readOnly
                  value={categoria}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="proveedor" value="Proveedor" />
              </div>
              <div className="flex row justify-between">
                <Dropdown label="Proveedores">
                  {dataProveedores ? (
                    dataProveedores.map((proveedor: Proveedor) => (
                      <Dropdown.Item
                        onClick={() =>
                          handleSelectProveedor(`${proveedor.nombre}`)
                        }
                        key={proveedor.id}
                      >
                        {proveedor.nombre}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <p>{errorProveedores}</p>
                  )}
                </Dropdown>
                <TextInput
                  id="proveedor"
                  placeholder="..."
                  readOnly
                  value={proveedor}
                />
              </div>
            </div>

            <div className="w-full">
              <Button className="w-full" color="blue" type="submit">
                Enviar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProduct;
