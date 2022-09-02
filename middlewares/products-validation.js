const path = require("path");
const { body } = require("express-validator");

const validations = [
    body("name").notEmpty().withMessage("* Campo Obligatorio").bail()
        .isLength( {min:5} ).withMessage("* El nombre debe tener al menos 5 caracteres"), 
    body("price").notEmpty().withMessage("* Campo Obligatorio"),
    body("category_id").notEmpty().withMessage("* Se necesita seleccionar una categoría"),
    body("description").notEmpty().withMessage("* Campo Obligatorio").bail()
        .isLength( {min:20} ).withMessage("* El nombre debe tener al menos 20 caracteres"),
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