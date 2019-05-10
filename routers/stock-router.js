import { Router } from 'express';
import stockController from '../controllers/stock-controller';

const router = module.exports = new Router();
router.prefix = '/api/stock';


router.route('/info').get(function(req, res) {
    stockController.getStockInfo(req, res);
});
