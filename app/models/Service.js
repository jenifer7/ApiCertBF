const sql = require('../connect.js');

const Service = function(service){
    this.description = service.description;
    this.start_date = service.start_date;
    this.end_date = service.end_date;
    this.observations = service.observations;
    this.total_pay = service.total_pay;
    this.is_active = service.is_active;
    this.patient_id = patient_id;
    this.service_type_id = service_type_id;
    this.pet_cages_id = pet_cages_id;
};

Service.create = (newService, result) => {
    sql.query("INSERT INTO services SET ?", newService,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new Service: ', { id: res.insertId, ...newService });
        result(null, { id: res.insertId, ...newService });
    });
};

Service.findById = (serviceId, result) => {
    sql.query(`SELECT * FROM services WHERE id = ${serviceId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Servicio: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Service.getAll = result => {
    sql.query('SELECT * FROM services', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Servicios: ", res);
        result(null, res);
    });
};

Service.update = (id, service, result) => {
    sql.query('UPDATE services SET description = ?, start_date = ?, end_date = ?, observations = ?, total_pay = ?, is_active = ?, patients_id = ?, service_type_id = ?, pet_cages_id = ? WHERE id = ?',
    [ service.description, service.start_date, service.end_date, service.observations, service.total_pay, service.is_active, service.patient_id, service.service_type_id, service.pet_cages_id, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...service });
        result(null, { id: id, ...service });
    });
};

Service.remove = (id, result) => {
    sql.query('DELETE FROM services WHERE id = ?', id, (err, res) => {
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


module.exports = Service;