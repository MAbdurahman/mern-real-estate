//**************** imports ****************//
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import connectDatabase from './config/configDatabase.js';

import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import listingRouter from './routes/listingRoute.js'

//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});
colors.enable();

//**************** connect to database ****************//
connectDatabase();
//**************** middleware****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cookieParser());


//**************** app listening ****************//
const server = app.listen(PORT, () => {
    console.log(
        `The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode🔥`
            .yellow
    );
});

//**************** routes****************//
app.get('/api/v1.0/', (req, res) => {
    res.send('<h1>Welcome to MERN Real Estate</h1>');
});
app.use('/api/v1.0/user', userRouter);
app.use('/api/v1.0/auth', authRouter);
app.use('/api/v1.0/listing', listingRouter);


//**************** handle errors middleware ****************//
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});