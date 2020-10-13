const PetCage = require("../models/PetCage.js");

//Crear y guardar registro de jaulas
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const petCage = new PetCage({
        description: req.body.description,
        size: req.body.size,
        is_active: req.body.is_active,
        cage_status_id: req.body.cage_status_id
    });

    PetCage.create(petCage, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de PetCagee"
        });
        else res.send(data);
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    PetCage.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los jaulas"
            });
            else res.send(data);
    });
};


//Mostrar PetCage segun id
exports.findById = (req, res) => {
    PetCage.findById(req.params.petCageId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro PetCagee ${req.params.petCageId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.petCageId
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

    PetCage.update(req.params.petCageId, new PetCage(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'jaulas no encontrado ${req.params.petCageId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.petCageId
                    });
                }
            }else res.send(data);
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    PetCage.remove(req.params.petCageId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Jaula no encontrada ${req.params.petCageId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el registro " + req.params.petCageId
                });
            }
        }else res.send({ message: "Registro eliminado correctamente" });
    });
};
