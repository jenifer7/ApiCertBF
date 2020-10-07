const Notification = require("../models/Notification.js");

//Crear una nueva Notificacion y guardarlo
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const notification = new Notification({
        description: req.body.description,
        appointment_time: req.body.appointment_time,
        date: req.body.date,
        is_active: req.body.is_active
    });

    Notification.create(notification, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de Notification"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    Notification.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los Notificaciones"
            });
            else res.send(data);
    });
};


//Mostrar un Notificatione segun id
exports.findById = (req, res) => {
    Notification.findById(req.params.notificationId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro Notificacion ${req.params.notificationId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.notificationId
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

    Notification.update(req.params.notificationId, new Notification(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Notificacion no encontrado ${req.params.notificationId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.notificationId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Notification.remove(req.params.notificationId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Notificafion no encontrado ${req.params.notificationId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.notificationId
                });
            }
        }else res.send({ message: "Registro eliminado correctamente" });
    });
};
