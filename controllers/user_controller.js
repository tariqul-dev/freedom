const UserModel = require('../models/user_model');
const createError = require('../utils/create_error');


// update user
const updateUser = async (req, res, next) => {
    try {
        const updateUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            }, { new: true },
        );
        if (updateUser !== null) {
            res.status(200).json(updateUser);
        }
        else {
            throw "User not updated";
        }


    } catch (error) {
        next(createError(401, error));

    }
}


// get all user
const getAllUser = async (req, res, next) => {
    try {
        const allUser = await UserModel.find();

        if (allUser.length > 0) {
            res.status(200).json({
                'users': allUser,
            });
        }
        else {
            throw "No user available";
        }
    } catch (error) {
        next(createError(403, error));
    }
}

// get user by id
const getUserById = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);

        if (!user) throw 'User not found';

        return res.status(200).json({
            'user': user,
        });

    } catch (error) {
        next(createError(404, error));
    }
}

// delete user
const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (deletedUser !== null) {
            res.status(200).json({ 'deleted': deletedUser });
        }
        else {
            throw "user is not exist";
        }
    } catch (error) {
        next(createError(403, error));
    }
}




module.exports = {updateUser, getAllUser, getUserById, deleteUser};