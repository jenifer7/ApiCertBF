const PatientStatus = require("../models/PatientStatus.js");

//Crear y guardar nuevo estado de paciente
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const patientStatus = new PatientStatus({
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.is_active
    });

    PatientStatus.create(patientStatus, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de estado de paciente"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    PatientStatus.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los estado de pacientes"
            });
            else res.send(data);
    });
};


//Mostrar un estado de paciente segun id
exports.findById = (req, res) => {
    PatientStatus.findById(req.params.patientStatusId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro estado de paciente ${req.params.patientStatusId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.patientStatusId
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

    PatientStatus.update(req.params.patientStatusId, new PatientStatus(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'estado de paciente no encontrado ${req.params.patientStatusId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.patientStatusId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    PatientStatus.remove(req.params.patientStatusId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'estado de paciente no encontrado ${req.params.patientStatusId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.patientStatusId
                });
            }
        }else res.send({ message: "Registro eliminado correctamente" });
    });
};
