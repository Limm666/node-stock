import {ProductDAO} from '../models/stock-model.js'
import request from 'request-promise';
import regeneratorRuntime from '../node_modules/regenerator-runtime/runtime.js';
import mailService from "./mail-service";

'use strict';

exports.getStockInfo = async (code) =>{
    let url = `http://qt.gtimg.cn/q=${code}`
    let retInfo = {}
    let stockInfo = {}
    await request(url).then(function (res) {
        let arr = res.split("~")
        stockInfo.name = arr[1];
        stockInfo.code = arr[2];
        stockInfo.currentPrice = parseFloat(arr[3]);//当前价格
        stockInfo.yesterdayPrice = parseFloat(arr[4]);//昨日收盘价
        stockInfo.todayPrice = parseFloat(arr[5]);//今日盘价
        stockInfo.priceFloat = parseFloat(arr[32]);//浮动
        stockInfo.maxPrice = parseFloat(arr[33]);//今日最高价
        stockInfo.minPrice = parseFloat(arr[34]);//今日最低价
        stockInfo.PE = parseFloat(arr[39]);//市盈率
        stockInfo.PB = parseFloat(arr[46]);//市净率
        stockInfo.CirculationMarkValue = parseFloat(arr[44]);//流通市值
        stockInfo.totalMarkValue = parseFloat(arr[45]);//总市值
        console.log("stockInfo--------",stockInfo);
        retInfo.stockInfo = res;
    }).catch(function (err){
        console.log("err----------------------",err)
        throw "错误异常"
    })
    await ProductDAO.insert(stockInfo)

    let recipient = "584707735@qq.com"
    let subject = "测试使用"
    await mailService.mailNotifier(recipient,subject,stockInfo)
    return retInfo
}