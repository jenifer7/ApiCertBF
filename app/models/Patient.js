const sql = require('../connect.js');

const Patient = function(patient){
    this.name = patient.name;
    this.species = patient.species;
    this.description = patient.description;
    this.gender = patient.gender;
    this.weight = patient.weight;
    this.age = patient.age;
    this.is_active = patient.is_active;
    this.client_id = patient.client_id;
    this.patient_status_id = patient.patient_status_id;
};

Patient.create = (newPatient, result) => {
    sql.query(`INSERT INTO patients SET ?`, newPatient,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new Patient: ', { id: res.insertId, ...newPatient });
        result(null, { id: res.insertId, ...newPatient });
    });
};

Patient.findById = (patientId, result) => {
    sql.query(`SELECT * FROM patients WHERE id = ${patientId}; ` +
    `SELECT c.id, c.name FROM clients c, patients p WHERE p.client_id = c.id AND p.id = ${patientId}; ` +
    `SELECT s.id, s.name FROM patient_status s, patients p WHERE  p.patient_status_id = s.id AND p.id = ${patientId}; `, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Paciente: ", res[0], res[1], res[2]);
            data = {};
            data.data = res[0];
            data.data[0].client = res[1];
            data.data[0].status = res[2];
            result(null, data);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Patient.getAll = result => {
    sql.query('SELECT p.id, p.name, p.species, p.description, p.gender, p.weight, p.age, c.name as client, s.name as status, p.is_active FROM patients p, clients c, patient_status s WHERE p.client_id = c.id AND p.patient_status_id = s.id' , (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Pacientes: ", res);
        result(null, res);
    });
};

Patient.update = (id, patient, result) => {
    sql.query('UPDATE patients SET name = ?, species = ?, description = ?, gender = ?, weight = ?, age = ?, is_active = ?, client_id = ?, patient_status_id = ? WHERE id = ?', 
    [ patient.name, patient.species, patient.description, patient.gender, patient.weight, patient.age, patient.is_active, patient.client_id, patient.patient_status_id, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...patient });
        result(null, { id: id, ...patient });
    });
};

Patient.remove = (id, result) => {
    sql.query('DELETE FROM patients WHERE id = ?', id, (err, res) => {
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


module.exports = Patient;