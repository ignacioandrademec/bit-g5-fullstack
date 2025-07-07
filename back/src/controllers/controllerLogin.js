import bcrypt from "bcryptjs";
import { generarToken, verificarToken } from "../ayudas/funciones";
import modelUsers from "../models/modelUsers";

const controllerLogin = {
    iniciarSesion: async(sol, res)=>{
        try {
            const {username, password}= sol.body;
            const userFound = await modelUsers.findOne({
                email: username,
            });

            const contraseñaValidada = await bcrypt.compare(
                password, // este es el que ingresa el usuario cuando se va a loguear
                userFound.password // Valida la contraseña cifrada almacenada en la base de datos
            )

            if(contraseñaValidada){
                const token = await generarToken({
                    id: userFound._id,
                    name: userFound.name
                });

                res.json({
                    result: 'fine',
                    message: 'Access ready',
                    data: token,
                })
            }

        } catch (error) {
            res.json({
                result: 'mistake',
                message: 'An error occurred during the user login',
                data: error,
            })
        }
    }
}
