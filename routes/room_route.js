const express = require('express');
const { createRoom, updateRoom, deleteRoom, getAllRooms, getRoomById } = require('../controllers/room_controller');
const { verifyAdmin } = require('../middleware/verify_token');
const router = express.Router();

// create room
router.post('/create/:hotelId', verifyAdmin, createRoom);

// update room
router.patch('/:id', verifyAdmin, updateRoom);

// delete room
router.delete('/:roomId/:hotelId', verifyAdmin, deleteRoom);

// get all rooms
router.get('/', getAllRooms);

// get room by id
router.get('/:id', getRoomById);

module.exports = router;