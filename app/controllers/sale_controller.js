const Sale = require('../models/Sale.js');

exports.create = (req, res) => {
    Sale.Sale.create((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error al mostrar registro"
            });
        else res.render('sale/add',{data});
    });
}

exports.store = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    console.log("sale " ,req.body);

    const sale = new Sale.Sale({
        total_sale: req.body[0].total_sale,
        user_id: req.body[0].user_id,
        client_id: req.body[0].client_id
    });

    var detail = [];
    console.log("detail", req.body[1].length);
    for (let pro = 0; pro < req.body[1].length; pro++) {
        const details = new Sale.Detail({
            quantity: req.body[1][pro].quantity,
            product_id: req.body[1][pro].product_id,
            price: req.body[1][pro].price,
            subtotal: req.body[1][pro].subtotal
        });
        detail.push(details);
    }

    Sale.Sale.store(sale, detail, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al crear registro de venta"
            });
        else res.send(data);
        // else res.redirect('/petto/sale');
    });
}

exports.findAll = (req, res) => {
    Sale.Sale.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los registros Productos"
            });
            // else res.send(data);
            else res.render('sale/index', {data});
    });
};