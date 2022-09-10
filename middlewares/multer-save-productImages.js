const multer = require("multer");
const path = require("path");
const saveImage = multer.diskStorage({ 

    destination: (req, file, cb) => {
        const pathName = path.join(__dirname, "./../public/images/productDetail");
        cb(null, pathName);
    },
    
    filename: (req, file, cb) => {
        let nameInForm = req.body.name.replaceAll(" ","-");
        const imagName = "img-" + Date.now() + "-" + nameInForm + path.extname(file.originalname);
        cb(null, imagName);
    }
});

const upload = multer({ storage : saveImage });

module.exports = upload;