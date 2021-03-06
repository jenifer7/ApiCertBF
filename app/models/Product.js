const sql = require('../connect.js');

const Product = function(product){
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
    this.product_type_id = product_type_id;
    this.is_active = product.is_active;
};

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        // console.log('Created new Product: ', { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Product.findById = (productId, result) => {
    sql.query(`SELECT * FROM products WHERE id = ${productId}; ` +
    `SELECT tp.id, tp.type FROM product_types tp, products p WHERE p.product_type_id = tp.id AND p.id = ${productId}; `, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Producto: ", res[0]);
            data = {};
            data.data = res[0];
            data.data[0].type = res[1];
            result(null, data);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Product.getAll = result => {
    sql.query('SELECT p.id, p.name, p.description, tp.type, p.price, p.stock, p.is_active FROM products p, product_types tp WHERE p.product_type_id = tp.id ', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Productos: ", res);
        result(null, res);
    });
};

Product.update = (id, product, result) => {
    sql.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ?, is_active = ?, product_type_id = ? WHERE id = ?', 
    [ product.name, product.description, product.price, product.stock, product.is_active, product.product_type_id, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...product });
        result(null, { id: id, ...product });
    });
};

Product.remove = (id, result) => {
    sql.query('DELETE FROM products WHERE id = ?', id, (err, res) => {
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


module.exports = Product;