const sql = require('../connect.js');

const PetCage = function(petCage){
    this.description = petCage.description;
    this.size = petCage.size;
    this.is_active = petCage.is_active;
};

PetCage.create = (newPetCage, result) => {
    sql.query("INSERT INTO pet_cages SET ?", newPetCage,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new PetCage: ', { id: res.insertId, ...newPetCage });
        result(null, { id: res.insertId, ...newPetCage });
    });
};

PetCage.findById = (petCageId, result) => {
    sql.query('SELECT * FROM pet_cages WHERE id = ${petCageId}', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Jaula: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

PetCage.getAll = result => {
    sql.query('SELECT * FROM pet_cages', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Jaulas: ", res);
        result(null, res);
    });
};

PetCage.update = (id, PetCage, result) => {
    sql.query('UPDATE pet_cages SET description = ?, size = ?, is_active = ? WHERE id = ?', [ petCage.description, petCage.size, petCage.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...PetCage });
        result(null, { id: id, ...PetCage });
    });
};

PetCage.remove = (id, result) => {
    sql.query('DELETE FROM pet_cages WHERE id = ?', id, (err, res) => {
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


module.exports = PetCage;