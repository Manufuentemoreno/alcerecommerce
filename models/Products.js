// MODELO CRUD DEL JSON

const fs = require("fs");
const path = require("path");

const Products = {
    fileName : path.join(__dirname, "./../data/products-db.json"),

    fileDeleted: path.join(__dirname, "./../data/deletedProducts-db.json"),

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    },

    getDeleted: function (){
        return JSON.parse(fs.readFileSync(this.fileDeleted, "utf-8"));
    },

    editId: function ( id ){
        const allProduct = this.getData();

        let productToEdit = allProduct.find( producto => producto.id == id);

        return productToEdit;
    },

    saveData: function ( product ) {
        let productDB = this.getData()
        productDB.push(product);
        

        productsList =  JSON.stringify(productDB, null, 4);
        fs.writeFileSync( this.fileName, productsList );
        return true;
    },

    delete: function ( id ) {
        const allProduct = this.getData()

        const indexDelete = allProduct.findIndex( product =>
            product.id == id );
        
        // guardo por las dudas el elemento eliminado
        let deleted = this.getDeleted();
        deleted.push(allProduct[indexDelete]);
        const deletedString = JSON.stringify(deleted, null, 4);
        fs.writeFileSync(this.fileDeleted, deletedString);

        // actualizo bd sin el archivo eliminado
        allProduct.splice(indexDelete,1);
        const dbString = JSON.stringify(allProduct, null, 4);
        fs.writeFileSync(this.fileName, dbString);
    }
}

module.exports = Products;