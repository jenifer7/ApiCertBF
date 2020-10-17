const fetch = require('node-fetch');

const statusModel = require('../models/PatientStatus');
const { data } = require('jquery');


async function index(req, res) {
    var url = 'http://localhost:3000/patientStatuses';
    await fetch(url)
        .then(res => res.json())
        .then(statuses => {
            console.log(statuses);
            res.render('status/index', { statuses })
        })
        .catch(err => {
            console.log(err);
        });
}

function create(req, res) {
    res.render('status/add');
}

function store(req, res) {
    console.log(req);
    var patientStatus = req.body;

    const body = {
        'name': patientStatus.name,
        'description': patientStatus.description
    };
    fetch('http://localhost:3000/patientStatuses/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(status => {
            res.redirect('/petto/status')
        })
        .catch(err => {
            console.log(err);
        });
}

async function show(req, res) {
    var url = 'http://localhost:3000/patientStatuses/' + req.params.patientStatusId;
    await fetch(url)
        .then(res => res.json())
        .then(status => {
            res.render('status/show', { status })
        })
        .catch(err => {
            console.log(err);
        });
}

function edit(req, res) {
    var url = 'http://localhost:3000/patientStatuses/' + req.params.patientStatusId;
    fetch(url)
        .then(res => res.json())
        .then(status => {
            res.render('status/edit', { status })
        })
        .catch(err => {
            console.log(err);
        });
}

function update(req, res) {
    var id = req.params.patientStatusId;
    var patientStatus = req.body;
    const body = {
        'name': patientStatus.name,
        'description': patientStatus.description,
        'is_active': patientStatus.is_active
    };
    fetch('http://localhost:3000/patientStatuses/' + id, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(status => {
            console.log(status);

            res.redirect('/petto/status/show/' + id)
        })
        .catch(err => {
            console.log(err);
        });
}


function destroy(req, res) {
    var id = req.params.patientStatusId;

    fetch('http://localhost:3000/patientStatuses/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(status => {
            console.log(status);

            res.redirect('/petto/status')
        })
        .catch(err => {
            console.log(err);
        });
}

// function search(req, res) {
//     fetch('http://localhost:4000/patientStatuss/search/i/i?buscarid=' + req.query.buscarid)
//     .then(res => res.json())
//     .then(dato => {
//         res.render('show', { dato })
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

module.exports = { index, store, create, show, edit, update, destroy }