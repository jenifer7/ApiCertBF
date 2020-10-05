const sql = require('./connect.js');

const User = function(user){
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.is_active = user.is_active;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new user: ', { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (userId, result) => {
    sql.query('SELECT * FROM users WHERE id = ${userId}', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Usuario: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

User.getAll = result => {
    sql.query('SELECT * FROM users', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Usuarios: ", res);
        result(null, res);
    });
};

User.update = (id, user, result) => {
    sql.query('UPDATE users SET name = ?, email = ?, password = ?, is_active = ? WHERE id = ?', [ user.name, user.email, user.password, user.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...user });
        result(null, { id: id, ...user });
    });
};

User.remove = (id, result) => {
    sql.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
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



module.exports = User;