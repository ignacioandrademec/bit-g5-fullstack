export interface Productos {
    _id?: string;
    tipoProducto: string;
    serialProducto: string;
    marcaProducto: string;
    precioProducto: number;
    colorProducto: string;
    imagen: string;
}

export interface ApiProductos{
    result: string;
    message: string;
    data: Productos[];
}