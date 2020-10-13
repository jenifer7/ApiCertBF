const sql = require('../connect.js');

const ProductType = function(productType){
    this.type = productType.type;
    this.description = productType.description;
    this.is_active = productType.is_active;
};

ProductType.create = (newProductType, result) => {
    sql.query("INSERT INTO product_types SET ?", newProductType,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new ProductType: ', { id: res.insertId, ...newProductType });
        result(null, { id: res.insertId, ...newProductType });
    });
};

ProductType.findById = (productTypeId, result) => {
    sql.query(`SELECT * FROM product_types WHERE id = ${productTypeId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Tipo de Producto: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

ProductType.getAll = result => {
    sql.query('SELECT * FROM product_types', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Tipos de Productos: ", res);
        result(null, res);
    });
};

ProductType.update = (id, productType, result) => {
    sql.query('UPDATE product_types SET type = ?, description = ?, is_active = ? WHERE id = ?', [ productType.type, productType.description, productType.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...productType });
        result(null, { id: id, ...productType });
    });
};

ProductType.remove = (id, result) => {
    sql.query('DELETE FROM product_types WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0){
            result({ kind: "Not Found" }, null);
            return;
        }
        console.log("Registro eliminado");
        result(null, res);
    });
};


module.exports = ProductType;