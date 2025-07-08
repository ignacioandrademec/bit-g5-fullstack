import bcrypt from "bcryptjs";
import { generarToken, verificarToken } from "../ayudas/funciones.js";
import modelUsers from "../models/modelUsers.js";

const controllerLogin = {
    iniciarSesion: async (sol, res)=>{
        try{
            const {username, password}= sol.body;
            const userFound = await modelUsers.findOne({
                email: username,
            });

            const constrasenaValidada = await bcrypt.compare(
                password,
                userFound.password
            );

            if(constrasenaValidada){
                const token = await generarToken({
                    id: userFound._id,
                    name: userFound.name
                });

                res.json({
                    result: 'fine',
                    message: 'Access ready',
                    data: token,
                });
            }else{
                res.json({
                    result: 'mistake',
                    message: 'Access denied',
                    data: null,
                });
            }

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'An error occurred during the users login',
                data: error,
            })
        }
    },

    validarToken:async( sol , res)=>{
        try{
            const token = sol.params.token;
            const decodificado = await verificarToken(token);

            if(decodificado && decodificado.id){
                res.json({
                    result: 'fine',
                    message: 'Token is valid',
                    data: decodificado,
                });
            }else{
                res.json({
                    result: 'Mistake',
                    message: 'Token invalid',
                    data: null,
                });
            }

        }catch(error){
            res.json({
                result: 'mistake',
                message: 'Occurred mistake token invalid',
                data: error,
            });
        }
    }
};

export default controllerLogin;