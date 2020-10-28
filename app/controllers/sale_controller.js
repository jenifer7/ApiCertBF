const Sale = require("../models/Sale.js");

//Crear un nuevo registro de venta y guardarlo
exports.create = (req, res) => {
    res.render('sale/add');
};

exports.store = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const sale = new Sale.Sale({
        total_sale: req.body[0].total_sale,
        user_id: req.body[0].user_id,
        client_id: req.body[0].client_id,
        is_active: req.body[0].is_active
    });

    var detail = [];
    for (let pro = 0; pro < req.body[1].length; pro++) {
        const details = new Sale.Detail({
            quantity: req.body[1][pro].quantity,
            product_id: req.body[1][pro].product_id,
            price: req.body[1][pro].price,
            subtotal: req.body[1][pro].subtotal
        });
        detail.push(details);
    }

    Sale.create(sale, detail, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de venta"
        });
        else res.redirect('/petto/sale');
    });
};

//Mostrar todos los registros
exports.findAll = (req, res) => {
    Sale.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los registros de ventas"
            });
            else res.send(data);
    });
};


//Mostrar un registro de venta segun id
exports.findById = (req, res) => {
    Sale.findById(req.params.saleId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el tipo de producto ${req.params.saleId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.saleId
                });
            }
        }else res.send(data);
    });
};



//Editar registros y guardar los cambios
exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "No se puede ingresar campos vacios"
        });
    }

    Sale.update(req.params.saleId, new Sale(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Registro de venta no encontrado ${req.params.saleId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.saleId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Sale.remove(req.params.saleId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Registro de venta no encontrado ${req.params.saleId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.saleId
                });
            }
        }else res.send({ message: "Registro eliminado correctamente" });
    });
};
