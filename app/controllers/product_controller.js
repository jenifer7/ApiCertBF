const Products = require("../models/Product.js");

//Crear un nuevo producto y guardarlo
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const products = new Products({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        is_active: req.body.is_active,
        product_type_id: req.body.product_type_id
    });

    Products.create(products, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de producto"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    Products.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los registros Productos"
            });
            else res.send(data);
    });
};


//Mostrar un producto segun id
exports.findById = (req, res) => {
    Products.findById(req.params.productsId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el Producto ${req.params.productsId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.productsId
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

    Products.update(req.params.productsId, new Products(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Producto no encontrado ${req.params.productsId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.productsId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Products.remove(req.params.productsId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Producto no encontrado ${req.params.productsId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.productsId
                });
            }
        }else res.send({ message: "Registro eliminado correctamente" });
    });
};
