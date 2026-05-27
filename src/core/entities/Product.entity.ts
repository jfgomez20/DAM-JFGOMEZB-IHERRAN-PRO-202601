export interface Product {
    id?: number;
    nombre: string;
    sku: string;
    stock: number;
    costoCompra: number;
    precioVenta: number;
    descripcion?: string;
    ganancia: number;
}