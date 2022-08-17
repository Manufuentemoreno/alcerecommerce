const multer = require("multer");
const path = require("path");
const saveImage = multer.diskStorage({ 

    destination: (req, file, cb) => {
        const pathName = path.join(__dirname, "./../public/images/productDetail");
        cb(null, pathName);
    },
    
    filename: (req, file, cb) => {
        const imagName = "img-" + Date.now() + "-" + req.body.productName + path.extname(file.originalname);
        cb(null, imagName);
    }
});

const upload = multer({ storage : saveImage });

module.exports = upload;