const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = (password) => {
    return new Promise((resolve, reject)=>{
        bcrypt.hash(password, saltRounds, (err, hash)=>{
            if(!err && hash) resolve(hash);
            if(err) reject(err);
        })
    })
}

module.exports = encryptPassword;