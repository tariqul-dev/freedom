const HotelModel = require('../models/hotel_model');
const createError = require('../utils/create_error');


// create hotel
const createHotel = async (req, res, next) => {
    const newHotel = new HotelModel(req.body);

    try {
        const saveHotel = await newHotel.save();
        if (saveHotel !== null) {
            res.status(201).json(saveHotel);
        }
        else {
            throw "Creating hotel failed";
        }


    } catch (error) {
        next(createError(400, error));
    }
}

// update hotel
const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await HotelModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, { new: true },
        );
        if (updateHotel !== null) {
            res.status(200).json(updateHotel);
        }
        else {
            throw "Hotel is not updated";
        }


    } catch (error) {
        next(createError(403, error));

    }
}

// delete hotel
const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await HotelModel.findByIdAndDelete(req.params.id);
        if (deletedHotel !== null) {
            res.status(200).json({ 'deleted': deletedHotel });
        }
        else {
            throw "Hotel is not exist";
        }
    } catch (error) {
        next(createError(403, error));
    }
}

// get all hotels
const getAllHotels = async (req, res, next) => {
    try {
        const allHotels = await HotelModel.find();

        if (allHotels.length > 0) {
            res.status(200).json({
                'hotels': allHotels,
            });
        }
        else {
            throw "Hotels are not exists";
        }
    } catch (error) {
        next(createError(403, error));
    }
}

// get hotel by id
const getHotelById = async (req, res, next) => {
    try {
        const hotel = await HotelModel.findById(req.params.id);


        if (hotel !== null) {
            return res.status(200).json({
                'hotel': hotel,
            });
        }
        else {
            throw "Invalid hotel id";
        }
    } catch (error) {

        next(createError(402, error));
    }
}

// get hotel by city
const getHotelByCity = async (req, res, next) => {
    try {
        const hotel = await HotelModel.find({
            city: req.params.city,
        });

        if (hotel.length > 0) {
            res.status(200).json({
                'hotel': hotel,
            });
        }

        else {
            throw "No hotels available in this city";
        }
    } catch (error) {
        next(createError(400, error));
    }
}

module.exports = { createHotel, updateHotel, deleteHotel, getAllHotels, getHotelById, getHotelByCity };