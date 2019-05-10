import mysqlConfig from '../../config/mysql_config'
import redisConfig from '../../config/redis_config'
import mysql from 'mysql';
import redis from 'redis'
import regeneratorRuntime from '../../node_modules/regenerator-runtime/runtime.js';

const mysql_connection = mysql.createConnection({
    host     : mysqlConfig.connectString,
    user     : mysqlConfig.user,
    password : mysqlConfig.password,
    database : mysqlConfig.database
});

const redis_connection = redis.createClient( {
    host    : redisConfig.connectString,
    port    : redisConfig.port
})
mysql_connection.connect();


export class ProductDAO {
    static async insert(stockInfo){
        let stock_code = stockInfo.code;
        let stock_name = stockInfo.name;
        let addSql = 'INSERT INTO stockInfo(stock_code,stock_name) VALUES(?,?)';
        let addSqlParams = [stock_code,stock_name];

        mysql_connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
                console.log('[INSERT ERROR] - ',err.message);
                return;
            }
            console.log('--------------------------INSERT----------------------------');
            console.log('INSERT ID:',result);
        });
        redis_connection.set('stock_code',stock_code)
        redis_connection.set('stock_name',stock_name)
    }
}