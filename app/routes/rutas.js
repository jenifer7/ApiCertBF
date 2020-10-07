const express = require('express');
const router = express.Router();

const conection = require('../connect');

router.get('/add', (req, res) => {
    res.render('employee/add');
});

module.exports = router;