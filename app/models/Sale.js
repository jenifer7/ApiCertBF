const sql = require('../connect.js');

const Sale = function (sale) {
    this.total_sale = sale.total_sale;
    this.user_id = sale.user_id;
    this.client_id = sale.client_id;
    // this.is_active = sale.is_active;
};

const Detail = function (detail) {
    // this.sale_id = detail.sale_id;
    this.quantity = detail.quantity;
    this.product_id = detail.product_id;
    this.price = detail.price;
    this.subtotal = detail.subtotal;
};



Sale.create = result => {
    sql.query(`SELECT p.id, p.name, p.stock, p.price FROM products p WHERE p.is_active = 1 AND p.stock > 0; ` +
        `SELECT c.id, c.name, c.lastname FROM clients c WHERE c.is_active = 1; `, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.length) {
                // console.log("Producto: ", res[0], res[1]);
                data = {};
                data.data = res[0];
                data.data[0].client = res[1];
                result(null, data);
                return;
            }
            result(null, res);
        });
}


Sale.store = (newSale, newDetail, result) => {
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
                    saleId,
                    newDetail[ds].quantity,
                    newDetail[ds].product_id,
                    newDetail[ds].price,
                    newDetail[ds].subtotal
                ]);
            }
            sql.query("INSERT into sale_details (sale_id,quantity,product_id,price,subtotal) values ?", [details], function (err, res) {
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

Sale.getAll = result => {
    sql.query(`select s.id, s.sale_date, s.total_sale, c.name, c.lastname, u.username  from sales s, clients c, users u where c.id = s.client_id and u.id = s.user_id; `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Sales: ", res);
        result(null, res);
    });
};


Sale.findById = (saleId, result) => {
    sql.query(`select s.id, s.sale_date, s.total_sale, c.name as cliente, c.lastname, u.username as usuario, d.quantity, d.subtotal, p.name as producto, p.price from sales s, clients c, users u, sale_details d, products p where s.id = d.sale_id and c.id = s.client_id and u.id = s.user_id and p.id = d.product_id and s.id = ${saleId}; `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Venta: ", res);
            result(null, res);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

module.exports = { Sale, Detail };