//**************** imports ****************//
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';








//**************** configuration setup ****************//
dotenv.config({path: 'backend/config/config.env'});
colors.enable();
//**************** variables ****************//
const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

//**************** middleware****************//
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}
app.use(express.json());

//**************** routes****************//
app.get('/', (req, res) => {
    res.send('API is at Home');
});




//**************** app listening ****************//
const server = app.listen(PORT, () => {
    console.log(
        `The server is listening at - http://127.0.0.1:${PORT} in ${NODE_ENV} mode🔥`
            .yellow
    );
});