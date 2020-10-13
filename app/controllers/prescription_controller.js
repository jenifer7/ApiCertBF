const Prescription = require("../models/Prescription.js");

//Crear y guardar registro de prescripcion
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const prescription = new Prescription({
        description: req.body.description,
        is_active: req.body.is_active,
        user_id: req.body.user_id,
        patient_id: req.body.patient_id,
        product_id: req.body.product_id
    });

    Prescription.create(prescription, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de Prescriptione"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    Prescription.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los Prescripciones"
            });
            else res.send(data);
    });
};


//Mostrar Prescriptione segun id
exports.findById = (req, res) => {
    Prescription.findById(req.params.prescriptionId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro Prescriptione ${req.params.prescriptionId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.prescriptionId
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

    Prescription.update(req.params.prescriptionId, new Prescription(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Prescripcion no encontrado ${req.params.prescriptionId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.prescriptionId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Prescription.remove(req.params.prescriptionId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Prescripcion no encontrado ${req.params.prescriptionId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.prescriptionId
                });
            }
        }else res.send({ message: "Registro eliminado correctamente" });
    });
};
