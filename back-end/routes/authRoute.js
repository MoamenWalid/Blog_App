import express from 'express';
import { registerUserCtrl } from '../controllers/registerController.js';
import { loginUserCtrl } from '../controllers/loginController.js';

const routerAuth = express.Router();

// /api/auth/register 
routerAuth.post('/register', registerUserCtrl);

// /api/auth/login 
routerAuth.post('/login', loginUserCtrl);

export { routerAuth };