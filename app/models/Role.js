const sql = require('./connect.js');

const Role = function(role){
    this.name = role.name;
    this.description = role.description;
    this.is_active = role.is_active;
};

Role.create = (newRole, result) => {
    sql.query("INSERT INTO roles SET ?", newRole,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new role: ', { id: res.insertId, ...newRole });
        result(null, { id: res.insertId, ...newRole });
    });
};

Role.findById = (roleId, result) => {
    sql.query('SELECT * FROM roles WHERE id = ${roleId}', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Role: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Role.getAll = result => {
    sql.query('SELECT * FROM roles', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Roles: ", res);
        result(null, res);
    });
};

Role.update = (id, role, result) => {
    sql.query('UPDATE roles SET name = ?, description = ?, is_active = ? WHERE id = ?', [ role.name, role.description, role.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...role });
        result(null, { id: id, ...role });
    });
};

Role.remove = (id, result) => {
    sql.query('DELETE FROM roles WHERE id = ?', id, (err, res) => {
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



module.exports = Role;