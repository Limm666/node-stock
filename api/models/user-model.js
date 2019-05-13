import regeneratorRuntime from '../node_modules/regenerator-runtime/runtime.js';
import md5 from 'js-md5'
import mysqlConfig from "../config/mysql_config";

const mysql_connection = mysql.createConnection({
    host     : mysqlConfig.connectString,
    user     : mysqlConfig.user,
    password : mysqlConfig.password,
    database : mysqlConfig.user_database
});

mysql_connection.connect();

export  class UserDAO{
    static async login(username,password){
        console.log()
        password = md5(password);
        console.log("password----------------",password)
        let sql = `select * from userInfo where username = '${usrename}' and password = '${password}'`
        let userInfo = mysql_connection.query(sql);
        if(userInfo.length != 1){
            throw "用户账户密码不正确"
        }else{
            return
        }
    }
}