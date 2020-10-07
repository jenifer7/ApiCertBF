const sql = require('../connect.js');

const PatientStatus = function(patientStatus){
    this.name = patientStatus.name;
    this.description = patientStatus.description;
    this.is_active = patientStatus.is_active;
};

PatientStatus.create = (newPatientStatus, result) => {
    sql.query("INSERT INTO patient_status SET ?", newPatientStatus,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new PatientStatus: ', { id: res.insertId, ...newPatientStatus });
        result(null, { id: res.insertId, ...newPatientStatus });
    });
};

PatientStatus.findById = (patientStatusId, result) => {
    sql.query('SELECT * FROM patient_status WHERE id = ${patientStatusId}', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Estado Paciente: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

PatientStatus.getAll = result => {
    sql.query('SELECT * FROM patient_status', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Estados: ", res);
        result(null, res);
    });
};

PatientStatus.update = (id, patientStatus, result) => {
    sql.query('UPDATE patient_status SET name = ?, description = ?, is_active = ? WHERE id = ?', [ patientStatus.name, patientStatus.description, patientStatus.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...patientStatus });
        result(null, { id: id, ...patientStatus });
    });
};

PatientStatus.remove = (id, result) => {
    sql.query('DELETE FROM patient_status WHERE id = ?', id, (err, res) => {
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


module.exports = PatientStatus;