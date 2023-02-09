import {Router} from 'express'
import { createUser, logUser, getProfile } from '../controllers/user.controller.js';
import verifyToken from '../controllers/veritfyToken.js';


const router = Router();

router.get('/profile', verifyToken , getProfile)
router.post('/register',createUser)
router.post('/login',logUser)


export default router;