const fetch = require('node-fetch');

const clientModel = require('../models/Client');
const { data } = require('jquery');


async function index(req, res) {
    var url = 'http://localhost:3000/clients/';
    await fetch(url)
        .then(res => res.json())
        .then(datos => {
            console.log(datos);
            res.render('client/index', { datos })
        })
        .catch(err => {
            console.log(err);
        });
}

function create(req, res) {
    res.render('client/add');
}

function store(req, res) {
    console.log(req);
    var client = req.body;

    const body = {
        'dpi': client.dpi,
        'name': client.name,
        'lastname': client.lastname,
        'artist': client.artist,
        'phone': client.phone,
        'address': client.address,
        'email': client.email,
        'is_active': client.is_active
    };
    fetch('http://localhost:3000/clients/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(datos => {
            res.redirect('/petto/client')
        })
        .catch(err => {
            console.log(err);
        });
}

async function show(req, res) {
    var url = 'http://localhost:3000/clients/' + req.params.clientId;
    await fetch(url)
        .then(res => res.json())
        .then(dato => {
            res.render('client/show', { dato })
        })
        .catch(err => {
            console.log(err);
        });
}

function edit(req, res) {
    var url = 'http://localhost:3000/clients/' + req.params.clientId;
    fetch(url)
        .then(res => res.json())
        .then(dato => {
            res.render('client/edit', { dato })
        })
        .catch(err => {
            console.log(err);
        });
}

function update(req, res) {
    var id = req.params.clientId;
    var client = req.body;
    const body = {
        'dpi': client.dpi,
        'name': client.name,
        'lastname': client.lastname,
        'artist': client.artist,
        'phone': client.phone,
        'address': client.address,
        'email': client.email,
        'is_active': client.is_active
    };
    fetch('http://localhost:3000/clients/' + id, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(dato => {
            console.log(dato);

            res.redirect('/petto/client/show/' + id)
        })
        .catch(err => {
            console.log(err);
        });
}


function destroy(req, res) {
    var id = req.params.clientId;

    fetch('http://localhost:3000/clients/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(dato => {
            console.log(dato);

            res.redirect('/petto/client')
        })
        .catch(err => {
            console.log(err);
        });
}

// function search(req, res) {
//     fetch('http://localhost:4000/clients/search/i/i?buscarid=' + req.query.buscarid)
//     .then(res => res.json())
//     .then(dato => {
//         res.render('show', { dato })
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

module.exports = { index, store, create, show, edit, update, destroy }