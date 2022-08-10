const express = require('express');
const { updateUser, getAllUser, getUserById, deleteUser } = require('../controllers/user_controller');
const { verifyToken, verifyUser, verifyAdmin } = require('../middleware/verify_token');

const router = express.Router();

// verifing token, user and admin
router.get('/checktoken', verifyToken, (req, res, next) => {

    res.send('You are logged in');

});

router.get('/checkuser/:id', verifyUser, (req, res, next) => {

    res.send('You are logged in and you can delete account');

});

router.get('/checkadmin', verifyAdmin, (req, res, next) => {

    res.send('Congratulations your are admin now');

});


// update user
router.patch('/:id', verifyUser, updateUser);


// get all user

router.get('/', verifyAdmin, getAllUser);


// get user by id
router.get('/:id', verifyUser, getUserById);


// delete user
router.delete('/:id', verifyUser, deleteUser)


module.exports = router;