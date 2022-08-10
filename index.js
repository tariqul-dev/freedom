const dotEnv = require('dotenv');
const express = require('express');
const app = express();
const con = require('./db/connection');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middleware/error_middleware');
const cookieParser = require('cookie-parser');

// routes
const authRoute = require('./routes/auth_route');
const hotelRoute = require('./routes/hotel_route');
const roomRoute = require('./routes/room_route');
const userRoute = require('./routes/user_route');


// configure config.env file
dotEnv.config({ path: 'config.env' });
const port = process.env.PORT;

// middleware package
app.use(bodyParser.json());
app.use(cookieParser());

// route middlewares
app.use('/auth', authRoute);
app.use('/hotels', hotelRoute);
app.use('/rooms', roomRoute);
app.use('/users', userRoute);

// error middleware
app.use(errorMiddleware);



mongoose.connection.on('disconnected', () => {
    console.log('Disconnected');
});

mongoose.connection.on('connected', () => {
    console.log('Connected');
})


app.listen(port, () => {
    // connecting database
    con();
    console.log(`Listening at ${port}`);
})

