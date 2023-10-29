import express from 'express';
import {test, updateUser} from './../controllers/userController.js';
import {verifyToken} from "../utils/verifyToken.js";


const router = express.Router();


router.get('/test', test);
router.post('/update-user/:id', verifyToken, updateUser);


export default router;