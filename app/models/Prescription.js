const sql = require('../connect.js');

const Prescription = function(prescription){
    this.description = prescription.description;
    this.is_active = prescription.is_active;
};

Prescription.create = (newPrescription, result) => {
    sql.query("INSERT INTO prescriptions SET ?", newPrescription,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new Prescription: ', { id: res.insertId, ...newPrescription });
        result(null, { id: res.insertId, ...newPrescription });
    });
};

Prescription.findById = (prescriptionId, result) => {
    sql.query('SELECT * FROM prescriptions WHERE id = ${prescriptionId}', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Prescription: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Prescription.getAll = result => {
    sql.query('SELECT * FROM prescriptions', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Prescriptions: ", res);
        result(null, res);
    });
};

Prescription.update = (id, prescription, result) => {
    sql.query('UPDATE prescriptions SET description = ?, is_active = ? WHERE id = ?', [ prescription.description, prescription.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...prescription });
        result(null, { id: id, ...prescription });
    });
};

Prescription.remove = (id, result) => {
    sql.query('DELETE FROM prescriptions WHERE id = ?', id, (err, res) => {
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


module.exports = Prescription;