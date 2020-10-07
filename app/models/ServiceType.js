const sql = require('../connect.js');

const ServiceType = function(serviceType){
    this.name = serviceType.name;
    this.description = serviceType.description;
    this.is_active = serviceType.is_active;
};

ServiceType.create = (newServiceType, result) => {
    sql.query("INSERT INTO service_types SET ?", newServiceType,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new ServiceType: ', { id: res.insertId, ...newServiceType });
        result(null, { id: res.insertId, ...newServiceType });
    });
};

ServiceType.findById = (serviceTypeId, result) => {
    sql.query('SELECT * FROM service_types WHERE id = ${serviceTypeId}', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Tipo de Servicio: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

ServiceType.getAll = result => {
    sql.query('SELECT * FROM service_types', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Tipo de Servicio: ", res);
        result(null, res);
    });
};

ServiceType.update = (id, serviceType, result) => {
    sql.query('UPDATE service_types SET name = ?, description = ?, is_active = ? WHERE id = ?', [ serviceType.name, serviceType.description, serviceType.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...serviceType });
        result(null, { id: id, ...serviceType });
    });
};

ServiceType.remove = (id, result) => {
    sql.query('DELETE FROM service_types WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0){
            result({ kind: "Not Found" }, null);
            return;
        }
        console.log("Registro eliminado");
        result(null, res);
    });
};


module.exports = ServiceType;