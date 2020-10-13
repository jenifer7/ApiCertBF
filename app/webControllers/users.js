const fetch = require('node-fetch');

const userModel = require('../models/User');
const { data } = require('jquery');


async function index(req, res) {
    var url = 'http://localhost:3000/users/';
    await fetch(url)
        .then(res => res.json())
        .then(datos => {
            console.log(datos);
            res.render('user/index', { datos })
        })
        .catch(err => {
            console.log(err);
        });
}

function create(req, res) {
    res.render('user/add');
}

function store(req, res) {
    console.log(req);
    var user = req.body;

    const body = {
        'username': user.username,
        'email': user.email,
        'password': user.password
    };
    fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(datos => {
            res.redirect('/petto/user')
        })
        .catch(err => {
            console.log(err);
        });
}

async function show(req, res) {
    var url = 'http://localhost:3000/users/' + req.params.userId;
    await fetch(url)
        .then(res => res.json())
        .then(dato => {
            res.render('user/show', { dato })
        })
        .catch(err => {
            console.log(err);
        });
}

function edit(req, res) {
    var url = 'http://localhost:3000/users/' + req.params.userId;
    fetch(url)
        .then(res => res.json())
        .then(dato => {
            res.render('user/edit', { dato })
        })
        .catch(err => {
            console.log(err);
        });
}

function update(req, res) {
    var id = req.params.userId;
    var user = req.body;
    const body = {
        'username': user.username,
        'email': user.email,
        'password': user.password,
        'is_active': user.is_active
    };
    fetch('http://localhost:3000/users/' + id, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(dato => {
            console.log(dato);

            res.redirect('/petto/user/show/' + id)
        })
        .catch(err => {
            console.log(err);
        });
}


function destroy(req, res) {
    var id = req.params.userId;

    fetch('http://localhost:3000/users/' + id, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(dato => {
            console.log(dato);

            res.redirect('/petto/user')
        })
        .catch(err => {
            console.log(err);
        });
}

// function search(req, res) {
//     fetch('http://localhost:4000/users/search/i/i?buscarid=' + req.query.buscarid)
//     .then(res => res.json())
//     .then(dato => {
//         res.render('show', { dato })
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }

module.exports = { index, store, create, show, edit, update, destroy }