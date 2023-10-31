import express from 'express';
import {verifyToken} from "../utils/verifyToken.js";
import {createListing, deleteListing, getListing, getAllListings, updateListing} from '../controllers/listingController.js';

const router = express.Router();

router.post('/create-listing', verifyToken, createListing);
router.delete('/delete-listing/:id', verifyToken, deleteListing);
router.put('/update-listing/:id', verifyToken, updateListing);
router.get('/get-listing/:id', getListing);
router.get('/get-all-listings', getAllListings);



export default router;