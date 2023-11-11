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
import { useState } from "react";

const AddProduct = () => {
  const { data: dataMarcas, error: errorMarcas } = useFetchDatos("/marcas");
  const { data: dataCategorias, error: errorCategorias } =
    useFetchDatos("/categorias");
  const { data: dataProveedores, error: errorProveedores } =
    useFetchDatos("/proveedores");
  const [openModal, setOpenModal] = useState(false);
  const [sku, setSku] = useState<string>("");
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

  return (
    <div className="p-5">
      <Button onClick={() => setOpenModal(true)}>Agregar Producto</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-5">
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
              <TextInput id="nombre" placeholder="nombre" required />
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
              {selectedDate && (
                <p>Fecha seleccionada: {selectedDate.toLocaleDateString()}</p>
              )}
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="marca" value="Marca" />
              </div>
              <div className="flex row justify-between">
                <Dropdown label="Marcas">
                  {
                    dataMarcas? dataMarcas.map((marca:Marca)=>(
                      <Dropdown.Item onClick={() => handleSelectMarca(`${marca.nombre}`)} key={marca.id}>
                        {marca.nombre}
                      </Dropdown.Item>
                    )): (<p>{errorMarcas}</p>)
                  }
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
                {
                    dataCategorias? dataCategorias.map((categoria:Categoria)=>(
                      <Dropdown.Item onClick={() => handleSelectCategoria(`${categoria.nombre}`)} key={categoria.id}>
                        {categoria.nombre}
                      </Dropdown.Item>
                    )): (<p>{errorCategorias}</p>)
                  }
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
                {
                    dataProveedores? dataProveedores.map((proveedor:Proveedor)=>(
                      <Dropdown.Item onClick={() => handleSelectProveedor(`${proveedor.nombre}`)} key={proveedor.id}>
                        {proveedor.nombre}
                      </Dropdown.Item>
                    )): (<p>{errorProveedores}</p>)
                  }
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
              <Button className="w-full" color="blue">
                Enviar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddProduct;
