const sql = require('../connect.js');

const Client = function(client){
    this.dpi = client.dpi;
    this.name = client.name;
    this.lastname = client.lastname;
    this.phone = client.phone;
    this.address = client.address;
    this.email = client.email;
    this.is_active = client.is_active;
};

Client.create = (newClient, result) => {
    sql.query("INSERT INTO clients SET ?", newClient,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new Client: ', { id: res.insertId, ...newClient });
        result(null, { id: res.insertId, ...newClient });
    });
};

Client.findById = (clientId, result) => {
    sql.query(`SELECT * FROM clients WHERE id = ${clientId}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Cliente: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Client.getAll = result => {
    sql.query('SELECT * FROM clients', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Clientes: ", res);
        result(null, res);
    });
};

Client.update = (id, client, result) => {
    sql.query('UPDATE clients SET dpi = ?, name = ?, lastname = ?, phone = ?, address = ?, email = ?, is_active = ? WHERE id = ?', [ client.dpi, client.name, client.lastname, client.phone, client.address, client.email, client.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...client });
        result(null, { id: id, ...client });
    });
};

Client.remove = (id, result) => {
    sql.query('DELETE FROM clients WHERE id = ?', id, (err, res) => {
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


module.exports = Client;