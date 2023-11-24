import { BadgeContext } from "@/context/BadgeContext";
import {
  useContext,
  useEffect,
  useMemo,
} from "react";
import useFetchDatos from "./useFetchDatos";

export type ProductoVencido = Producto & {
  diasFaltantes: number;
  descuento: number;
  descuento2: number;
};


export const useProductosPorVencer = () => {
    const { setBadge } = useContext(BadgeContext) as any;
    const { error, data, isLoading } = useFetchDatos("/productos");
    const today = new Date();
  
    const calcularProductosPorVencer = (productos: Producto[]) => {
      return productos
        .filter((producto) => producto.fecha_vencimiento)
        .map((producto: Producto) => {
          const fechaVencimiento = new Date(producto.fecha_vencimiento);
          const diferencia = fechaVencimiento.getTime() - today.getTime();
          const mseg_dia = 1000 * 60 * 60 * 24;
          const diasFaltantes = diferencia / mseg_dia;
          const descuento = producto.precio_venta * 0.8;
          const descuento2 = producto.precio_venta * 0.9;
  
          return {
            ...producto,
            diasFaltantes,
            descuento,
            descuento2,
          };
        })
        .filter((producto) => producto.diasFaltantes <= 30);
    };
  
    const nuevosProductosPorVencer = useMemo(() => {
      return calcularProductosPorVencer(data || []);
    }, [data, today]);
  
    useEffect(() => {
      setBadge(nuevosProductosPorVencer.length);
    }, [nuevosProductosPorVencer, setBadge]);
  
    return { error, data, isLoading, productosPorVencer: nuevosProductosPorVencer };
  };