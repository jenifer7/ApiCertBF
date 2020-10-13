const express = require('express')
const client = require('../webControllers/clients')
const status = require('../webControllers/status')
const patient = require('../webControllers/patients')
const user = require('../webControllers/users')
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

module.exports = router;