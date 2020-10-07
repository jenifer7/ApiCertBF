const CageStatus = require("../models/CageStatus.js");

//Crear y guardar registro de estado de las jaulas
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const cageStatus = new CageStatus({
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.is_active
    });

    CageStatus.create(cageStatus, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de CageStatuse"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    CageStatus.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los CageStatuses"
            });
            else res.send(data);
    });
};


//Mostrar CageStatuse segun id
exports.findById = (req, res) => {
    CageStatus.findById(req.params.cageStatusId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro CageStatuse ${req.params.cageStatusId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.cageStatusId
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

    CageStatus.update(req.params.cageStatusId, new CageStatus(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'CageStatuse no encontrado ${req.params.cageStatusId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.cageStatusId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    CageStatus.remove(req.params.cageStatusId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'CageStatuse no encontrado ${req.params.cageStatusId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.cageStatusId
                });
            }
        }else res.send({ message: "Registro eliminado correctamente" });
    });
};
