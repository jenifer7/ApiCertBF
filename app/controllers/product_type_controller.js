const ProductType = require("../models/ProductType.js");

//Crear un nuevo usuario y guardarlo
exports.create = (req, res) => {
    res.render('types_pro/add');
}
exports.store = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const productType = new ProductType({
        type: req.body.type,
        description: req.body.description,
        is_active: req.body.is_active
    });

    ProductType.create(productType, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro en tipos de producto"
        });
        // else res.send(data);
        else res.redirect('/petto/types_pro');
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    ProductType.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los registros de Tipos de producto"
            });
            // else res.send(data);
            else res.render('types_pro/index', {data});
    });
};


//Mostrar un usuario segun id
exports.findById = (req, res) => {
    ProductType.findById(req.params.productTypeId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el tipo de producto ${req.params.productTypeId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.productTypeId
                });
            }
        // }else res.send(data);
        }else res.render('types_pro/show', {data});
    });
};



//Editar registros y guardar los cambios
exports.edit = (req, res) => {
    ProductType.findById(req.params.productTypeId, (err, data) => {
        if (err) {
            if (err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el empleado ${req.params.productTypeId}'
                });
            }
            // }else res.send(data);
        } else res.render('types_pro/edit', { data });
    });
}
exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "No se puede ingresar campos vacios"
        });
    }

    ProductType.update(req.params.productTypeId, new ProductType(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Tipo de producto no encontrado ${req.params.productTypeId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.productTypeId
                    });
                }
            // }else res.send(data);
            }else res.redirect('/petto/types_pro/show');
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    ProductType.remove(req.params.productTypeId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Tipo de producto no encontrado ${req.params.productTypeId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.productTypeId
                });
            }
        // }else res.send({ message: "Registro eliminado correctamente" });
        }else res.redirect('/petto/types_pro');
    });
};
