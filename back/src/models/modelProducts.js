import {Schema, model} from 'mongoose';

const esquemaProducto = new Schema({
    tipo: {type: String, required: true},
    marca: {type: String, required: true},
    precio: {type: Number, required: true},
    color: {type: String, required: true},
    imagen: {type: String, required: true},
},
{
    versionKey: false, //Se usa para el control de las versiones internas de los documentos, añade por defecto un campo donde trae una version de lo que subimos.
    timestamps: true, // lo que hace es que agrega dos campos al esquema automaticamente, 1 la fecha y hora en la que se creo el doc y 2 la fecha y hora de la ultima actualización del documento o producto.

}
);

export default model ('productos', esquemaProducto);