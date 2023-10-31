
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

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing Not Found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler('401', 'User Authorization Denied!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);

    } catch (err) {
        next(err);
    }
}

export const getListing = async (req, res, next) => {
    console.log('getListing', req.params)
}

export const getAllListings = async (req, res, next) => {
    console.log('getAllListings', req.params)

}