require('dotenv').config()

const express = require('express')

const app = express()

const User = require('./models/User')

const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER}.oorf4hy.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (error) => console.error(error))

db.once('open', () => console.log('connected to database'))

app.use(express.json())

// middlware for update and delete

async function getUser(req, res, next) {

    try {
    
    const user = await User.findById(req.params.id)
    
    if (user == null) {
    
    return res.status(404).json({ message: 'Cant find user'})
    
    }
    
    } catch(err){
    
    return res.status(500).json({ message: err.message })
    
    }
    
    res.user = user
    
    next()
    
    }

// Get all users

router.get('/', async (req, res) => {

    try {
    
    const user = await User.find()
    
    res.json(user)
    
    } catch (err) {
    
    res.status(500).json({ message: err.message })
    
    }
    
    })


// Create one user

app.post('/', async (req, res) => {

    const user = new User({
    
    name: req.body.name,
    
    email: req.body.email
    
    })
    
    
    try {
    
    const newuser = await user.save()
    
    res.status(201).json(newuser)
    
    } catch (err) {
    
    res.status(400).json({ message: err.message })
    
    }
    
    })


// Update one user

//

app.patch('/:id', getUser, async (req, res) => {

    if (req.body.name != null) {
    
    res.user.name = req.body.name
    
    }
    
    
    if (req.body.email != null) {
    
    res.user.email = req.body.email
    
    }
    
    try {
    
    const updatedUser = await res.user.save()
    
    res.json(updatedUser)
    
    } catch {
    
    res.status(400).json({ message: err.message })
    
    }
    
    
    })


// Delete one user

app.delete('/:id', getUser, async (req, res) => {

    try {
    
    await res.user.remove()
    
    res.json({ message: 'Deleted This User' })
    
    } catch(err) {
    
    res.status(500).json({ message: err.message })
    
    }
    
    })


app.listen(3000, () => console.log('server started'))