import mongoose from "mongoose";
mongoose

.connect(process.env.MONGODB)
.then((dato)=>{
    console.log("está conectado a la base de datos");
}).catch((error)=>{
    console.log("no se conectó a la base de datos");
});