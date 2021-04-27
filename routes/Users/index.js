var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../../models/Users');
const Bcrypt = require('../../utility/bcrypt');

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
    const {password, name, email} = body;
    let hashPassword = null;
    if(!password) return res.json({code:400, message:'password required'});
    if(!name) return res.json({code:400, message:'name required'});
    if(!email) return res.json({code:400, message:'email required'});

    Users.getSelectedEmail(db, body)
    .then(result => {
      if(result && result.length > 0){
        return res.json({
          code : 400,
          message : 'email already registered!',
        });
      }
    })
    .catch(error => {
      return res.json({
        code : 500,
        message: error,
      })
    })

    Bcrypt(password)
      .then((hash => {
        body.password = hash;
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
        });
      }))
      .catch(err => {
        hashPassword = err
      });
      
  });
  return router;
}
