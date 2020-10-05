const Role = require("../models/Role.js");

//Crear un nuevo role y guardarlo
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const role = new Role({
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.is_active
    });

    Role.create(role, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de roles"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    Role.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los registros de roles"
            });
            else res.send(data);
    });
};


//Mostrar un role segun id
exports.findById = (req, res) => {
    Role.findById(req.params.roleId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el role ${req.params.roleId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.roleId
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

    Role.update(req.params.RoleId, new Role(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Usuario no encontrado ${req.params.roleId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.roleId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Role.remove(req.params.roleId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Role no encontrado ${req.params.roleId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el usuario " + req.params.roledId
                });
            }
        }else res.send({ message: "Role eliminado correctamente" });
    });
};
