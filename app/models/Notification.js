const sql = require('../connect.js');

const Notification = function(notification){
    this.description = notification.description;
    this.appointment_time = notification.appointment_time;
    this.date = notification.date;
    this.is_active = notification.is_active;
};

Notification.create = (newNotification, result) => {
    sql.query("INSERT INTO notifications SET ?", newNotification,(err,res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }
        console.log('Created new Notification: ', { id: res.insertId, ...newNotification });
        result(null, { id: res.insertId, ...newNotification });
    });
};

Notification.findById = (notificationId, result) => {
    sql.query('SELECT * FROM notifications WHERE id = ${notificationId}', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("Notificacion: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Notification.getAll = result => {
    sql.query('SELECT * FROM notifications', (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Notificaciones: ", res);
        result(null, res);
    });
};

Notification.update = (id, notification, result) => {
    sql.query('UPDATE notifications SET description = ?, appointment_time = ?, date = ?, is_active = ? WHERE id = ?', [ notification.description, notification.appointment_time, notification.date, notification.is_active, id ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }
        console.log("Registro actualizado: ", { id: id, ...notification });
        result(null, { id: id, ...notification });
    });
};

Notification.remove = (id, result) => {
    sql.query('DELETE FROM notifications WHERE id = ?', id, (err, res) => {
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


module.exports = Notification;