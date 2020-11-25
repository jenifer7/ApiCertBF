const fetch = require('node-fetch');

async function index(req, res) {
    var url = 'http://localhost:3000/patients/';
    await fetch(url)
        .then(res => res.json())
        .then(datos => {
            console.log(datos);
            res.render('patient/index', { datos })
        })
        .catch(err => {
            console.log(err);
        });
}

// function create(req, res) {
//     res.render('patient/add');
// }

function store(req, res) {
    console.log(req);
    var patient = req.body;

    const body = {
        'name': patient.name,
        'species': patient.species,
        'description': patient.description,
        'gender': patient.gender,
        'weight': patient.weight,
        'age': patient.age,
        'client_id': patient.client_id,
        'patient_status_id': patient.patient_status_id,
        'is_active': patient.is_active
    };
    fetch('http://localhost:3000/patients/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(datos => {
            res.redirect('/petto/patient')
        })
        .catch(err => {
            console.log(err);
        });
}

async function show(req, res) {
    var url = 'http://localhost:3000/patients/' + req.params.patientId;
    await fetch(url)
        .then(res => res.json())
        .then(dato => {
            res.render('patient/show', { dato })
            console.log(dato);
        })
        .catch(err => {
            console.log(err);
        });
}

function edit(req, res) {
    var url = 'http://localhost:3000/patients/' + req.params.patientId;
    fetch(url)
        .then(res => res.json())
        .then(dato => {
            res.render('patient/edit', { dato })
        })
        .catch(err => {
            console.log(err);
        });
}

function update(req, res) {
    var id = req.params.patientId;
    var patient = req.body;
    const body = {
        'name': patient.name,
        'species': patient.species,
        'description': patient.description,
        'gender': patient.gender,
        'weight': patient.weight,
        'age': patient.age,
        'client_id': patient.client_id,
        'patient_status_id': patient.patient_status_id,
        'is_active': patient.is_active
    };
    fetch('http://localhost:3000/patients/' + id, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(dato => {
            console.log(dato);

            res.redirect('/petto/patient/show/' + id)
        })
        .catch(err => {
            console.log(err);
        });
}


function destroy(req, res) {
    var id = req.params.patientId;

    fetch('http://localhost:3000/patients/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(dato => {
            console.log(dato);

            res.redirect('/petto/patient')
        })
        .catch(err => {
            console.log(err);
        });
}

// function search(req, res) {
//     fetch('http://localhost:4000/patients/search/i/i?buscarid=' + req.query.buscarid)
//     .then(res => res.json())
//     .then(dato => {
//         res.render('show', { dato })
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

module.exports = { index, store, show, edit, update, destroy }