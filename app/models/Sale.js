const sql = require('../connect.js');

const Sale = function (sale) {
    this.total_sale = sale.total_sale;
    this.user_id = sale.user_id;
    this.client_id = sale.client_id;
    this.is_active = sale.is_active;
};

const Detail = function (detail) {
    this.sale_id = detail.sale_id;
    this.quantity = detail.quantity;
    this.product_id = detail.product_id;
    this.price = detail.price;
    this.subtotal = detail.subtotal;
};


Sale.create = (newSale, newDetail, result) => {
    sql.beginTransaction(function (err) {
        if (err) {
            console.log(err);
            result(null, err);
            return;
        }
        sql.query("INSERT INTO sales SET ?", newSale, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                sql.rollback;
                return;
            }
            let saleId = res.insertId;
            let details = [];

            for (let ds = 0; ds < newDetail.length; ds++) {
                details.push([
                    newDetail[ds].saleId,
                    newDetail[ds].quantity,
                    newDetail[ds].product_id,
                    newDetail[ds].price,
                    newDetail[ds].subtotal
                ]);
            }
            sql.query("INSERT into sale_details (saleId,quantity,product_id,price,subtotal) values ?", [details], function (err, res) {
                if (err) {
                    sql.rollback;
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                sql.commit(function (err) {
                    if (err) {
                        sql.rollback;
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("Created: ", { id: res.insertId, ...newSale, ...newDetail });
                    result(null, { id: res.insertId, ...newSale, ...newDetail });
                })
            })
        })
    });
};

Sale.findById = (saleId, result) => {
    sql.query(`SELECT * FROM sales WHERE id = ${saleId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Venta: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Sale.getAll = result => {
    sql.query('SELECT * FROM sales', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Ventas: ", res);
        result(null, res);
    });
};

Sale.update = (id, sale, result) => {
    sql.query('UPDATE sales SET sale_date = ?, total_sale = ?, is_active = ?, user_id = ?, client_id = ? WHERE id = ?', [sale.name, sale.sale_date, sale.total_sale, sale.is_active, id], (err, res) => {
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
        if (res.affectedRows == 0) {
            result({ kind: "Not Found" }, null);
            return;
        }
        console.log("Registro eliminado");
        result(null, res);
    });
};


module.exports = Sale, Detail;