
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

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing Not Found!'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler('401', 'User Authorization Denied!'));

    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing Deleted!');
    } catch (error) {
        next(error);
    }
}