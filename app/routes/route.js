module.exports = app => {
    const users = require("../controllers/user_controller.js");
    const serviceTypes = require("../controllers/service_type_controller.js");
    const services = require("../controllers/service_controller.js");
    const sales = require("../controllers/sale_controller.js");
    const roles = require("../controllers/role_controller.js");
    const tiposPro = require("../controllers/product_type_controller.js");
    const products = require("../controllers/product_controller.js");
    const prescriptions = require("../controllers/prescription_controller.js");
    const petCages = require("../controllers/pet_cages_controller.js");
    const patientStatuses = require("../controllers/patient_status_controller.js");
    const patients = require("../controllers/patient_controller.js");
    const notifications = require("../controllers/notification_controller.js");
    const employees = require("../controllers/employee_controller.js");
    const clients = require("../controllers/client_controller.js");
    const cageStatuses = require("../controllers/cage_status_controller.js");

    app.post("/users", users.create);
    app.get("/users", users.findAll);
    app.get("/users/:userId", users.findById);
    app.put("/users/:userId", users.update);
    app.delete("/users/:userId", users.delete);


    app.post("/roles", roles.create);
    app.get("/roles", roles.findAll);
    app.get("/roles/:roleId", roles.findById);
    app.put("/roles/:roleId", roles.update);
    app.delete("/roles/:roleId", roles.delete);


    app.post("/employees", employees.create);
    app.get("/employees", employees.findAll);
    app.get("/employees/:employeeId", employees.findById);
    app.put("/employees/:employeeId", employees.update);
    app.delete("/employees/:employeed", employees.delete);


    app.post("/tiposPro", tiposPro.create);
    app.get("/tiposPro", tiposPro.findAll);
    app.get("/tiposPro/:id", tiposPro.findById);
    app.put("/tiposPro/:id", tiposPro.update);
    app.delete("/tiposPro/:id", tiposPro.delete);


    app.post("/sales", sales.create);
    app.get("/sales", sales.findAll);
    app.get("/sales/:salesId", sales.findById);
    app.put("/sales/:salesId", sales.update);
    app.delete("/sales/:salesId", sales.delete);


    app.post("/clients", clients.create);
    app.get("/clients", clients.findAll);
    app.get("/clients/:clientsId", clients.findById);
    app.put("/clients/:clientsId", clients.update);
    app.delete("/clients/:clientsId", clients.delete);


    app.post("/products", products.create);
    app.get("/products", products.findAll);
    app.get("/products/:productsId", products.findById);
    app.put("/products/:productsId", products.update);
    app.delete("/products/:productsId", products.delete);


    app.post("/serviceTypes", serviceTypes.create);
    app.get("/serviceTypes", serviceTypes.findAll);
    app.get("/serviceTypes/:id", serviceTypes.findById);
    app.put("/serviceTypes/:id", serviceTypes.update);
    app.delete("/serviceTypes/:id", serviceTypes.delete);


    app.post("/services", services.create);
    app.get("/services", services.findAll);
    app.get("/services/:id", services.findById);
    app.put("/services/:id", services.update);
    app.delete("/services/:id", services.delete);


    app.post("/prescriptions", prescriptions.create);
    app.get("/prescriptions", prescriptions.findAll);
    app.get("/prescriptions/:id", prescriptions.findById);
    app.put("/prescriptions/:id", prescriptions.update);
    app.delete("/prescriptions/:id", prescriptions.delete);


    app.post("/petCages", petCages.create);
    app.get("/petCages", petCages.findAll);
    app.get("/petCages/:id", petCages.findById);
    app.put("/petCages/:id", petCages.update);
    app.delete("/petCages/:id", petCages.delete);


    app.post("/patientStatuses", patientStatuses.create);
    app.get("/patientStatuses", patientStatuses.findAll);
    app.get("/patientStatuses/:id", patientStatuses.findById);
    app.put("/patientStatuses/:id", patientStatuses.update);
    app.delete("/patientStatuses/:id", patientStatuses.delete);


    app.post("/patients", patients.create);
    app.get("/patients", patients.findAll);
    app.get("/patients/:patientsId", patients.findById);
    app.put("/patients/:patientsId", patients.update);
    app.delete("/patients/:patientsId", patients.delete);


    app.post("/notifications", notifications.create);
    app.get("/notifications", notifications.findAll);
    app.get("/notifications/:id", notifications.findById);
    app.put("/notifications/:id", notifications.update);
    app.delete("/notifications/:id", notifications.delete);


    app.post("/cageStatuses", cageStatuses.create);
    app.get("/cageStatuses", cageStatuses.findAll);
    app.get("/cageStatuses/:id", cageStatuses.findById);
    app.put("/cageStatuses/:id", cageStatuses.update);
    app.delete("/cageStatuses/:id", cageStatuses.delete);
}
