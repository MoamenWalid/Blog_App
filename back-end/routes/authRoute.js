import express from 'express';
import { registerUserCtrl } from '../controllers/authController.js';

/**
 * @router /api/auth/register
 */

const router = express.Router();

router.post('/register', registerUserCtrl);

export { router };