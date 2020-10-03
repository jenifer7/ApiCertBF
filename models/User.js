const sql = require('./connect.js');

const User = function(users){
    this.name = users.name;
};