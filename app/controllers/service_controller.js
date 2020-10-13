const Service = require("../models/Service.js");

//Crear un nuevo servicio y guardarlo
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const service = new Service({
        description: req.body.description,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        observation: req.body.observation,
        total_pay: req.body.total_pay,
        is_active: req.body.is_active,
        patient_id: req.body.patient_id,
        service_type_id: req.body.service_type_id,
        pet_cages_id: req.body.pet_cages_id
    });

    Service.create(service, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de servicio"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    Service.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los registros de servicios"
            });
            else res.send(data);
    });
};


//Mostrar un servicio segun id
exports.findById = (req, res) => {
    Service.findById(req.params.serviceId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el servicio ${req.params.serviceId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.serviceId
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

    Service.update(req.params.serviceId, new Service(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'servicio no encontrado ${req.params.serviceId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.serviceId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Service.remove(req.params.serviceId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'servicio no encontrado ${req.params.serviceId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el usuario " + req.params.serviceId
                });
            }
        }else res.send({ message: "servicio eliminado correctamente" });
    });
};
