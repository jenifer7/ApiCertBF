const express = require('express')
const client = require('../webControllers/clients')
const status = require('../webControllers/status')
const patient = require('../webControllers/patients')
const user = require('../webControllers/users')

const employee = require('../controllers/employee_controller')
const types_pro = require('../controllers/product_type_controller')
const types_serv = require('../controllers/service_type_controller')
const product = require('../controllers/product_controller')
const service = require('../controllers/service_controller')
const sale = require('../controllers/sale_controller')
const router = express.Router();

router.route('/')
.get(client.index)
.post(client.store);

router.route('/add')
.get(client.create);

router.route('/show/:clientId')
.get(client.show);

router.route('/edit/:clientId')
.get(client.edit);

router.route('/update/:clientId')
.post(client.update);

router.route('/destroy/:clientId')
.post(client.destroy);


router.route('/status/')
.get(status.index)
.post(status.store);

router.route('/status/add')
.get(status.create);

router.route('/status/show/:patientStatusId')
.get(status.show);

router.route('/status/edit/:patientStatusId')
.get(status.edit);

router.route('/status/update/:patientStatusId')
.post(status.update);

router.route('/status/destroy/:patientStatusId')
.post(status.destroy);


router.route('/patient/')
.get(patient.index)
.post(patient.store);

router.route('/patient/add')
.get(patient.create);

router.route('/patient/show/:patientId')
.get(patient.show);

router.route('/patient/edit/:patientId')
.get(patient.edit);

router.route('/patient/update/:patientId')
.post(patient.update);

router.route('/patient/destroy/:patientId')
.post(patient.destroy);



router.route('/user/')
.get(user.index)
.post(user.store);

router.route('/user/add')
.get(user.create);

router.route('/user/show/:userId')
.get(user.show);

router.route('/user/edit/:userId')
.get(user.edit);

router.route('/user/update/:userId')
.post(user.update);

router.route('/user/destroy/:userId')
.post(user.destroy);


router.route('/employee/')
.get(employee.findAll)
.post(employee.store);

router.route('/employee/add')
.get(employee.create);

router.route('/employee/show/:employeeId')
.get(employee.findById);

router.route('/employee/edit/:employeeId')
.get(employee.edit);

router.route('/employee/update/:employeeId')
.post(employee.update);

router.route('/employee/destroy/:employeeId')
.post(employee.delete);


router.route('/types_pro/')
.get(types_pro.findAll)
.post(types_pro.store);

router.route('/types_pro/add')
.get(types_pro.create);

router.route('/types_pro/show/:productTypeId')
.get(types_pro.findById);

router.route('/types_pro/edit/:productTypeId')
.get(types_pro.edit);

router.route('/types_pro/update/:productTypeId')
.post(types_pro.update);

router.route('/types_pro/destroy/:productTypeId')
.post(types_pro.delete);



router.route('/types_serv/')
.get(types_serv.findAll)
.post(types_serv.store);

router.route('/types_serv/add')
.get(types_serv.create);

router.route('/types_serv/show/:serviceTypeId')
.get(types_serv.findById);

router.route('/types_serv/edit/:serviceTypeId')
.get(types_serv.edit);

router.route('/types_serv/update/:serviceTypeId')
.post(types_serv.update);

router.route('/types_serv/destroy/:serviceTypeId')
.post(types_serv.delete);




router.route('/product/')
.get(product.findAll)
.post(product.store);

router.route('/product/add')
.get(product.create);

router.route('/product/show/:productsId')
.get(product.findById);

router.route('/product/edit/:productsId')
.get(product.edit);

router.route('/product/update/:productsId')
.post(product.update);

router.route('/product/destroy/:productsId')
.post(product.delete);





router.route('/service/')
.get(service.findAll)
.post(service.store);

router.route('/service/add')
.get(service.create);

router.route('/service/show/:serviceId')
.get(service.findById);

router.route('/service/edit/:serviceId')
.get(service.edit);

router.route('/service/update/:serviceId')
.post(service.update);

router.route('/service/destroy/:serviceId')
.post(service.delete);


router.route('/sale/')
.get(sale.findAll)
.post(sale.store);

router.route('/sale/add')
.get(sale.create);

router.route('/sale/show/:saleId')
.get(sale.findById);

// router.route('/sale/edit/:saleId')
// .get(sale.edit);

router.route('/sale/update/:saleId')
.post(sale.update);

router.route('/sale/destroy/:saleId')
.post(sale.delete);

module.exports = router;