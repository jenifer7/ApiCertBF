const Employee = require("../models/Employee.js");

//Crear un nuevo empleado y guardarlo

exports.create = (req, res) => {
    res.render('employee/add');
};

exports.store = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede enviar contenido vacio"
        });
    }
    const employee = new Employee({
        dpi: req.body.dpi,
        name: req.body.name,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        is_active: req.body.is_active,
        user_id: req.body.user_id
    });

    Employee.create(employee, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Error al crear registro de empleado"
            });
        // else res.send(data);
        else res.redirect('/petto/employee');
    });
};


//Mostrar todos los registros
exports.findAll = (req, res) => {
    Employee.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Error al intentar mostrar los registros de empleados"
            });
        // else res.send(data);
        else res.render('employee/index', { data });
    });
};


//Mostrar un empleado segun id
exports.findById = (req, res) => {
    Employee.findById(req.params.employeeId, (err, data) => {
        if (err) {
            if (err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el empleado ${req.params.employeeId}'
                });
            } else {
                res.status(500).send({
                    message: "Error al mostrar el registro " + req.params.employeeId
                });
            }
            // }else res.send(data);
        } else res.render('employee/show', { data });
    });
};

exports.edit = (req, res) => {
    Employee.findById(req.params.employeeId, (err, data) => {
        if (err) {
            if (err.kind === "No encontrado") {
                res.status(404).send({
                    message: 'No se encontro el empleado ${req.params.employeeId}'
                });
            }
            // }else res.send(data);
        } else res.render('employee/edit', { data });
    });
}

//Editar registros y guardar los cambios
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se puede ingresar campos vacios"
        });
    }

    Employee.update(req.params.employeeId, new Employee(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "No encontrado") {
                    res.status(404).send({
                        message: 'Empleado no encontrado ${req.params.employeeId}'
                    });
                } else {
                    res.status(500).send({
                        message: "Error al actualizar registro " + req.params.employeeId
                    });
                }
            // } else res.send(data);
            } else res.redirect('/petto/employee/show', {data});
        });
};



//Eliminar un registro
exports.delete = (req, res) => {
    Employee.remove(req.params.employeeId, (err, data) => {
        if (err) {
            if (err.kind === "No disponible") {
                res.status(404).send({
                    message: 'Empleado no encontrado ${req.params.employeeId}'
                });
            } else {
                res.status(500).send({
                    message: "No se pudo eliminar el usuario " + req.params.employeeId
                });
            }
            // }else res.send({ message: "Empleado eliminado correctamente" });
        } else res.redirect('/petto/employee');
    });
};
