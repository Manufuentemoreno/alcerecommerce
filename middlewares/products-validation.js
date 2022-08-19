const path = require("path");
const { body } = require("express-validator");

const validations = [
    body("name").notEmpty().withMessage("* Campo Obligatorio"),
    body("price").notEmpty().withMessage("* Campo Obligatorio"),
    body("category").notEmpty().withMessage("* Se necesita seleccionar una categoría"),
    body("description").notEmpty().withMessage("* Campo Obligatorio"),
    body("product_photo").custom((value, { req }) => {
        let file = req.file;
        let extensionsOk = [ ".jpg", ".jpeg", ".png", ".webp" ];

        if (!file) {
            throw new Error( "Es necesario seleccionar una imagen" );
        }else{
            let fileExtension = path.extname(file.originalname);
            if (!extensionsOk.includes(fileExtension)) {
                throw new Error ("Seleccioná un archivo "+extensionsOk.join(" - "));
            }
        }

        return true
    })
];

module.exports = validations;