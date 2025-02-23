import express from 'express';

import {login ,register,adminLogin} from '../controllers/AuthController.js'
const router = express.Router();


router.post('/login', login);
router.post('/register', register);
router.post('/admin/login', adminLogin);

export default router;