import express from 'express';
import {test, updateUser, deleteUser} from './../controllers/userController.js';
import {verifyToken} from "../utils/verifyToken.js";

const router = express.Router();

router.get('/test', test);
router.post('/update-user/:id', verifyToken, updateUser);
router.delete('/delete-user/:id', verifyToken, deleteUser);

export default router;