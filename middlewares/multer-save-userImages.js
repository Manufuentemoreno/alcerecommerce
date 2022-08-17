const multer = require("multer");
const path = require("path");

let multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../public/images/profile');
        callback(null, folder);
    },
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})

fileUpload = multer({ storage: multerDiskStorage});

module.exports = fileUpload;