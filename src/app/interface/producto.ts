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