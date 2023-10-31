import express from 'express';
import {verifyToken} from "../utils/verifyToken.js";
import {createListing, deleteListing} from '../controllers/listingController.js';

const router = express.Router();

router.post('/create-listing', verifyToken, createListing);
router.delete('/delete-listing/:id', verifyToken, deleteListing);



export default router;