
import Listing from '../models/listingModel.js';
import {errorHandler} from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);

    } catch (err) {
        next(err);
    }
};