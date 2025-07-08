import path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import routerUsers from "./router/routerUsers.js";
import routerProducts from "./router/routerProducts.js";
import routerLogin from "./router/routerLogin.js";

const servidor = express();
servidor.use(cors());
servidor.use(morgan("dev"));
servidor.use(express.json());
servidor.use('/users', routerUsers);
servidor.use('/products', routerProducts);
servidor.use('/imagenes', express.static(path.resolve('imagenes')));
servidor.use('/inicio-sesion',routerLogin);

servidor.get('/',(sol, res)=>{
    res.status(404).send("No encontrado");
});

export default servidor;

