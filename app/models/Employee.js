const sql = require('../connect.js');

const Employee = function (employee) {
    this.dpi = employee.dpi;
    this.name = employee.name;
    this.lastname = employee.lastname;
    this.birthdate = employee.birthdate;
    this.gender = employee.gender;
    this.phone = employee.phone;
    this.address = employee.address;
    this.is_active = employee.is_active;
    this.user_id = user_id;
};

Employee.create = (newEmployee, result) => {
    sql.query("INSERT INTO employees SET ?", newEmployee, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log('Created new Employee: ', { id: res.insertId, ...newEmployee });
        result(null, { id: res.insertId, ...newEmployee });
    });
};

Employee.findById = (employeeId, result) => {
    sql.query(`SELECT * FROM employees WHERE id = ${employeeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Empleado: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "No encontrado" }, null);
    });
};

Employee.getAll = result => {
    sql.query('SELECT * FROM employees', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("Empleados: ", res);
        result(null, res);
    });
};

Employee.update = (id, employee, result) => {
    sql.query(
        'UPDATE employees SET dpi = ?, name = ?, lastname = ?, birthdate = ?, gender = ?, phone = ?, address = ?, is_active = ?, user_id = ? WHERE id = ?',
        [employee.dpi, employee.name, employee.lastname, employee.birthdate, employee.gender, employee.phone, employee.address, employee.is_active, employee.user_id, id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            console.log("Registro actualizado: ", { id: id, ...employee });
            result(null, { id: id, ...employee });
        });
};

Employee.remove = (id, result) => {
    sql.query('DELETE FROM employees WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "Not Found" }, null);
            return;
        }
        console.log("Registro eliminado");
        result(null, res);
    });
};



module.exports = Employee;