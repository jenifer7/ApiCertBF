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
    `SELECT c.id, c.name, c.lastname FROM clients c WHERE c.is_active = 1; ` , (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null,err);
            return;
        }
        if(res.length){
            // console.log("Producto: ", res[0], res[1]);
            data = {};
            data.data = res[0];
            data.data[0].client = res[1];
            result(null, data);
            return;
        }
        result(null,res);
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

module.exports = {Sale, Detail};