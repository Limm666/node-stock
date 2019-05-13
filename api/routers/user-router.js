import { Router } from 'express';
import userController from '../controllers/user-controller';

const router = module.exports = new Router()
router.prefix = '/api/user';


router.route('/login').post(function(req, res) {
    userController.login(req, res);
});
