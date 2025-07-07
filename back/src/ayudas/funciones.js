import jwt from 'jsonwebtoken'; // con el metodo de sing creamos el token, con el metodo de payload son los daos que queremos firmar dentro del token, la llave secreta es la llave que solo el servidor conoce el cual es crucial para verificar la autenticidad, y los 30 seg es el tiempo en el que expira el token.

export function generarToken(payload){
    return new Promise((resolver, rechazar)=>{
        jwt.sing(payload, 'llave secreta', {expiresIn: '30s'},(error,token)=>{
            if (error) {
                rechazar(error);
            } else {
                resolver(token);
            }
        });
    });
}

export function verificarToken(token){
    return new Promise((resolver, rechazar)=>{
        jwt.verify(token, 'llave secreta', (error, decodificado)=>{
            if (error) {
                rechazar(error);
            } else {
                resolver(decodificado)
            }
        });
    });
}