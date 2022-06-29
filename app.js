const express = require("express");  //requerimos el paquete express
const app = express();

const path = require ("path");  //path unifica las rutas dentro de los sistemas operatvos((direcciones))
const publicPath = path.resolve(__dirname, "./public"); //le indicamos a path que resuelva la siguiente ruta

const routes = require("./routes/main");

app.use(express.static(publicPath));  //usamos la funcion static de express, que recibe como parametro la ruta a la carpeta public
app.set("view engine", "ejs");

const PORT = 3000;
app.listen(PORT, () => console.log("Servidor ejecutándose en el puerto ",PORT));


app.use("/", routes);

