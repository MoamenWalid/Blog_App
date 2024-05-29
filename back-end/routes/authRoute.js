import express from 'express';
import { registerUserCtrl } from '../controllers/registerController.js';
import { loginUserCtrl } from '../controllers/loginController.js';

const router = express.Router();

// /api/auth/register 
router.post('/register', registerUserCtrl);

// /api/auth/login 
router.post('/login', loginUserCtrl);

export { router };