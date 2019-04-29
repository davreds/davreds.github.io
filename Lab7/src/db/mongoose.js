
const mongoose = require('mongoose')
const connection = require('./connection.js')
const connectionURL = connection.DB_URL

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
