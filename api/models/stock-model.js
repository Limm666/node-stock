import mysqlConfig from '../config/mysql_config'
import redisConfig from '../config/redis_config'
import mysql from 'mysql';
import redis from 'redis'
import moment from "moment";
import regeneratorRuntime from '../node_modules/regenerator-runtime/runtime.js';

const mysql_connection = mysql.createConnection({
    host     : mysqlConfig.connectString,
    user     : mysqlConfig.user,
    password : mysqlConfig.password,
    database : mysqlConfig.stock_database
});

const redis_connection = redis.createClient( {
    host    : redisConfig.connectString,
    port    : redisConfig.port
})
mysql_connection.connect();


export class ProductDAO {

    // 向数据库插入基本数据
    static async insert(stockInfo){
        let stock_code = stockInfo.code;
        let stock_name = stockInfo.name;
        let date = moment().format("YYYY-MM-DD").toString()
        let data = {}
        data[date]= JSON.stringify(stockInfo)
        let count  = await mysql_connection.query(
            `select count(*) from stockInfo where stock_code = '${stock_code}'`,
        );

        if(count > 1){
            await mysql_connection.query(
                `update stockInfo set stock_name = ? where stock_code = ?`,
                [stock_code,stock_name],
                function (err, result) {
                    if(err){
                        console.log('[update ERROR] - ',err.message);
                        throw err;
                    }
                    console.log('update ID:',result);
                });
        }else{
            await mysql_connection.query(
                'INSERT INTO stockInfo(stock_code,stock_name) VALUES(?,?)',
                [stock_code,stock_name],
                function (err, result) {
                    if(err){
                        console.log('[INSERT ERROR] - ',err.message);
                        throw err;
                    }
                    console.log('INSERT ID:',result);
                });
        }
        await redis_connection.HMSET(stock_code,data);

    }
}