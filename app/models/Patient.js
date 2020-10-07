const sql = require('../connect.js');

const Patient = function(patient){
    this.name = patient.name;
    this.species = patient.species;
    this.description = patient.description;
    this.gender = patient.gender;
    this.weight = patient.weight;
    this.age = patient.age;
    this.is_active = patient.is_active;
};

Patient.create = (newPatient, result) => {
    sql.query("INSERT INTO patients SET ?", newPatient,(err,res) => {
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
    sql.query('SELECT * FROM patients WHERE id = ${patientId}', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Paciente: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Patient.getAll = result => {
    sql.query('SELECT * FROM patients', (err, res) => {
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
    sql.query('UPDATE patients SET name = ?, species = ?, description = ?, gender = ?, weight = ?, age = ?, is_active = ? WHERE id = ?', [ patient.name, patient.species, patient.description, patient.gender, patient.weight, patient.age, patient.is_active, id ], (err, res) => {
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