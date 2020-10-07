const Client = require("../models/Client.js");

//Crear un nuevo cliente y guardarlo
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const client = new Client({
        dpi: req.body.dpi,
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        is_active: req.body.is_active
    });

    Client.create(client, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de Cliente"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    Client.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los Clientes"
            });
            else res.send(data);
    });
};


//Mostrar un cliente segun id
exports.findById = (req, res) => {
    Client.findById(req.params.clientId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro Cliente ${req.params.clientId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.clientId
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

    Client.update(req.params.clientId, new Client(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Cliente no encontrado ${req.params.clientId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.clientId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Client.remove(req.params.clientId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Cliente no encontrado ${req.params.clientId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.clientId
                });
            }
        }else res.send({ message: "Registro eliminado correctamente" });
    });
};
