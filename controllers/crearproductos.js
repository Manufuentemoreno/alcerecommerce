const path = require("path");
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

// Modelos
const Products = db.Products;
const Category = db.Products_categories;

// Comando:
// node cd/src/controllers/crearproductos.js

const productos = [{
    name: "Agua con gas",
    description: "Agua con gas Baja en Sodio Glaciar 1.5 L",
    price: 139.99,
    product_photo: "Agua-Baja-En-Sodio-Glaciar-Con-Gas-15-L-1-240110.webp",
    id: 75,
    category_id: 1,
    special_offer: 1
},
{
    name: "Chocolate Milka",
    description: "Chocolate con leche Milka 150 grs",
    price: 120,
    product_photo: "Chocolate-Milka-Con-Leche-150-Gr-1-26505.webp",
    id: 6,
    category_id: 2,
    special_offer: 0
},
{
    name: "Limpiavidrios Mr Musculo",
    description: "Repuesto Mr Musculo Limpiavirios 900ml",
    price: "88.99",
    product_photo: "Limpiador-Vidrios-Y-Multiuso-Doy-Pack-Mr-Musculo-900-Ml-1-249086.webp",
    id: 7,
    category_id: 3,
    special_offer: 0
},
{
    name: "Leche La Serenisima Zero",
    description: "Leche larga vida zero lactosa La Serenísima 1L ",
    price: "240",
    product_photo: "Leche-Ls-Uat-Pa-Desc-Zero-Lact-For-Vit-1-859051.webp",
    id: 14,
    category_id: 4,
    special_offer: 0
},
{
    name: "Paso de los Toros Pomelo",
    description: "Gaseosa Paso de los toros Pomelo 1.5Lts",
    price: 135.5,
    product_photo: "Gaseosa-Paso-De-Los-Toros-Pomelo-15l-1-248189.webp",
    id: 15,
    category_id: 1,
    special_offer: 1
},
{
    name: "Carne Picada",
    description: "Carne Picada Especial ALCER",
    price: 223,
    product_photo: "Picada-Especial-1-861724.webp",
    id: 17,
    category_id: 5,
    special_offer: 0
},
{
    name: "Coca-Cola Sin Azúcar 1.75Lts",
    price: 223,
    category_id: 1,
    description: "Gaseosa marca Coca-Cola, Sin Azúcar. 1,75lt",
    product_photo: "Gaseosa-Coca-Cola-Sin-Azucar-1-75lt-1-367450.webp",
    id: 18,
    special_offer: 0
},
{
    name: "DogChow Pollo 100gr",
    price: 356,
    category_id: 5,
    special_offer: 1,
    description: "Alimento Para Perros marca Dog-Chow sabor Pollo. Envase 100grs",
    product_photo: "img-1656903138829-DogChow Pollo 100gr.webp",
    id: 19
},
{
    name: "Ayudín Clásica",
    price: 475,
    category_id: 3,
    special_offer: 1,
    description: "Lavandina clásica marca Ayudín. Envase de 2Lts",
    product_photo: "img-1656903217106-Ayudín Clásica.webp",
    id: 20
},
{
    name: "Antitranspirante Rexona Fútbol",
    price: 400,
    category_id: 3,
    description: "Desodorante Antitranspirante Rexona FútbolFanatics En Aerosol 150ml",
    product_photo: "img-1656903272269-Antitranspirante Rexona Fútbol.webp",
    id: 21,
    special_offer: 0
},
{
    name: "Antitranspirante Rexona Invisible",
    price: "420",
    category_id: 3,
    special_offer: "on",
    description: "Desodorante Antitranspirante Rexona Invisible En Aerosol 150ml",
    product_photo: "img-1656903324076-Antitranspirante Rexona Invisible.webp",
    id: 22
},
{
    name: "Pure de Tomate Salsati",
    price: 560,
    category_id: 5,
    description: "Pure De Tomate marca Salsati 520gr",
    product_photo: "img-1656903373286-Pure de Tomate Salsati.webp",
    id: 23,
    special_offer: 0
},
{
    name: "Lechuga Criolla",
    price: 60,
    category_id: 5,
    description: "Lechuga Criolla. Precio por Kilo",
    product_photo: "img-1656903422208-Lechuga Criolla.webp",
    id: 24,
    special_offer: 0
},
{
    name: "LimpiaVidrios CIF",
    price: 359,
    category_id: 2,
    special_offer: 1,
    description: "Limpiador de Vidrios Cif Bio Original 375gr",
    product_photo: "img-1656903473984-LimpiaVidrios CIF.webp",
    id: 25
},
{
    name: "Ades Manzana",
    price: 426,
    category_id: 1,
    description: "Jugo Ades-Soja sabor Manzana 1-Lt",
    product_photo: "img-1656903510401-Ades Manzana.webp",
    id: 26,
    special_offer: 0
},
{
    name: "Papas Mc Cain Tradicionales",
    price: "236",
    category_id: 2,
    description: "Papas Tradicional Mc Cain Bsa 720 Grm",
    product_photo: "img-1660694127063-Papas Mc Cain Tradicionales.jpg",
    id: 27,
    special_offer: 0
}];

const categoriaProductos = [
{
    id: 1,
    name: "Bebidas",
    description: "Bebidas"
},
{
    id: 2,
    name: "Golosinas",
    description: "Golosinas"
},
{
    id: 3,
    name: "Limpieza",
    description: "Limpieza"
},
{
    id: 4,
    name: "Carnicería",
    description: "Carnicería"
},
];


Products.bulkCreate(productos);
Category.bulkCreate(categoriaProductos);

