const mongoose = require('mongoose')
const validator = require('validator')

const Person = mongoose.model('Person', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    born: {
        type: String
    },
    timeline: {
        type: String
    },
    allegiance: {
        type: [String]
    },
    playedBy: {
        type: String
    },
    titles: {
        type: [String]
    },
    father: {
        type: String
    },
    mother: {
        type: String
    },
    spouse: {
        type: String
    }
})

module.exports = Person
