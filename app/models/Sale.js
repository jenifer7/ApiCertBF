const sql = require('../connect.js');

const Sale = function(sale){
    this.sale_date = sale.sale_date;
    this.total_sale = sale.total_sale;
    this.is_active = sale.is_active;
    this.user_id = user_id;
    this.client_id = client_id;
};

Sale.create = (newSale, result) => {
    sql.query("INSERT INTO sales SET ?", newSale,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new Sale: ', { id: res.insertId, ...newSale });
        result(null, { id: res.insertId, ...newSale });
    });
};

Sale.findById = (saleId, result) => {
    sql.query(`SELECT * FROM sales WHERE id = ${saleId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Venta: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Sale.getAll = result => {
    sql.query('SELECT * FROM sales', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Ventas: ", res);
        result(null, res);
    });
};

Sale.update = (id, sale, result) => {
    sql.query('UPDATE sales SET sale_date = ?, total_sale = ?, is_active = ?, user_id = ?, client_id = ? WHERE id = ?', [ sale.name, sale.sale_date, sale.total_sale, sale.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...sale });
        result(null, { id: id, ...sale });
    });
};

Sale.remove = (id, result) => {
    sql.query('DELETE FROM sales WHERE id = ?', id, (err, res) => {
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


module.exports = Sale;