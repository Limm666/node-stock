import stockService from '../services/stock-service.js'
import {ResultFul} from '../middlewares/result-process';
import ConstantUtils from '../middlewares/ConstantUtils'
import regeneratorRuntime from '../node_modules/regenerator-runtime/runtime.js';

exports.getStockInfo = async function (req,res) {
    console.log("req------------",req.query)
    let stockCode = req.query.code
    try{
        let result =  await stockService.getStockInfo(stockCode)
        ResultFul.success(result,res)
    }
   catch (err) {
       ResultFul.failedError(ConstantUtils.authority_failed, err, res);
   }

}