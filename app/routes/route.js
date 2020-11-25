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


    app.post("/clients", clients.create);
    app.get("/clients", clients.findAll);
    app.get("/clients/:clientId", clients.findById);
    app.put("/clients/:clientId", clients.update);
    app.delete("/clients/:clientId", clients.delete);


    app.post("/roles", roles.create);
    app.get("/roles", roles.findAll);
    app.get("/roles/:roleId", roles.findById);
    app.put("/roles/:roleId", roles.update);
    app.delete("/roles/:roleId", roles.delete);


    app.post("/employees", employees.create);
    app.get("/employees", employees.findAll);
    app.get("/employees/:employeeId", employees.findById);
    app.put("/employees/:employeeId", employees.update);
    app.delete("/employees/:employeeId", employees.delete);


    app.post("/tiposPro", tiposPro.create);
    app.get("/tiposPro", tiposPro.findAll);
    app.get("/tiposPro/:productTypeId", tiposPro.findById);
    app.put("/tiposPro/:productTypeId", tiposPro.update);
    app.delete("/tiposPro/:productTypeId", tiposPro.delete);


    app.post("/sales", sales.create);
    // app.get("/sales", sales.findAll);
    // app.get("/sales/:saleId", sales.findById);
    // app.put("/sales/:saleId", sales.update);
    // app.delete("/sales/:saleId", sales.delete);


    app.post("/products", products.create);
    app.get("/products", products.findAll);
    app.get("/products/:productId", products.findById);
    app.put("/products/:productId", products.update);
    app.delete("/products/:productId", products.delete);


    app.post("/serviceTypes", serviceTypes.create);
    app.get("/serviceTypes", serviceTypes.findAll);
    app.get("/serviceTypes/:serviceTypeId", serviceTypes.findById);
    app.put("/serviceTypes/:serviceTypeId", serviceTypes.update);
    app.delete("/serviceTypes/:serviceTypeId", serviceTypes.delete);


    app.post("/services", services.create);
    app.get("/services", services.findAll);
    app.get("/services/:serviceId", services.findById);
    app.put("/services/:serviceId", services.update);
    app.delete("/services/:serviceId", services.delete);


    app.post("/prescriptions", prescriptions.create);
    app.get("/prescriptions", prescriptions.findAll);
    app.get("/prescriptions/:prescriptionId", prescriptions.findById);
    app.put("/prescriptions/:prescriptionId", prescriptions.update);
    app.delete("/prescriptions/:prescriptionId", prescriptions.delete);


    app.post("/petCages", petCages.create);
    app.get("/petCages", petCages.findAll);
    app.get("/petCages/:petCageId", petCages.findById);
    app.put("/petCages/:petCageId", petCages.update);
    app.delete("/petCages/:petCageId", petCages.delete);


    app.post("/patientStatuses", patientStatuses.create);
    app.get("/patientStatuses", patientStatuses.findAll);
    app.get("/patientStatuses/:patientStatusId", patientStatuses.findById);
    app.put("/patientStatuses/:patientStatusId", patientStatuses.update);
    app.delete("/patientStatuses/:patientStatusId", patientStatuses.delete);


    app.post("/patients", patients.store);
    app.get("/patients", patients.findAll);
    app.get("/patients/:patientId", patients.findById);
    app.put("/patients/:patientId", patients.update);
    app.delete("/patients/:patientId", patients.delete);


    app.post("/notifications", notifications.create);
    app.get("/notifications", notifications.findAll);
    app.get("/notifications/:notificationId", notifications.findById);
    app.put("/notifications/:notificationId", notifications.update);
    app.delete("/notifications/:notificationId", notifications.delete);


    app.post("/cageStatuses", cageStatuses.create);
    app.get("/cageStatuses", cageStatuses.findAll);
    app.get("/cageStatuses/:cageStatusId", cageStatuses.findById);
    app.put("/cageStatuses/:cageStatusId", cageStatuses.update);
    app.delete("/cageStatuses/:cageStatusId", cageStatuses.delete);
}