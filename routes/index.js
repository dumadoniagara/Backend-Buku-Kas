var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../models/Users');

module.exports = (db) => {
  Users.all(db)
  .then(users => console.log('users ==', users))
  .catch(error => console.log('error ==', error));

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router;
}
