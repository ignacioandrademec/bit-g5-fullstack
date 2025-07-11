import { uploadSingleImage} from '../middlewares/upload.js';
import fs from 'fs';
import path from 'path';
import modelProducts from '../models/modelProducts.js';



const controladorProductos = {
    creacionProducto: async (sol, res)=>{
        try {
            uploadSingleImage(sol, res, async(error)=>{
                if(error){
                    res.json({
                        result: 'mistake',
                        message: 'An error occurred while uploading the image',
                        data: error,
                    });
                }
                const newProduct = new modelProducts({
                    tipoProducto:sol.body.tipoProducto,
                    serialProducto:sol.body.serialProducto,
                    marcaProducto:sol.body.marcaProducto,
                    precioProducto:sol.body.precioProducto,
                    colorProducto:sol.body.colorProducto,
                    imagen:sol.file.filename,
                });

                const saveProduct = await newProduct.save();
                res.json({
                    result: 'fine',
                    message: 'Product create',
                    data: saveProduct._id,
                })
            })
            
        } catch (error) {
            res.json({
                result: 'mistake',
                message: 'An error occurred creating the product',
                data: error,
            })
        }
    },

    leerProducto : async (sol , res)=>{
        try{
            const productFound = await modelProducts.findById(sol.params.id);
            if(productFound._id){
                res.json({
                    result:'fine',
                    message: 'Product read',
                    data: productFound,
                });
            }

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred reading the product',
                data: error,
            });
        }
    },

    leerTodosProductos : async(sol , res)=>{
        try{
            const allProductsFound = await modelProducts.find();
            res.json({
                result: 'fine',
                message: ' Products found',
                data: allProductsFound
            });
        }catch(error){
            res.json({
                result: ' mistake',
                message: 'An error occurred reading all products',
                data: error,
            });
        }   
    },
    
    actualizarProducto : async(sol , res)=>{
        try{
            uploadSingleImage(sol,res,async(error)=>{
                if(error){
                    res.json({
                        result: ' mistake',
                        message: 'Error uploading image during update',
                        data: error,
                    });
                }

                const productExistente = await modelProducts.findById(sol.params.id);
                if(!productExistente){
                    return res.status(404).json({
                        result: 'mistake',
                        message: 'product not found',
                        data: null,
                    });
                }

                if(sol.file){
                    const rutaImagenAntigua = path.join('imagenes',
                        productExistente.imagen
                    );
                    if (fs.existsSync(rutaImagenAntigua)){
                        fs.unlinkSync(rutaImagenAntigua);
                    }
                }

                const nuevosDatos = {
                    tipoProducto:sol.body.tipoProducto,
                    serialProducto:sol.body.serialProducto,
                    marcaProducto:sol.body.marcaProducto,
                    precioProducto:sol.body.precioProducto,
                    colorProducto:sol.body.colorProducto,
                    imagen:sol.file ? sol.file.filename : productExistente.imagen,
                };

                const productoActualizado = await modelProducts.findByIdAndUpdate(
                    sol.params.id,
                    nuevosDatos,
                    {new: true}
                );
                res.json({
                    result:'fine',
                    message:'product update',
                    data: productoActualizado,
                });
            })

        }catch(error){
            res.json({
                result: ' mistake',
                message: 'An error occurred updating all products',
                data: error,
            }); 
        }
    },


    eliminarProducto : async (sol, res)=>{
        try {
            const productDelete = await modelProducts.findByIdAndDelete(sol.params.id);

            if(productDelete){
                const rutaImagen = path.join('imagenes', productDelete.imagen);
                if(fs.existsSync(rutaImagen)){
                    fs.unlinkSync(rutaImagen);
                }
                res.json({
                    result: 'fine',
                    message: 'Product delete',
                    data: productDelete._id,
                })
            }else{
                res.status(404).json({
                    result: 'mistake',
                    message: 'Product not found',
                    data: error,
                });
            }

        } catch (error) {
            res.json({
                result: 'Mistake',
                message: 'An error ocurred deleting all products',
                data: error,
            })
        }
    }

}

export default controladorProductos;