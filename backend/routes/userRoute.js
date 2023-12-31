import express from 'express';
import {test, updateUser, deleteUser, getUserListings, getUser} from './../controllers/userController.js';
import {verifyToken} from "../utils/verifyToken.js";

const router = express.Router();

router.get('/test', test);
router.put('/update-user/:id', verifyToken, updateUser);
router.delete('/delete-user/:id', verifyToken, deleteUser);
router.get('/get-listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);

export default router;