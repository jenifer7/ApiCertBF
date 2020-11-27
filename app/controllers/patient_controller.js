const Patient = require("../models/Patient.js");

//Crear y guardar nuevo paciente
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const patient = new Patient({
        name: req.body.name,
        species: req.body.species,
        description: req.body.description,
        gender: req.body.gender,
        weight: req.body.weight,
        age: req.body.age,
        client_id: req.body.client_id,
        patient_status_id: req.body.patient_status_id,
        is_active: req.body.is_active
    });

    Patient.store(patient, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al crear registro de Paciente"
            });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    Patient.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error al intentar mostrar los Pacientes"
            });
        else res.send(data);
    });
};


//Mostrar un Paciente segun id
exports.findById = (req, res) => {
    Patient.findById(req.params.patientId, (err, data) => {
        if (err) {
            if (err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro Paciente ${req.params.patientId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.patientId
                });
            }
        } else res.send(data);
    });
};



//Editar registros y guardar los cambios
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede ingresar campos vacios"
        });
    }

    Patient.update(req.params.patientId, new Patient(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Paciente no encontrado ${req.params.patientId}'
                    });
                } else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.patientId
                    });
                }
            } else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Patient.remove(req.params.patientId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Paciente no encontrado ${req.params.patientId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.patientId
                });
            }
        } else res.send({ message: "Registro eliminado correctamente" });
    });
};
