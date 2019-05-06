
const mongoose = require('mongoose')
const connection = require('./connection.js') // module.exports.DB_URL = <Database URL>
const connectionURL = connection.DB_URL

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
