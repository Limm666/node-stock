import {UserDAO} from '../models/user-model.js'
import request from 'request-promise';
import regeneratorRuntime from '../node_modules/regenerator-runtime/runtime.js';

'use strict';

exports.login= async ((username,password,token)=>{
    if(username != null && password == null){
        if(!token){

        }
        UserDAO.login(username,password)
    }else{
        throw "用户名或者密码不准为空"
    }
})