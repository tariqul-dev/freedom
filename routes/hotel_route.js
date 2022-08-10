const express = require('express');
const { createHotel, updateHotel, deleteHotel, getAllHotels, getHotelById, getHotelByCity } = require('../controllers/hotel_controller');
const { verifyAdmin } = require('../middleware/verify_token');
const router = express.Router();
// CREATE

router.post('/create', verifyAdmin, createHotel);

// UPDATE
router.patch('/update/:id', verifyAdmin, updateHotel);
// DELETE
router.delete('/delete/:id', verifyAdmin, deleteHotel);

// GET
// get all hotels
router.get('/', getAllHotels);

// get hotel by id
router.get('/:id', getHotelById);

// get hotel by city
router.get('/city/:city', getHotelByCity);



module.exports = router;