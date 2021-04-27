var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const Users = require('../../models/Users');

module.exports = (db) => {
  /* api GET Users. */
  router.get('/', function(req, res) {
    Users.all(db)
    .then(users => {
      res.json({
        code: 200,
        data: users
      });
    })
    .catch(error => {
      res.json({
        code: 500,
        error_message: error,
      })
    });
  });

  /* api  POST new Users */
  router.post('/', (req,res) => {
    const {body} = req;
    Users.getSelectedEmail(db, body)
    .then(result => {
      if(result && result.length > 0){
        return res.json({
          code : 400,
          message : 'email already registered!',
        })
      }
    Users.post(db, body)
    .then(()=>{
      res.json({
        code : 201,
        message : 'success',
      })
    })
    .catch(()=>{
      res.json({
        code : 500,
        message: 'failed',
      })
    })
    })
    .catch(()=>{
      console.log('error Users getSelectedEmail');
    })
   
  }) 

  return router;
}
