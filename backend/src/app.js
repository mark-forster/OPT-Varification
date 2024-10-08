const express= require('express');
require('dotenv').config();
const app = express();
const cors= require('cors');
const morgan = require('morgan');
const routes= require('../routes/index.route');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');
const {errorConverter, errorHandler} = require('../middleware/error')

// Middleware to parse JSON request bodies
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api/v1/', routes);

// 404 page not found Route
app.use('*', (req,res)=>{
    throw new ApiError(httpStatus.NOT_FOUND, 'Page not found');
})

//   handle any error to show error message
app.use(errorConverter);
app.use(errorHandler);


module.exports = app;