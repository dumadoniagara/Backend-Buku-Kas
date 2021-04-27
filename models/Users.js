class Users {
    constructor() {
    }
 
   static all(db){
       return new Promise((resolve, reject)=>{
           const sql = `SELECT id, name, email, password FROM users`;
           db.query(sql, (err, result) => {
            let data = result.rows;
            resolve(data)
            reject(err)
         })
       })
   }
   static post(db, form){
       const {name, email, password} = form;
        return new Promise((resolve, reject)=>{
        const sql = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;
        db.query(sql, [name, email, password], (err, result) => {
            resolve(result)
            reject(err)
        })
      })
    }
    static getSelectedEmail(db, form){
        const {email} = form;
         return new Promise((resolve, reject)=>{
         const sql = `SELECT id, name, email FROM users WHERE email = $1`;
         db.query(sql, [email], (err, result) => {
            let data = result.rows;
            resolve(data)
            reject(err)
         })
       })
     }
 }
 
 module.exports = Users;