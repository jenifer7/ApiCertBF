const ServiceType = require("../models/ServiceType.js");

//Crear un nuevo tipos de servicio y guardarlo
exports.create = (req, res) => {
    res.render('types_serv/add');
}
exports.store = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const serviceType = new ServiceType({
        name: req.body.name,
        description: req.body.description,
        is_active: req.body.is_active
    });

    ServiceType.create(serviceType, (err, data) => {
        if(err)
        res.status(500).send({
            message: err.message || "Error al crear registro de tipos de servicio"
        });
        // else res.send(data);
        else res.redirect('/petto/types_serv');
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    ServiceType.getAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Error al intentar mostrar los registros de tipos de servicios"
            });
            // else res.send(data);
            else res.render('types_serv/index', {data});
    });
};


//Mostrar un tipo de servicio segun id
exports.findById = (req, res) => {
    ServiceType.findById(req.params.serviceTypeId, (err, data) => {
        if(err) {
            if(err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el tipos de servicio ${req.params.serviceTypeId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.serviceTypeId
                });
            }
        // }else res.send(data);
        }else res.render('types_serv/show', {data});
    });
};



//Editar registros y guardar los cambios
exports.edit = (req, res) => {
    ServiceType.findById(req.params.serviceTypeId, (err, data) => {
        if (err) {
            if (err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el empleado ${req.params.serviceTypeId}'
                });
            }
            // }else res.send(data);
        } else res.render('types_serv/edit', { data });
    });
}
exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "No se puede ingresar campos vacios"
        });
    }

    ServiceType.update(req.params.serviceTypeId, new ServiceType(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'tipos de servicio no encontrado ${req.params.serviceTypeId}'
                    });
                }else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.serviceTypeId
                    });
                }
            // }else res.send(data);
            }else res.redirect('/petto/types_serv/show');
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    ServiceType.remove(req.params.serviceTypeId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'tipos de servicio no encontrado ${req.params.serviceTypeId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el usuario " + req.params.serviceTypeId
                });
            }
        // }else res.send({ message: "tipos de servicio eliminado correctamente" });
        }else res.redirect('/petto/types_serv');
    });
};
