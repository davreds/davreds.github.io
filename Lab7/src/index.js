const express = require('express')

require('./db/mongoose.js')
const Person = require('./models/person.js')
const app = express()

const port = process.env.Port || 3000

app.use(express.json())

app.post('/persons', function(req, res){
    const person = new Person(req.body)
    person.save().then(function(){
        return res.send(person)
    }).catch(function(error){
        return res.status(418).send(error)
    })
})

app.get('/persons', function(req, res){
    Person.find().then(function(persons){
        if(!persons){
            return res.status(404).send(error)
        }
        return res.send(persons)
    }).catch(function(error){
        return res.status(500).send(error)
    })
})

app.get('/persons/:id', function(req, res){
    const _id = req.params.id
    Person.findById(_id).then(function(person){
        if(!person){
            return res.status(404).send(error)
        }
        return res.send(person)
    }).catch(function(error){
        return res.status(500).send(error)
    })
})

app.patch('/persons/:id', function(req, res){
    const _id = req.params.id
    const update = req.body
    Person.findByIdAndUpdate(_id, update, {new: true}).then(function(person){
        if(!person){
            return res.status(404).send(error)
        }
        return res.send(person)
    }).catch(function(error){
        return res.status(500).send(error)
    })
})

app.delete('/persons/:id', function(req, res){
    const _id = req.params.id
    Person.findByIdAndDelete(_id).then(function(person){
        if(!person){
            return res.status(404).send(error)
        }
        return res.send(person)
    }).catch(function(error){
        return res.status(500).send(error)
    })
})

app.listen(port, function(){
    console.log('Server up and running on port ' + port)
})
