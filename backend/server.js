//**************** imports ****************//
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
import connectDatabase from './config/configDatabase.js';

import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';




//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});
colors.enable();
connectDatabase();
//**************** middleware****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

//**************** routes****************//
app.use('/api/v1.0/user', userRouter);
app.use('/api/v1.0/auth', authRouter);










//**************** app listening ****************//
const server = app.listen(PORT, () => {
    console.log(
        `The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode🔥`
            .yellow
    );
});