const express = require("express");  //requerimos el paquete express
const session = require('express-session'); //requerimos el paquete express-session
const app = express();

const path = require ("path");  //path unifica las rutas dentro de los sistemas operativos ((direcciones))
const publicPath = path.resolve(__dirname, "./public"); //le indicamos a path que resuelva la siguiente ruta

const routes = require("./routes/main");


app.use(express.static(publicPath));  //usamos la funcion static de express, que recibe como parametro la ruta a la carpeta public
app.set("view engine", "ejs");

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret: 'Esto es un secreto',
    resave: false,
    saveUninitialized: false
}))

app.use("/", routes);

const PORT = 3000;
app.listen(PORT, () => console.log("Servidor ejecutándose en el puerto ", PORT));

