const User = require("../models/User.js");

//Crear un nuevo usuario y guardarlo
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        is_active: req.body.is_active
    });

    User.create(user, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de usuario"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los registros de usuarios"
            });
            else res.send(data);
    });
};


//Mostrar un usuario segun id
exports.findById = (req, res) => {
    User.findById(req.params.userId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el usuario ${req.params.userId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.userId
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

    User.update(req.params.userId, new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Usuario no encontrado ${req.params.userId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.userId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    User.remove(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Usuario no encontrado ${req.params.userId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el usuario " + req.params.userId
                });
            }
        }else res.send({ message: "Usuario eliminado correctamente" });
    });
};
