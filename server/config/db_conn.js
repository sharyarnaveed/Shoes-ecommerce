const sql=require('mysql2/promise');

const connection= sql.createPool({
    host:'localhost',
    user:'root',
    database:'ecommerce'
});

module.exports=connection;