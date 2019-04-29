
const mongoose = require('mongoose')
const connectionURL = 'mongodb+srv://Admin:AdmnP4ss@webdevclass-sdf0f.mongodb.net/clase?retryWrites=true'

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
