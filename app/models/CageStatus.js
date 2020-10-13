const sql = require('../connect.js');

const CageStatus = function(cageStatus){
    this.name = cageStatus.name;
    this.description = cageStatus.description;
    this.is_active = cageStatus.is_active;
};

CageStatus.create = (newCageStatus, result) => {
    sql.query("INSERT INTO cage_status SET ?", newCageStatus,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new CageStatus: ', { id: res.insertId, ...newCageStatus });
        result(null, { id: res.insertId, ...newCageStatus });
    });
};

CageStatus.findById = (cageStatusId, result) => {
    sql.query(`SELECT * FROM cage_status WHERE id = ${cageStatusId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Estado de jaula: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

CageStatus.getAll = result => {
    sql.query('SELECT * FROM cage_status', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Estado de jaulas: ", res);
        result(null, res);
    });
};

CageStatus.update = (id, cageStatus, result) => {
    sql.query('UPDATE cage_status SET name = ?, description = ?, is_active = ? WHERE id = ?', [ cageStatus.name, cageStatus.description, cageStatus.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...cageStatus });
        result(null, { id: id, ...cageStatus });
    });
};

CageStatus.remove = (id, result) => {
    sql.query('DELETE FROM cage_status WHERE id = ?', id, (err, res) => {
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


module.exports = CageStatus;