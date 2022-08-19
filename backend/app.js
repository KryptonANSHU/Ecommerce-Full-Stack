const express = require('express');
const app = express();
app.use(express.json())
const errorMiddleware = require('./middleware/error')

//Route Imports
const product = require('./routes/productRoute')
const user = require('./routes/userRoute')

app.use('/api/v1',product)
app.use('/api/v1',user)

//MIddleware for Error
app.use(errorMiddleware)


module.exports = app;