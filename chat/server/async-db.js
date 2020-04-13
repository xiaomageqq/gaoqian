const mysql = require('mysql')
const pool = mysql.createPool({
    host:'192.168.191.136',
    user:'gq',
    password:'888',
    database:'chat'
})

let query = function(sql,values){
   return new Promise((resolve,reject)=>{
       pool.getConnection(function(err,connection){
           if(err){
            console.log('数据库链接失败')
               reject(err)
           }else{
               connection.query(sql,values,(err,rows)=>{
                   if(err){

                       reject(err)
                   }else{
                       resolve(rows)
                   }
                   connection.release();
               })
           }
       })
   })
}
module.exports = { query }
