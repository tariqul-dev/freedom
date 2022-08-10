const HotelModel = require('../models/hotel_model');
const RoomModel = require('../models/room_model');
const createError = require('../utils/create_error');


// create room
const createRoom = async (req, res, next) => {
    const newRoom = RoomModel(req.body);

    try {
        const savedRoom = await newRoom.save();
        const hotel = await HotelModel.findByIdAndUpdate(req.params.hotelId, {
            $push: {
                rooms: savedRoom._id
            }
        });
        if (!hotel)
            throw 'Hotel id is not valid';

        return res.status(201).json({
            'room': savedRoom
        });

    } catch (error) {
        next(createError(401, error));
    }
}


// update room
const updateRoom = async (req, res, next) => {
    try {
        const updateRoom = await RoomModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, { new: true },
        );
        if (updateRoom !== null) {
            res.status(200).json(updateRoom);
        }
        else {
            throw "Room is not updated";
        }


    } catch (error) {
        next(createError(403, error));

    }
}

// delete hotel
const deleteRoom = async (req, res, next) => {
    try {
        const deletedRoom = await RoomModel.findByIdAndDelete(req.params.roomId);
        const updateHotel = await HotelModel.findByIdAndUpdate(req.params.hotelId, {
            $pull: {rooms: req.params.roomId}
        })
        if (deletedRoom && updateHotel) {
            res.status(200).json({ 'deleted': deletedRoom });
        }
        else {
            throw "Room is not exist";
        }
    } catch (error) {
        next(createError(403, error));
    }
}

// get all hotels
const getAllRooms = async (req, res, next) => {
    try {
        const allRooms = await RoomModel.find();

        if (allRooms.length > 0) {
            res.status(200).json({
                'Rooms': allRooms,
            });
        }
        else {
            throw "Rooms are not exists";
        }
    } catch (error) {
        next(createError(403, error));
    }
}

// get hotel by id
const getRoomById = async (req, res, next) => {
    try {
        const room = await RoomModel.findById(req.params.id);


        if (room !== null) {
            return res.status(200).json({
                'room': room,
            });
        }
        else {
            throw "Invalid room id";
        }
    } catch (error) {

        next(createError(402, error));
    }
}


module.exports = { createRoom, updateRoom, deleteRoom, getAllRooms, getRoomById };