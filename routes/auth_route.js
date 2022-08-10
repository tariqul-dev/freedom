const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/user_model');
const createError = require('../utils/create_error');
const jwt = require('jsonwebtoken');

// registration
router.post('/registration', async (req, res, next) => {

   try {

      const saltRounds = 10
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashPassword;

      const newUser = new UserModel(req.body);

      const savedUesr = await newUser.save();
      if (savedUesr !== null) {
         return res.status(201).json(savedUesr);
      } else {
         throw 'User registration failed';
      }


   } catch (error) {
      next(createError(401, error));
   }
});

router.post('/login', async (req, res, next) => {
   try {
      const hasUser = await UserModel.findOne({
         email: req.body.email,
      });

      if (hasUser !== null) {

         const isPasswordCorrect = await bcrypt.compare(req.body.password, hasUser.password);


         if (!isPasswordCorrect)
            return res.status(401).json({
               'error': 'Emain or Password is not matched',
            });


         const { password, admin, ...others } = hasUser;

         const token = jwt.sign({
            id: hasUser._id,
            isAdmin: hasUser.isAdmin
         }, process.env.SECRET_KEY);


         return res.cookie('access_token', token, {
            httpOnly: true,
         })
            .status(200).json({
               'user': others._doc,
            });
         

      } else {
         throw 'User not exists';
      }

   } catch (error) {
      next(createError(404, error));
   }
});

module.exports = router;