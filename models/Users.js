class Users {
    constructor() {
    }
 
   static all(db){
       return new Promise((resolve, reject)=>{
           const sql = `SELECT id, name, email, password FROM users`;
           db.query(sql, (err, result) => {
               console.log('RESULT users ==', result);
            let data = result.rows;
            resolve(data)
            reject(err)
         })
       })
   }
 }
 
 module.exports = Users;