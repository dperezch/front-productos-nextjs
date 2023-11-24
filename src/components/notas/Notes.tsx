"use client";
import { useEffect, useState } from "react";
import SinAlerta from "../SinAlerta";
interface Tarea {
  tarea: string;
  estado: boolean;
}
const Notes = () => {
  const [arrayTareas, setArrayTareas] = useState<Tarea[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("notas")) {
      const notas = JSON.parse(localStorage.getItem("notas") || "");
      console.log(notas);

      // Actualizar el estado con las notas directamente, no como parte de un nuevo array
      setArrayTareas(notas);
    } else {
      console.log("no existen notas");
      // Si no hay notas en el localStorage, establecer un array vacío como valor inicial
      localStorage.setItem("notas", JSON.stringify([]));
    }
  }, []); // Asegúrate de que el efecto solo se ejecute una vez al montar el componente

  const agregarTarea = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validar que la nueva tarea no esté vacía
    if (nuevaTarea.trim() === "") {
      alert("Por favor ingrese una tarea válida");
      return;
    }

    // Crear la nueva tarea
    const nuevaTareaObj: Tarea = {
      tarea: nuevaTarea,
      estado: false,
    };

    // Actualizar el estado con la nueva tarea
    setArrayTareas([...arrayTareas, nuevaTareaObj]);

    // Actualizar el localStorage
    localStorage.setItem(
      "notas",
      JSON.stringify([...arrayTareas, nuevaTareaObj])
    );

    // Limpiar el campo del input
    setNuevaTarea("");
  };

  const tacharTarea = (index: number) => {
    // Crear una copia del array de tareas
    const nuevasTareas = [...arrayTareas];

    // Cambiar el estado de la tarea en la posición especificada
    nuevasTareas[index].estado = !nuevasTareas[index].estado;

    // Actualizar el estado con las tareas modificadas
    setArrayTareas(nuevasTareas);

    // Actualizar el localStorage
    localStorage.setItem("notas", JSON.stringify(nuevasTareas));
  };

  const eliminarTarea = (index: number) => {
    // Crear una copia del array de tareas
    const nuevasTareas = [...arrayTareas];

    // Eliminar la tarea en la posición especificada
    nuevasTareas.splice(index, 1);

    // Actualizar el estado con las tareas modificadas
    setArrayTareas(nuevasTareas);

    // Actualizar el localStorage
    localStorage.setItem("notas", JSON.stringify(nuevasTareas));
  };

  return (
    <div className="p-5">
      <form onSubmit={agregarTarea} className="mb-5 grid grid-cols-7 gap-4">
        <div className="col-start-1 col-end-7">
          <input
            type="text"
            id="large-input"
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-white sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Añadir nota o tarea..."
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
          />
        </div>
        <div className="col-start-7">
          <button
            type="submit"
            className="p-4 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Agregar
          </button>
        </div>
      </form>
      {arrayTareas.length > 0 ? (
        arrayTareas.map((tarea, index) => (
          <div
            className="bg-white shadow dark:bg-gray-700 rounded-lg my-4"
            key={index}
          >
            <div className="p-4 flex row justify-between items-center">
              <div>
                {tarea.estado ? (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                )}
              </div>
              <p
                className={` ${
                  tarea.estado ? "line-through" : ""
                }  font-semibold`}
              >
                {" "}
                {tarea.tarea}{" "}
              </p>
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  onClick={() => tacharTarea(index)}
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  {tarea.estado ? "Realizar" : "Realizado"}
                </button>

                <button
                  onClick={() => eliminarTarea(index)}
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <SinAlerta texto="no hay notas" />
      )}
    </div>
  );
};

export default Notes;
